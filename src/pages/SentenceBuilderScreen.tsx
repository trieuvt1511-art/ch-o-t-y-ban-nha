import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, X, ArrowRight, Lightbulb, BookOpen } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { useApp } from '@/context/AppContext';
import { SENTENCE_LEVELS, GRAMMAR_TOPICS } from '@/lib/sentence-data';

export default function SentenceBuilderScreen() {
  const navigate = useNavigate();
  const { user } = useApp();
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

        {view === 'menu' && (
          <div className="space-y-6 animate-slide-up">
            {/* Sentence Levels */}
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

            {/* Grammar Topics */}
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

        {view === 'exercise' && exercise && (
          <div className="animate-slide-up">
            <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-5">
              <div className="h-full gradient-primary rounded-full transition-all duration-300" style={{ width: `${((exerciseIndex + 1) / level!.exercises.length) * 100}%` }} />
            </div>

            <div className="bg-muted/60 rounded-xl px-4 py-2 mb-4 text-center">
              <span className="text-xs font-bold text-muted-foreground">Cấu trúc: </span>
              <code className="text-xs font-bold text-primary">{level!.pattern}</code>
            </div>

            <p className="text-lg font-heading font-bold text-foreground mb-5 text-center">{exercise.instruction}</p>

            <div className="space-y-3 mb-5">
              {exercise.slots.map((slot, i) => (
                <div key={i}>
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block">{slot.label}</label>
                  <div className="flex gap-2 flex-wrap">
                    {slot.options.map(opt => {
                      const selected = answers[i] === opt;
                      const isCorrect = submitted && opt === slot.correct;
                      const isWrong = submitted && selected && opt !== slot.correct;
                      return (
                        <button key={opt} onClick={() => !submitted && setAnswers(prev => ({ ...prev, [i]: opt }))} disabled={submitted}
                          className={`px-3 py-2 rounded-xl text-sm font-bold transition-all ${isCorrect ? 'bg-success text-success-foreground shadow-card animate-bounce-in' : isWrong ? 'bg-destructive text-destructive-foreground animate-shake' : selected ? 'gradient-primary text-primary-foreground shadow-card scale-105' : 'bg-card shadow-card text-foreground hover:bg-accent'}`}>
                          {opt}
                          {isCorrect && <Check size={12} className="inline ml-1" />}
                          {isWrong && <X size={12} className="inline ml-1" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-card rounded-2xl shadow-card p-4 mb-4 text-center min-h-[50px] flex items-center justify-center">
              <p className="text-base font-heading font-bold text-foreground">
                {exercise.slots.map((_, i) => answers[i] || '___').join(' ')}{exercise.slots.every((_, i) => answers[i]) ? '.' : ''}
              </p>
            </div>

            {submitted && (
              <div className={`rounded-2xl p-4 mb-4 text-center animate-scale-in ${allCorrect ? 'bg-success/10' : 'bg-destructive/10'}`}>
                <p className="font-heading font-bold text-lg">{allCorrect ? '🎉 Xuất sắc!' : '😅 Thử lại nhé!'}</p>
                <p className="text-sm text-muted-foreground mt-1">{exercise.translation}</p>
              </div>
            )}

            {exercise.tip && (
              <button onClick={() => setShowTip(!showTip)} className="w-full flex items-center gap-2 text-sm text-secondary font-bold mb-4">
                <Lightbulb size={16} />{showTip ? 'Ẩn gợi ý' : 'Xem gợi ý'}
              </button>
            )}
            {showTip && exercise.tip && (
              <div className="bg-secondary/10 rounded-xl p-3 mb-4 text-sm text-foreground animate-slide-up">💡 {exercise.tip}</div>
            )}

            {!submitted ? (
              <button onClick={handleSubmit} disabled={!exercise.slots.every((_, i) => answers[i])}
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
