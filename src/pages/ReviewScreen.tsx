import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { SCENARIOS } from '@/lib/data';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import BottomNav from '@/components/BottomNav';

export default function ReviewScreen() {
  const { activeProfile, updateProfile } = useApp();
  const navigate = useNavigate();

  const today = new Date().toISOString().split('T')[0];

  const dueCards = useMemo(() => {
    if (!activeProfile) return [];
    return activeProfile.reviewCards.filter(c => c.nextReview <= today);
  }, [activeProfile, today]);

  // Also add learned words that don't have review cards yet
  const allVocab = useMemo(() => {
    return SCENARIOS.flatMap(s => s.vocabulary);
  }, []);

  const newCards = useMemo(() => {
    if (!activeProfile) return [];
    const existingIds = new Set(activeProfile.reviewCards.map(c => c.wordId));
    return activeProfile.learnedWords
      .filter(id => !existingIds.has(id))
      .map(id => allVocab.find(v => v.id === id))
      .filter(Boolean)
      .slice(0, 5);
  }, [activeProfile, allVocab]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [completed, setCompleted] = useState(false);

  const totalCards = dueCards.length + newCards.length;
  const currentWord = currentIndex < dueCards.length
    ? allVocab.find(v => v.id === dueCards[currentIndex]?.wordId)
    : newCards[currentIndex - dueCards.length];

  if (!activeProfile) {
    navigate('/');
    return null;
  }

  const handleRate = (quality: number) => {
    setFlipped(false);
    if (currentIndex + 1 >= totalCards) {
      setCompleted(true);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const ratings = [
    { label: 'Quên rồi', value: 0, className: 'bg-destructive text-destructive-foreground' },
    { label: 'Khó', value: 1, className: 'bg-secondary text-secondary-foreground' },
    { label: 'Được', value: 3, className: 'bg-primary text-primary-foreground' },
    { label: 'Dễ', value: 5, className: 'bg-success text-success-foreground' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <div className="w-full max-w-[390px] px-4 pt-6 pb-24">
        <div className="flex items-center gap-3 mb-5">
          <button onClick={() => navigate('/dashboard')} className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-xl font-bold text-foreground">Ôn tập</h1>
        </div>

        {totalCards === 0 && !completed ? (
          <div className="text-center py-16">
            <RotateCcw size={48} className="mx-auto text-muted-foreground/40 mb-4" />
            <p className="text-lg font-bold text-foreground mb-1">Không có thẻ nào cần ôn!</p>
            <p className="text-sm text-muted-foreground">Hãy học thêm từ mới để ôn tập sau nhé.</p>
            <button
              onClick={() => navigate('/scenarios')}
              className="mt-6 bg-primary text-primary-foreground rounded-lg px-6 py-3 font-medium hover:opacity-90 transition-opacity"
            >
              Học từ mới →
            </button>
          </div>
        ) : completed ? (
          <div className="text-center py-16 animate-scale-in">
            <div className="text-6xl mb-4">🎉</div>
            <p className="text-2xl font-bold text-foreground mb-2">Hoàn thành!</p>
            <p className="text-muted-foreground">Bạn đã ôn {totalCards} thẻ hôm nay. Tuyệt vời!</p>
            <button
              onClick={() => navigate('/dashboard')}
              className="mt-6 bg-primary text-primary-foreground rounded-lg px-6 py-3 font-medium hover:opacity-90 transition-opacity"
            >
              Về trang chủ
            </button>
          </div>
        ) : currentWord ? (
          <>
            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>{currentIndex + 1} / {totalCards}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${((currentIndex + 1) / totalCards) * 100}%` }} />
              </div>
            </div>

            {/* Flashcard */}
            <button
              onClick={() => setFlipped(!flipped)}
              className="w-full aspect-[3/2] rounded-lg bg-card shadow-elevated p-6 flex flex-col items-center justify-center text-center transition-all hover:shadow-card mb-6"
            >
              {!flipped ? (
                <>
                  <p className="text-2xl font-bold text-foreground mb-2">{currentWord.spanish}</p>
                  <p className="text-sm text-muted-foreground">Nhấn để xem đáp án</p>
                </>
              ) : (
                <>
                  <p className="text-lg font-bold text-primary mb-1">{currentWord.vietnamese}</p>
                  <p className="text-xs text-muted-foreground mb-3">[{currentWord.phonetic}]</p>
                  <p className="text-sm text-foreground italic">{currentWord.example}</p>
                  <p className="text-xs text-muted-foreground mt-1">{currentWord.exampleVi}</p>
                </>
              )}
            </button>

            {flipped && (
              <div className="grid grid-cols-4 gap-2 animate-slide-up">
                {ratings.map(r => (
                  <button
                    key={r.value}
                    onClick={() => handleRate(r.value)}
                    className={`${r.className} rounded-lg py-3 text-xs font-bold hover:opacity-90 transition-opacity`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            )}
          </>
        ) : null}
      </div>
      <BottomNav />
    </div>
  );
}
