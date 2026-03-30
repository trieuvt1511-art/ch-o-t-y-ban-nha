import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, Search, Volume2 } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { FLASHCARD_CATEGORIES } from '@/lib/flashcard-data';

export default function FlashcardScreen() {
  const navigate = useNavigate();
  const { user } = useApp();
  const [selectedCat, setSelectedCat] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [search, setSearch] = useState('');

  const category = FLASHCARD_CATEGORIES[selectedCat];
  const words = useMemo(() => {
    if (!search.trim()) return category.words;
    const q = search.toLowerCase();
    return category.words.filter(w => w.spanish.toLowerCase().includes(q) || w.vietnamese.toLowerCase().includes(q));
  }, [category, search]);

  const currentWord = words[currentIndex];

  const speak = (text: string) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'es-ES';
    speechSynthesis.speak(u);
  };

  const handleNext = () => { setFlipped(false); setCurrentIndex(prev => (prev + 1) % words.length); };
  const handlePrev = () => { setFlipped(false); setCurrentIndex(prev => (prev - 1 + words.length) % words.length); };

  if (!user) { navigate('/auth'); return null; }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <div className="w-full max-w-[430px] px-5 pt-6 pb-24 page-enter">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate('/dashboard')} className="btn-icon bg-muted text-muted-foreground hover:text-foreground hover:bg-accent">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-heading font-bold text-foreground">Flashcard 3000 từ</h1>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-3 mb-3 scrollbar-hide">
          {FLASHCARD_CATEGORIES.map((cat, i) => (
            <button key={cat.name} onClick={() => { setSelectedCat(i); setCurrentIndex(0); setFlipped(false); }}
              className={`shrink-0 px-4 min-h-[36px] rounded-full text-xs font-bold transition-all ${selectedCat === i ? 'gradient-primary text-primary-foreground shadow-card' : 'bg-muted text-muted-foreground'}`}>
              {cat.emoji} {cat.name}
            </button>
          ))}
        </div>

        <div className="relative mb-4">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={e => { setSearch(e.target.value); setCurrentIndex(0); }}
            placeholder="Tìm từ vựng..." className="w-full rounded-2xl border border-input bg-card pl-10 pr-4 min-h-[48px] text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>

        <div className="flex justify-between text-xs text-muted-foreground mb-2 px-1">
          <span>{category.emoji} {category.name}</span>
          <span className="font-bold">{currentIndex + 1} / {words.length}</span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-5">
          <div className="h-full gradient-primary rounded-full transition-all duration-300" style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }} />
        </div>

        {currentWord && (
          <div className="perspective mb-5">
            <button onClick={() => setFlipped(!flipped)}
              className="w-full aspect-[3/2] relative preserve-3d transition-transform duration-500"
              style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0)' }}>
              <div className="absolute inset-0 backface-hidden rounded-2xl bg-card shadow-elevated p-6 flex flex-col items-center justify-center">
                <span className="text-4xl mb-3">{currentWord.emoji}</span>
                <p className="text-3xl font-heading font-bold text-foreground mb-1">{currentWord.spanish}</p>
                <p className="text-sm text-muted-foreground">[{currentWord.phonetic}]</p>
                <p className="text-xs text-muted-foreground mt-3">Nhấn để lật</p>
              </div>
              <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl bg-card shadow-elevated p-6 flex flex-col items-center justify-center">
                <p className="text-2xl font-heading font-bold text-primary mb-2">{currentWord.vietnamese}</p>
                <p className="text-sm text-foreground italic mb-1">{currentWord.example}</p>
                <p className="text-xs text-muted-foreground">{currentWord.exampleVi}</p>
              </div>
            </button>
          </div>
        )}

        <div className="flex items-center justify-center gap-4">
          <button onClick={handlePrev} className="btn-icon bg-muted text-muted-foreground hover:bg-accent font-bold text-lg">←</button>
          <button onClick={() => currentWord && speak(currentWord.spanish)} className="btn-icon gradient-secondary text-secondary-foreground shadow-card">
            <Volume2 size={20} />
          </button>
          <button onClick={handleNext} className="btn-icon gradient-primary text-primary-foreground shadow-card font-bold text-lg">→</button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
