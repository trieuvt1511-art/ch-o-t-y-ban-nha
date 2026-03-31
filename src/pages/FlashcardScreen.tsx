import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, Search, Volume2, Star, RotateCcw, Bot } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { FlashcardAIHelper } from '@/components/FlashcardAIHelper';
import { FLASHCARD_CATEGORIES, FlashcardWord } from '@/lib/flashcard-data';
import { supabase } from '@/integrations/supabase/client';

interface ReviewCardDB {
  word_id: string;
  ease_factor: number;
  interval: number;
  repetitions: number;
  next_review: string;
}

type RatingKey = 'forgot' | 'hard' | 'easy' | 'mastered';

const RATINGS: { key: RatingKey; label: string; emoji: string; quality: number; color: string }[] = [
  { key: 'forgot', label: 'Quên', emoji: '😅', quality: 1, color: 'bg-destructive text-destructive-foreground' },
  { key: 'hard', label: 'Khó', emoji: '🤔', quality: 2, color: 'bg-secondary text-secondary-foreground' },
  { key: 'easy', label: 'Dễ', emoji: '😊', quality: 4, color: 'gradient-success text-success-foreground' },
  { key: 'mastered', label: 'Thuộc rồi!', emoji: '🎯', quality: 5, color: 'gradient-primary text-primary-foreground' },
];

function sm2(card: ReviewCardDB, quality: number): ReviewCardDB {
  let { ease_factor, interval, repetitions } = card;
  if (quality < 3) {
    repetitions = 0;
    interval = 1;
  } else {
    if (repetitions === 0) interval = 1;
    else if (repetitions === 1) interval = 6;
    else interval = Math.round(interval * ease_factor);
    repetitions += 1;
  }
  ease_factor = Math.max(1.3, ease_factor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + interval);
  return { ...card, ease_factor, interval, repetitions, next_review: nextDate.toISOString().split('T')[0] };
}

type ViewMode = 'categories' | 'review';

