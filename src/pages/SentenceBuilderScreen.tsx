import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Lightbulb, Volume2, ChevronDown } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { useApp } from '@/context/AppContext';
import { SENTENCE_LEVELS, GRAMMAR_TOPICS } from '@/lib/sentence-data';

const SLOT_COLORS: Record<string, { bg: string; border: string; text: string; dot: string }> = {
  'Chủ ngữ': { bg: 'bg-blue-50', border: 'border-blue-400', text: 'text-blue-700', dot: '🔵' },
  'Động từ': { bg: 'bg-green-50', border: 'border-green-400', text: 'text-green-700', dot: '🟢' },
  'Tân ngữ': { bg: 'bg-orange-50', border: 'border-orange-400', text: 'text-orange-700', dot: '🟠' },
  'Thời gian': { bg: 'bg-purple-50', border: 'border-purple-400', text: 'text-purple-700', dot: '🟣' },
  'Địa điểm': { bg: 'bg-red-50', border: 'border-red-400', text: 'text-red-700', dot: '🔴' },
  'Liên từ': { bg: 'bg-gray-50', border: 'border-gray-400', text: 'text-gray-700', dot: '⚪' },
  'Mệnh đề 1': { bg: 'bg-blue-50', border: 'border-blue-400', text: 'text-blue-700', dot: '🔵' },
  'Mệnh đề 2': { bg: 'bg-green-50', border: 'border-green-400', text: 'text-green-700', dot: '🟢' },
};
const DEFAULT_COLOR = { bg: 'bg-muted', border: 'border-border', text: 'text-foreground', dot: '⚪' };

function getSlotColor(label: string) {
  return SLOT_COLORS[label] || DEFAULT_COLOR;
}

