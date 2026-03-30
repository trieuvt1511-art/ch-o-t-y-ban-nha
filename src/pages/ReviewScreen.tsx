import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { SCENARIOS } from '@/lib/data';
import { FLASHCARD_CATEGORIES } from '@/lib/flashcard-data';
import { ArrowLeft, RotateCcw, Volume2 } from 'lucide-react';
import BottomNav from '@/components/BottomNav';

export default function ReviewScreen() {
  const { user, learnedWords } = useApp();
  const navigate = useNavigate();

  const allVocab = useMemo(() => {
    const scenarioWords = SCENARIOS.flatMap(s => s.vocabulary);
    const flashcardWords = FLASHCARD_CATEGORIES.flatMap(c => c.words.map(w => ({
      id: w.id, spanish: w.spanish, vietnamese: w.vietnamese, phonetic: w.phonetic, example: w.example, exampleVi: w.exampleVi,
    })));
    return [...scenarioWords, ...flashcardWords];
  }, []);

  const reviewWords = useMemo(() => {
    return learnedWords.map(id => allVocab.find(v => v.id === id)).filter(Boolean).slice(0, 20);
  }, [learnedWords, allVocab]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [completed, setCompleted] = useState(false);

  if (!user) { navigate('/auth'); return null; }

  const currentWord = reviewWords[currentIndex];

  const handleRate = () => {
    setFlipped(false);
    if (currentIndex + 1 >= reviewWords.length) {
      setCompleted(true);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const speak = (text: string) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'es-ES';
    speechSynthesis.speak(u);
  };

  const ratings = [
    { label: 'Quên rồi', className: 'bg-destructive text-destructive-foreground' },
    { label: 'Khó', className: 'bg-secondary text-secondary-foreground' },
    { label: 'Được', className: 'gradient-primary text-primary-foreground' },
    { label: 'Dễ', className: 'bg-success text-success-foreground' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <div className="w-full max-w-[430px] px-4 pt-6 pb-24">
        <div className="flex items-center gap-3 mb-5">
          <button onClick={() => navigate('/dashboard')} className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-xl font-heading font-bold text-foreground">Ôn tập</h1>
        </div>

        {reviewWords.length === 0 && !completed ? (
          <div className="text-center py-16">
            <RotateCcw size={48} className="mx-auto text-muted-foreground/40 mb-4" />
            <p className="text-lg font-heading font-bold text-foreground mb-1">Không có thẻ nào cần ôn!</p>
            <p className="text-sm text-muted-foreground">Hãy học thêm từ mới để ôn tập sau nhé.</p>
            <button onClick={() => navigate('/scenarios')}
              className="mt-6 gradient-primary text-primary-foreground rounded-xl px-6 py-3 font-bold hover:opacity-90 transition-opacity shadow-card">
              Học từ mới →
            </button>
          </div>
        ) : completed ? (
          <div className="text-center py-16 animate-scale-in">
            <div className="text-6xl mb-4">🎉</div>
            <p className="text-2xl font-heading font-bold text-foreground mb-2">Hoàn thành!</p>
            <p className="text-muted-foreground">Bạn đã ôn {reviewWords.length} thẻ hôm nay.</p>
            <button onClick={() => navigate('/dashboard')}
              className="mt-6 gradient-primary text-primary-foreground rounded-xl px-6 py-3 font-bold hover:opacity-90 transition-opacity shadow-card">
              Về trang chủ
            </button>
          </div>
        ) : currentWord ? (
          <>
            <div className="mb-6">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>{currentIndex + 1} / {reviewWords.length}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full gradient-primary rounded-full transition-all duration-300" style={{ width: `${((currentIndex + 1) / reviewWords.length) * 100}%` }} />
              </div>
            </div>

            <div className="perspective mb-5">
              <button onClick={() => setFlipped(!flipped)}
                className="w-full aspect-[3/2] relative preserve-3d transition-transform duration-500"
                style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0)' }}>
                <div className="absolute inset-0 backface-hidden rounded-2xl bg-card shadow-elevated p-6 flex flex-col items-center justify-center">
                  <p className="text-3xl font-heading font-bold text-foreground mb-2">{currentWord.spanish}</p>
                  <p className="text-sm text-muted-foreground">Nhấn để xem đáp án</p>
                </div>
                <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl bg-card shadow-elevated p-6 flex flex-col items-center justify-center">
                  <p className="text-2xl font-heading font-bold text-primary mb-1">{currentWord.vietnamese}</p>
                  <p className="text-xs text-muted-foreground mb-3">[{currentWord.phonetic}]</p>
                  <p className="text-sm text-foreground italic">{currentWord.example}</p>
                  <p className="text-xs text-muted-foreground mt-1">{currentWord.exampleVi}</p>
                </div>
              </button>
            </div>

            {flipped && (
              <div className="space-y-3 animate-slide-up">
                <button onClick={() => speak(currentWord.spanish)}
                  className="w-full rounded-xl bg-muted py-2.5 text-sm font-bold text-muted-foreground flex items-center justify-center gap-2 hover:bg-accent transition-colors">
                  <Volume2 size={16} /> Nghe phát âm
                </button>
                <div className="grid grid-cols-4 gap-2">
                  {ratings.map(r => (
                    <button key={r.label} onClick={handleRate}
                      className={`${r.className} rounded-xl py-3 text-xs font-bold hover:opacity-90 transition-opacity shadow-card`}>
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : null}
      </div>
      <BottomNav />
    </div>
  );
}
