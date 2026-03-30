import { useState } from 'react';
import { ArrowLeft, CheckCircle, XCircle, Eye, EyeOff } from 'lucide-react';
import { FilmExcerpt } from '@/lib/listening-data';

interface Props {
  excerpt: FilmExcerpt;
  onBack: () => void;
}

export default function FilmExcerptCard({ excerpt, onBack }: Props) {
  const [showVi, setShowVi] = useState(false);
  const [blankAnswers, setBlankAnswers] = useState<Record<string, string>>({});
  const [blankChecked, setBlankChecked] = useState<Record<string, boolean>>({});

  const checkBlank = (id: string) => {
    setBlankChecked(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <div className="w-full max-w-[390px] px-4 pt-6 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={22} />
          </button>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-foreground text-sm">🎬 {excerpt.filmTitle}</p>
            <p className="text-xs text-muted-foreground">{excerpt.sceneVi}</p>
          </div>
        </div>

        {/* Dialogue */}
        <div className="rounded-lg bg-card shadow-card p-4 mb-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-foreground text-sm">Đoạn hội thoại</h2>
            <button
              onClick={() => setShowVi(!showVi)}
              className="flex items-center gap-1 text-xs text-primary font-medium"
            >
              {showVi ? <EyeOff size={14} /> : <Eye size={14} />}
              {showVi ? 'Ẩn dịch' : 'Hiện dịch'}
            </button>
          </div>

          <div className="space-y-3">
            {excerpt.dialogue.map((line, i) => (
              <div key={i} className="animate-scale-in" style={{ animationDelay: `${i * 0.08}s` }}>
                <p className="text-xs font-semibold text-primary mb-0.5">{line.speaker}</p>
                <p className="text-sm text-foreground italic">"{line.spanish}"</p>
                {showVi && (
                  <p className="text-xs text-muted-foreground mt-0.5">→ {line.vietnamese}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Fill in the blanks */}
        <h2 className="font-bold text-foreground mb-3">✏️ Điền từ còn thiếu</h2>

        <div className="space-y-4">
          {excerpt.fillBlanks.map((fb, i) => {
            const checked = blankChecked[fb.id];
            const userAnswer = (blankAnswers[fb.id] || '').trim().toLowerCase();
            const isCorrect = userAnswer === fb.answer.toLowerCase();

            return (
              <div key={fb.id} className="rounded-lg bg-card shadow-card p-4 animate-scale-in" style={{ animationDelay: `${i * 0.05}s` }}>
                <p className="text-sm text-foreground font-medium mb-2">{fb.sentence}</p>
                <p className="text-xs text-muted-foreground mb-3">💡 {fb.hint}</p>

                <div className="flex gap-2">
                  <input
                    value={blankAnswers[fb.id] || ''}
                    onChange={e => setBlankAnswers(prev => ({ ...prev, [fb.id]: e.target.value }))}
                    placeholder="Nhập từ..."
                    disabled={checked}
                    className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
                  />
                  {!checked && (
                    <button
                      onClick={() => checkBlank(fb.id)}
                      disabled={!blankAnswers[fb.id]?.trim()}
                      className="px-4 rounded-md bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-40"
                    >
                      OK
                    </button>
                  )}
                </div>

                {checked && (
                  <div className={`mt-3 flex items-start gap-2 p-2 rounded-md text-sm ${isCorrect ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
                    {isCorrect ? <CheckCircle size={16} className="shrink-0 mt-0.5" /> : <XCircle size={16} className="shrink-0 mt-0.5" />}
                    <span>{isCorrect ? 'Chính xác!' : `Đáp án đúng: "${fb.answer}"`}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