export default function SentenceBuilderScreen() {
  const navigate = useNavigate();
  const { activeProfile } = useApp();
  const [view, setView] = useState<'menu' | 'exercise' | 'grammar'>('menu');
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [selectedGrammar, setSelectedGrammar] = useState<number | null>(null);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showTip, setShowTip] = useState(false);

  if (!user) { navigate('/auth'); return null; }

  const level = selectedLevel !== null ? SENTENCE_LEVELS[selectedLevel] : null;
  const exercise = level ? level.exercises[exerciseIndex] : null;
  const grammar = selectedGrammar !== null ? GRAMMAR_TOPICS[selectedGrammar] : null;

  const allCorrect = exercise ? exercise.slots.every((slot, i) => answers[i] === slot.correct) : false;
  const allFilled = exercise ? exercise.slots.every((_, i) => answers[i]) : false;

  // Build live sentence from current answers
  const liveSentence = exercise
    ? exercise.slots.map((_, i) => answers[i] || '___').join(' ') + (allFilled ? '.' : '')
    : '';

  const speak = (text: string) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'es-ES';
    u.rate = 0.85;
    speechSynthesis.speak(u);
  };

  const handleSubmit = () => { setSubmitted(true); if (allCorrect) setScore(prev => prev + 1); };

  const handleNext = () => {
    if (!level) return;
    setSubmitted(false); setAnswers({}); setShowTip(false);
    if (exerciseIndex + 1 < level.exercises.length) setExerciseIndex(prev => prev + 1);
    else { setExerciseIndex(0); setView('menu'); setSelectedLevel(null); }
  };

  const handleBack = () => {
    if (view === 'grammar') { setView('menu'); setSelectedGrammar(null); }
    else if (view === 'exercise') { setView('menu'); setSelectedLevel(null); setExerciseIndex(0); setAnswers({}); setSubmitted(false); setScore(0); }
    else navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <div className="w-full max-w-[430px] px-5 pt-6 pb-24 page-enter">
        <div className="flex items-center gap-3 mb-5">
          <button onClick={handleBack} className="btn-icon bg-muted text-muted-foreground hover:text-foreground hover:bg-accent">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-heading font-bold text-foreground">
            {view === 'grammar' ? 'Ngữ pháp' : 'Ghép câu'}
          </h1>
          {view === 'exercise' && level && (
            <span className="ml-auto text-xs font-bold text-muted-foreground bg-muted px-2.5 py-1 rounded-lg">
              {exerciseIndex + 1}/{level.exercises.length} · ⭐ {score}
            </span>
          )}
        </div>

        {/* ===== MENU VIEW ===== */}
        {view === 'menu' && (
          <div className="space-y-6 animate-slide-up">
            <div>
              <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">Luyện ghép câu</h2>
              <div className="space-y-3">
                {SENTENCE_LEVELS.map((lvl, i) => (
                  <button key={lvl.id} onClick={() => { setSelectedLevel(i); setScore(0); setView('exercise'); }}
                    className={`w-full ${lvl.gradient} rounded-2xl p-4 text-left card-hover shadow-card`}>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{lvl.emoji}</span>
                      <div className="flex-1">
                        <p className="font-heading font-bold text-foreground">{lvl.name}</p>
                        <p className="text-xs text-muted-foreground">{lvl.description}</p>
                        <code className="text-[10px] font-bold text-primary bg-white/60 rounded px-1.5 py-0.5 mt-1 inline-block">{lvl.pattern}</code>
                      </div>
                      <ArrowRight size={18} className="text-muted-foreground" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Color legend */}
            <div className="bg-card rounded-2xl shadow-card p-4">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Bảng màu thành phần câu</h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(SLOT_COLORS).slice(0, 6).map(([label, c]) => (
                  <span key={label} className={`text-[10px] font-bold px-2 py-1 rounded-lg ${c.bg} ${c.text} border ${c.border}`}>
                    {c.dot} {label}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">📖 Ngữ pháp</h2>
              <div className="grid grid-cols-2 gap-3">
                {GRAMMAR_TOPICS.map((topic, i) => (
                  <button key={topic.id} onClick={() => { setSelectedGrammar(i); setView('grammar'); }}
                    className={`${topic.gradient} rounded-2xl p-4 text-left card-hover shadow-card`}>
                    <span className="text-2xl">{topic.emoji}</span>
                    <p className="font-heading font-bold text-foreground text-sm mt-2">{topic.title}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== GRAMMAR VIEW ===== */}
        {view === 'grammar' && grammar && (
          <div className="space-y-5 animate-slide-up">
            <div className={`${grammar.gradient} rounded-2xl p-5 text-center`}>
              <span className="text-4xl">{grammar.emoji}</span>
              <p className="font-heading font-bold text-xl text-foreground mt-2">{grammar.title}</p>
            </div>
            {grammar.sections.map((section, i) => (
              <div key={i} className="rounded-2xl bg-card shadow-card p-4">
                <h3 className="font-heading font-bold text-foreground mb-2">{section.title}</h3>
                {section.content && <p className="text-sm text-muted-foreground mb-3">{section.content}</p>}
                {section.table && (
                  <div className="overflow-x-auto mb-3">
                    <table className="w-full text-xs">
                      <thead>
                        <tr>{section.table.headers.map(h => <th key={h} className="text-left font-bold text-foreground bg-muted px-2 py-1.5 first:rounded-tl-lg last:rounded-tr-lg">{h}</th>)}</tr>
                      </thead>
                      <tbody>
                        {section.table.rows.map((row, ri) => (
                          <tr key={ri} className={ri % 2 === 0 ? 'bg-background' : ''}>
                            {row.map((cell, ci) => <td key={ci} className="px-2 py-1.5 text-foreground">{cell}</td>)}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {section.examples && (
                  <div className="space-y-1.5 mb-2">
                    {section.examples.map((ex, j) => (
                      <div key={j} className="bg-muted/50 rounded-lg px-3 py-2">
                        <p className="text-sm font-bold text-primary">{ex.spanish}</p>
                        <p className="text-xs text-muted-foreground">{ex.vietnamese}</p>
                      </div>
                    ))}
                  </div>
                )}
                {section.memoryTrick && (
                  <div className="bg-secondary/10 rounded-lg px-3 py-2 text-xs font-bold text-secondary">
                    {section.memoryTrick}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ===== EXERCISE VIEW ===== */}
        {view === 'exercise' && exercise && (
          <div className="animate-slide-up">
            {/* Progress bar */}
            <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-5">
              <div className="h-full gradient-primary rounded-full transition-all duration-300" style={{ width: `${((exerciseIndex + 1) / level!.exercises.length) * 100}%` }} />
            </div>

            <div className="bg-muted/60 rounded-xl px-4 py-2 mb-4 text-center">
              <span className="text-xs font-bold text-muted-foreground">Cấu trúc: </span>
              <code className="text-xs font-bold text-primary">{level!.pattern}</code>
            </div>

            <p className="text-lg font-heading font-bold text-foreground mb-5 text-center">{exercise.instruction}</p>

            {/* Colored word blocks with dropdowns */}
            <div className="space-y-3 mb-5">
              {exercise.slots.map((slot, i) => {
                const color = getSlotColor(slot.label);
                const selected = answers[i];
                const isCorrect = submitted && selected === slot.correct;
                const isWrong = submitted && selected && selected !== slot.correct;

                return (
                  <div key={i} className={`rounded-2xl border-2 p-3 transition-all ${
                    isCorrect ? 'border-green-400 bg-green-50' :
                    isWrong ? 'border-red-400 bg-red-50' :
                    selected ? `${color.border} ${color.bg}` :
                    'border-border bg-card'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm">{color.dot}</span>
                      <span className={`text-xs font-bold uppercase tracking-wider ${color.text}`}>{slot.label}</span>
                      {isCorrect && <span className="ml-auto text-green-600 text-sm">✅</span>}
                      {isWrong && <span className="ml-auto text-red-500 text-xs font-bold">✗ → {slot.correct}</span>}
                    </div>
                    <div className="relative">
                      <select
                        value={selected || ''}
                        onChange={e => !submitted && setAnswers(prev => ({ ...prev, [i]: e.target.value }))}
                        disabled={submitted}
                        className={`w-full appearance-none rounded-xl min-h-[44px] px-4 pr-10 font-bold text-sm transition-all cursor-pointer
                          ${selected ? `${color.bg} ${color.text} border ${color.border}` : 'bg-muted text-muted-foreground border border-border'}
                          ${submitted ? 'opacity-80 cursor-not-allowed' : 'hover:shadow-card'}
                          focus:outline-none focus:ring-2 focus:ring-ring
                        `}
                      >
                        <option value="" disabled>Chọn {slot.label.toLowerCase()}...</option>
                        {slot.options.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                      <ChevronDown size={16} className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${color.text}`} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Live sentence preview + TTS */}
            <div className="bg-card rounded-2xl shadow-card p-4 mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Câu của bạn</span>
                <button
                  onClick={() => allFilled && speak(exercise.slots.map((_, i) => answers[i]).join(' '))}
                  disabled={!allFilled}
                  className="flex items-center gap-1 text-xs text-primary font-bold disabled:opacity-30"
                >
                  <Volume2 size={14} /> Nghe
                </button>
              </div>
              {/* Colored inline blocks */}
              <div className="flex flex-wrap gap-1.5 items-center min-h-[36px]">
                {exercise.slots.map((slot, i) => {
                  const color = getSlotColor(slot.label);
                  const word = answers[i];
                  return word ? (
                    <span key={i} className={`px-2.5 py-1 rounded-lg text-sm font-bold ${color.bg} ${color.text} border ${color.border}`}>
                      {word}
                    </span>
                  ) : (
                    <span key={i} className="px-2.5 py-1 rounded-lg text-sm font-bold bg-muted text-muted-foreground border border-dashed border-border">
                      ___
                    </span>
                  );
                })}
                {allFilled && <span className="text-foreground font-bold">.</span>}
              </div>
              {/* Real-time Vietnamese translation */}
              <p className="text-xs text-muted-foreground mt-2 italic">
                {submitted ? exercise.translation : (allFilled ? `→ ${exercise.translation}` : 'Chọn từ để xem bản dịch...')}
              </p>
            </div>

            {/* Result */}
            {submitted && (
              <div className={`rounded-2xl p-4 mb-4 text-center animate-scale-in ${allCorrect ? 'bg-success/10' : 'bg-destructive/10'}`}>
                <p className="font-heading font-bold text-lg">{allCorrect ? '🎉 Xuất sắc!' : '😅 Thử lại nhé!'}</p>
                <p className="text-sm text-muted-foreground mt-1">{exercise.translation}</p>
              </div>
            )}

            {/* Tip */}
            {exercise.tip && (
              <button onClick={() => setShowTip(!showTip)} className="w-full flex items-center gap-2 text-sm text-secondary font-bold mb-4">
                <Lightbulb size={16} />{showTip ? 'Ẩn gợi ý' : 'Xem gợi ý'}
              </button>
            )}
            {showTip && exercise.tip && (
              <div className="bg-secondary/10 rounded-xl p-3 mb-4 text-sm text-foreground animate-slide-up">💡 {exercise.tip}</div>
            )}

            {/* Action button */}
            {!submitted ? (
              <button onClick={handleSubmit} disabled={!allFilled}
                className="w-full gradient-primary text-primary-foreground rounded-xl py-3.5 font-bold shadow-card hover:opacity-90 transition-opacity disabled:opacity-40">Kiểm tra</button>
            ) : (
              <button onClick={handleNext}
                className="w-full gradient-primary text-primary-foreground rounded-xl py-3.5 font-bold shadow-card hover:opacity-90 transition-opacity">
                {exerciseIndex + 1 < level!.exercises.length ? 'Câu tiếp →' : 'Hoàn thành 🎉'}
              </button>
            )}
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}