export default function FlashcardScreen() {
  const navigate = useNavigate();
  const { activeProfile, addLearnedWord, addXP, updateProfile } = useApp();
  const learnedWords = activeProfile?.learnedWords || [];
  const [view, setView] = useState<ViewMode>('categories');
  const [selectedCat, setSelectedCat] = useState(0);
  const [search, setSearch] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [swipeAnim, setSwipeAnim] = useState<'left' | 'right' | null>(null);
  const [reviewCards, setReviewCards] = useState<Record<string, ReviewCardDB>>({});
  const [queue, setQueue] = useState<FlashcardWord[]>([]);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const [showAIHelper, setShowAIHelper] = useState(false);

  // Load review cards from localStorage profile
  useEffect(() => {
    if (!activeProfile) return;
    setReviewCards(activeProfile.reviewCards || {});
  }, [activeProfile]);

  // Build daily queue for selected category
  const buildQueue = useCallback((catIndex: number) => {
    const cat = FLASHCARD_CATEGORIES[catIndex];
    const today = new Date().toISOString().split('T')[0];
    
    // Due reviews
    const due = cat.words.filter(w => {
      const rc = reviewCards[w.id];
      return rc && rc.next_review <= today;
    });
    
    // New words (not yet reviewed)
    const newWords = cat.words.filter(w => !reviewCards[w.id]);
    
    // Combine: all due + up to 20 new
    const combined = [...due, ...newWords.slice(0, 20)];
    return combined.length > 0 ? combined : cat.words.slice(0, 10); // fallback
  }, [reviewCards]);

  const startReview = (catIndex: number) => {
    setSelectedCat(catIndex);
    setQueue(buildQueue(catIndex));
    setCurrentIndex(0);
    setFlipped(false);
    setView('review');
  };

  const currentWord = queue[currentIndex];

  const speak = (text: string) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'es-ES';
    speechSynthesis.speak(u);
  };

  const handleRate = (quality: number) => {
    if (!currentWord || !activeProfile) return;
    
    const existing = reviewCards[currentWord.id];
    const card: ReviewCardDB = existing || {
      word_id: currentWord.id,
      ease_factor: 2.5,
      interval: 1,
      repetitions: 0,
      next_review: new Date().toISOString().split('T')[0],
    };
    
    const updated = sm2(card, quality);
    
    // Animate swipe
    setSwipeAnim(quality >= 3 ? 'right' : 'left');
    
    // Save to localStorage
    const newCards = { ...activeProfile.reviewCards, [currentWord.id]: updated };
    updateProfile({ reviewCards: newCards });
    
    // Mark learned if quality >= 3
    if (quality >= 3 && !learnedWords.includes(currentWord.id)) {
      addLearnedWord(currentWord.id);
    }

    // Update XP
    addXP(10);
    
    setReviewCards(prev => ({ ...prev, [currentWord.id]: updated }));
    
    setTimeout(() => {
      setSwipeAnim(null);
      setFlipped(false);
      if (currentIndex < queue.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setView('categories');
      }
    }, 400);
  };

  // Touch swipe handling
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchMove = (e: React.TouchEvent) => { touchDeltaX.current = e.touches[0].clientX - touchStartX.current; };
  const onTouchEnd = () => {
    if (!flipped) { setFlipped(true); return; }
    if (touchDeltaX.current > 80) handleRate(4); // swipe right = easy
    else if (touchDeltaX.current < -80) handleRate(1); // swipe left = forgot
    touchDeltaX.current = 0;
  };

  // Category stats
  const getCatStats = (catIndex: number) => {
    const cat = FLASHCARD_CATEGORIES[catIndex];
    const total = cat.words.length;
    const today = new Date().toISOString().split('T')[0];
    let mastered = 0, learning = 0, newCount = 0;
    cat.words.forEach(w => {
      const rc = reviewCards[w.id];
      if (!rc) { newCount++; return; }
      if (rc.interval >= 21) mastered++;
      else learning++;
    });
    return { total, mastered, learning, newCount, 
      dueCount: cat.words.filter(w => { const rc = reviewCards[w.id]; return rc && rc.next_review <= today; }).length 
    };
  };

  if (!activeProfile) { navigate('/'); return null; }

  // ========== CATEGORY VIEW ==========
  if (view === 'categories') {
    const filteredCats = search.trim() 
      ? FLASHCARD_CATEGORIES.map((cat, i) => {
          const q = search.toLowerCase();
          const matchedWords = cat.words.filter(w => w.spanish.toLowerCase().includes(q) || w.vietnamese.toLowerCase().includes(q));
          return matchedWords.length > 0 ? i : -1;
        }).filter(i => i >= 0)
      : FLASHCARD_CATEGORIES.map((_, i) => i);

    return (
      <div className="min-h-screen bg-background flex flex-col items-center">
        <div className="w-full max-w-[430px] px-5 pt-6 pb-24 page-enter">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => navigate('/dashboard')} className="btn-icon bg-muted text-muted-foreground hover:text-foreground hover:bg-accent">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-xl font-heading font-bold text-foreground">Flashcard 3000 từ</h1>
              <p className="text-xs text-muted-foreground">10 chủ đề · {FLASHCARD_CATEGORIES.reduce((s, c) => s + c.words.length, 0)} từ vựng</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-5">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Tìm từ vựng..." 
              className="w-full rounded-2xl border border-input bg-card pl-10 pr-4 min-h-[48px] text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-2 gap-3">
            {filteredCats.map(i => {
              const cat = FLASHCARD_CATEGORIES[i];
              const stats = getCatStats(i);
              const pct = stats.total > 0 ? ((stats.mastered + stats.learning) / stats.total) * 100 : 0;
              const masteredPct = stats.total > 0 ? (stats.mastered / stats.total) * 100 : 0;
              
              return (
                <button key={cat.name} onClick={() => startReview(i)}
                  className="rounded-2xl bg-card shadow-card p-4 text-left card-hover relative overflow-hidden">
                  {/* Progress Ring */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl">{cat.emoji}</span>
                    <svg width="44" height="44" viewBox="0 0 44 44" className="-rotate-90">
                      <circle cx="22" cy="22" r="18" fill="none" stroke="hsl(var(--muted))" strokeWidth="4" />
                      {pct > 0 && (
                        <circle cx="22" cy="22" r="18" fill="none" 
                          stroke={cat.color} strokeWidth="4"
                          strokeDasharray={`${(pct / 100) * 113.1} 113.1`}
                          strokeLinecap="round" opacity={0.4} />
                      )}
                      {masteredPct > 0 && (
                        <circle cx="22" cy="22" r="18" fill="none" 
                          stroke={cat.color} strokeWidth="4"
                          strokeDasharray={`${(masteredPct / 100) * 113.1} 113.1`}
                          strokeLinecap="round" />
                      )}
                    </svg>
                  </div>
                  <p className="font-heading font-bold text-foreground text-sm">{cat.name}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{stats.mastered}/{stats.total} thuộc</p>
                  {stats.dueCount > 0 && (
                    <span className="absolute top-2 right-2 bg-destructive text-destructive-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {stats.dueCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  // ========== REVIEW VIEW ==========
  const category = FLASHCARD_CATEGORIES[selectedCat];
  const progress = queue.length > 0 ? ((currentIndex + 1) / queue.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <div className="w-full max-w-[430px] px-5 pt-6 pb-24 page-enter">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => setView('categories')} className="btn-icon bg-muted text-muted-foreground hover:text-foreground hover:bg-accent">
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-heading font-bold text-foreground">{category.emoji} {category.name}</h1>
            <p className="text-xs text-muted-foreground">{currentIndex + 1} / {queue.length} từ</p>
          </div>
          <span className="text-xs font-bold text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
            +10 XP/từ
          </span>
        </div>

        {/* Progress */}
        <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-5">
          <div className="h-full gradient-primary rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>

        {/* Card */}
        {currentWord && (
          <div className="perspective mb-5"
            onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
            <div
              className={`w-full aspect-[3/2] relative preserve-3d transition-transform duration-500 cursor-pointer
                ${swipeAnim === 'right' ? 'animate-swipe-right' : ''}
                ${swipeAnim === 'left' ? 'animate-swipe-left' : ''}
              `}
              onClick={() => !swipeAnim && setFlipped(!flipped)}
              style={{ transform: flipped && !swipeAnim ? 'rotateY(180deg)' : 'rotateY(0)' }}>
              
              {/* Front */}
              <div className="absolute inset-0 backface-hidden rounded-2xl bg-card shadow-elevated p-6 flex flex-col items-center justify-center border-2 border-transparent"
                style={{ borderColor: swipeAnim === 'right' ? 'hsl(145 63% 42%)' : swipeAnim === 'left' ? 'hsl(0 84% 60%)' : 'transparent' }}>
                <span className="text-5xl mb-3">{currentWord.emoji}</span>
                <p className="text-3xl font-heading font-bold text-foreground mb-1">{currentWord.spanish}</p>
                <p className="text-sm text-muted-foreground">[{currentWord.phonetic}]</p>
                <button onClick={(e) => { e.stopPropagation(); speak(currentWord.spanish); }}
                  className="mt-3 flex items-center gap-1.5 text-xs text-primary font-bold">
                  <Volume2 size={14} /> Nghe phát âm
                </button>
                <p className="text-[10px] text-muted-foreground mt-3">Nhấn để lật · Vuốt phải ✅ · Vuốt trái ❌</p>
              </div>
              
              {/* Back */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl bg-card shadow-elevated p-6 flex flex-col items-center justify-center">
                <p className="text-2xl font-heading font-bold text-primary mb-3">{currentWord.vietnamese}</p>
                <p className="text-sm text-foreground italic mb-1 text-center">{currentWord.example}</p>
                <p className="text-xs text-muted-foreground text-center mb-3">{currentWord.exampleVi}</p>
                <button onClick={(e) => { e.stopPropagation(); speak(currentWord.example); }}
                  className="flex items-center gap-1.5 text-xs text-primary font-bold">
                  <Volume2 size={14} /> 🔊 Nghe câu ví dụ
                </button>
                <button onClick={(e) => { e.stopPropagation(); setShowAIHelper(true); }}
                  className="mt-2 flex items-center gap-1.5 text-xs font-bold text-accent-foreground bg-accent rounded-full px-3 py-1.5">
                  <Bot size={14} /> Hỏi AI 🤖
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Rating Buttons */}
        {flipped && !swipeAnim && (
          <div className="grid grid-cols-4 gap-2 animate-bounce-in">
            {RATINGS.map(r => (
              <button key={r.key} onClick={() => handleRate(r.quality)}
                className={`rounded-2xl min-h-[56px] flex flex-col items-center justify-center gap-0.5 font-bold text-xs shadow-card transition-all active:scale-95 ${r.color}`}>
                <span className="text-lg">{r.emoji}</span>
                {r.label}
              </button>
            ))}
          </div>
        )}

        {/* Quick actions when not flipped */}
        {!flipped && !swipeAnim && currentWord && (
          <div className="flex items-center justify-center gap-4">
            <button onClick={() => speak(currentWord.spanish)} className="btn-icon gradient-secondary text-secondary-foreground shadow-card">
              <Volume2 size={20} />
            </button>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
