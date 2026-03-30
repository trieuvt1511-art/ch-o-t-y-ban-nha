import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, X, ArrowRight, Lightbulb } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { useApp } from '@/context/AppContext';

interface SentenceLevel {
  id: string;
  name: string;
  description: string;
  pattern: string;
  emoji: string;
  gradient: string;
  exercises: SentenceExercise[];
}

interface SentenceExercise {
  id: string;
  instruction: string;
  slots: { label: string; options: string[]; correct: string }[];
  translation: string;
  tip?: string;
}

const LEVELS: SentenceLevel[] = [
  {
    id: 'beginner',
    name: 'Người mới',
    description: 'Chủ ngữ + Động từ',
    pattern: 'S + V',
    emoji: '🌱',
    gradient: 'gradient-success',
    exercises: [
      {
        id: 'b1', instruction: 'Ghép câu: "Tôi ăn"',
        slots: [
          { label: 'Chủ ngữ', options: ['Yo', 'Tú', 'Él'], correct: 'Yo' },
          { label: 'Động từ', options: ['como', 'hablas', 'bebe'], correct: 'como' },
        ],
        translation: 'Yo como. = Tôi ăn.',
        tip: '"Yo" = Tôi. Động từ "comer" chia với "yo" → "como"',
      },
      {
        id: 'b2', instruction: 'Ghép câu: "Bạn nói"',
        slots: [
          { label: 'Chủ ngữ', options: ['Yo', 'Tú', 'Ella'], correct: 'Tú' },
          { label: 'Động từ', options: ['como', 'hablas', 'bebe'], correct: 'hablas' },
        ],
        translation: 'Tú hablas. = Bạn nói.',
        tip: '"Tú" = Bạn. "Hablar" chia với "tú" → "hablas"',
      },
      {
        id: 'b3', instruction: 'Ghép câu: "Anh ấy uống"',
        slots: [
          { label: 'Chủ ngữ', options: ['Yo', 'Tú', 'Él'], correct: 'Él' },
          { label: 'Động từ', options: ['como', 'hablas', 'bebe'], correct: 'bebe' },
        ],
        translation: 'Él bebe. = Anh ấy uống.',
        tip: '"Él" = Anh ấy. "Beber" chia với "él" → "bebe"',
      },
      {
        id: 'b4', instruction: 'Ghép câu: "Cô ấy ngủ"',
        slots: [
          { label: 'Chủ ngữ', options: ['Yo', 'Ella', 'Nosotros'], correct: 'Ella' },
          { label: 'Động từ', options: ['duermo', 'duerme', 'dormimos'], correct: 'duerme' },
        ],
        translation: 'Ella duerme. = Cô ấy ngủ.',
        tip: '"Ella" = Cô ấy. "Dormir" chia với "ella" → "duerme"',
      },
      {
        id: 'b5', instruction: 'Ghép câu: "Chúng tôi chạy"',
        slots: [
          { label: 'Chủ ngữ', options: ['Yo', 'Tú', 'Nosotros'], correct: 'Nosotros' },
          { label: 'Động từ', options: ['corro', 'corres', 'corremos'], correct: 'corremos' },
        ],
        translation: 'Nosotros corremos. = Chúng tôi chạy.',
        tip: '"Nosotros" = Chúng tôi. "Correr" → "corremos"',
      },
      {
        id: 'b6', instruction: 'Ghép câu: "Tôi đọc"',
        slots: [
          { label: 'Chủ ngữ', options: ['Yo', 'Tú', 'Él'], correct: 'Yo' },
          { label: 'Động từ', options: ['leo', 'lees', 'lee'], correct: 'leo' },
        ],
        translation: 'Yo leo. = Tôi đọc.',
      },
    ],
  },
  {
    id: 'elementary',
    name: 'Sơ cấp',
    description: 'Chủ ngữ + Động từ + Tân ngữ',
    pattern: 'S + V + O',
    emoji: '🌿',
    gradient: 'gradient-travel',
    exercises: [
      {
        id: 'e1', instruction: 'Ghép câu: "Tôi ăn cơm"',
        slots: [
          { label: 'Chủ ngữ', options: ['Yo', 'Tú', 'Ella'], correct: 'Yo' },
          { label: 'Động từ', options: ['como', 'comes', 'come'], correct: 'como' },
          { label: 'Tân ngữ', options: ['arroz', 'café', 'agua'], correct: 'arroz' },
        ],
        translation: 'Yo como arroz. = Tôi ăn cơm.',
        tip: 'Tân ngữ (Object) đặt sau động từ: como + arroz',
      },
      {
        id: 'e2', instruction: 'Ghép câu: "Cô ấy uống cà phê"',
        slots: [
          { label: 'Chủ ngữ', options: ['Yo', 'Ella', 'Nosotros'], correct: 'Ella' },
          { label: 'Động từ', options: ['bebo', 'bebes', 'bebe'], correct: 'bebe' },
          { label: 'Tân ngữ', options: ['arroz', 'café', 'leche'], correct: 'café' },
        ],
        translation: 'Ella bebe café. = Cô ấy uống cà phê.',
      },
      {
        id: 'e3', instruction: 'Ghép câu: "Bạn đọc sách"',
        slots: [
          { label: 'Chủ ngữ', options: ['Yo', 'Tú', 'Él'], correct: 'Tú' },
          { label: 'Động từ', options: ['leo', 'lees', 'lee'], correct: 'lees' },
          { label: 'Tân ngữ', options: ['un libro', 'una carta', 'el periódico'], correct: 'un libro' },
        ],
        translation: 'Tú lees un libro. = Bạn đọc sách.',
        tip: '"un libro" = một cuốn sách. "Un" là mạo từ không xác định.',
      },
      {
        id: 'e4', instruction: 'Ghép câu: "Chúng tôi nấu gà"',
        slots: [
          { label: 'Chủ ngữ', options: ['Yo', 'Nosotros', 'Ellos'], correct: 'Nosotros' },
          { label: 'Động từ', options: ['cocino', 'cocinamos', 'cocinan'], correct: 'cocinamos' },
          { label: 'Tân ngữ', options: ['pollo', 'pescado', 'arroz'], correct: 'pollo' },
        ],
        translation: 'Nosotros cocinamos pollo. = Chúng tôi nấu gà.',
      },
      {
        id: 'e5', instruction: 'Ghép câu: "Anh ấy viết thư"',
        slots: [
          { label: 'Chủ ngữ', options: ['Yo', 'Tú', 'Él'], correct: 'Él' },
          { label: 'Động từ', options: ['escribo', 'escribes', 'escribe'], correct: 'escribe' },
          { label: 'Tân ngữ', options: ['una carta', 'un libro', 'un email'], correct: 'una carta' },
        ],
        translation: 'Él escribe una carta. = Anh ấy viết thư.',
        tip: '"una carta" = một bức thư. "Una" là mạo từ nữ.',
      },
      {
        id: 'e6', instruction: 'Ghép câu: "Tôi uống nước"',
        slots: [
          { label: 'Chủ ngữ', options: ['Yo', 'Tú', 'Ella'], correct: 'Yo' },
          { label: 'Động từ', options: ['bebo', 'bebes', 'bebe'], correct: 'bebo' },
          { label: 'Tân ngữ', options: ['agua', 'leche', 'café'], correct: 'agua' },
        ],
        translation: 'Yo bebo agua. = Tôi uống nước.',
      },
    ],
  },
];

export default function SentenceBuilderScreen() {
  const navigate = useNavigate();
  const { activeProfile } = useApp();
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showTip, setShowTip] = useState(false);

  if (!activeProfile) { navigate('/'); return null; }

  const level = selectedLevel !== null ? LEVELS[selectedLevel] : null;
  const exercise = level ? level.exercises[exerciseIndex] : null;

  const allCorrect = exercise
    ? exercise.slots.every((slot, i) => answers[i] === slot.correct)
    : false;

  const handleSubmit = () => {
    setSubmitted(true);
    if (allCorrect) setScore(prev => prev + 1);
  };

  const handleNext = () => {
    if (!level) return;
    setSubmitted(false);
    setAnswers({});
    setShowTip(false);
    if (exerciseIndex + 1 < level.exercises.length) {
      setExerciseIndex(prev => prev + 1);
    } else {
      setExerciseIndex(0);
      setSelectedLevel(null);
    }
  };

  const handleBack = () => {
    if (selectedLevel !== null) {
      setSelectedLevel(null);
      setExerciseIndex(0);
      setAnswers({});
      setSubmitted(false);
      setScore(0);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <div className="w-full max-w-[430px] px-4 pt-6 pb-24">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <button onClick={handleBack} className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-xl font-heading font-bold text-foreground">Ghép câu</h1>
          {level && (
            <span className="ml-auto text-xs font-bold text-muted-foreground bg-muted px-2.5 py-1 rounded-lg">
              {exerciseIndex + 1}/{level.exercises.length} · ⭐ {score}
            </span>
          )}
        </div>

        {!level ? (
          /* Level Selection */
          <div className="space-y-4 animate-slide-up">
            <p className="text-sm text-muted-foreground font-medium mb-2">
              Học cách ghép câu tiếng Tây Ban Nha từ đơn giản đến phức tạp
            </p>
            {LEVELS.map((lvl, i) => (
              <button
                key={lvl.id}
                onClick={() => { setSelectedLevel(i); setScore(0); }}
                className={`w-full ${lvl.gradient} rounded-2xl p-5 text-left card-hover shadow-card`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{lvl.emoji}</span>
                  <div className="flex-1">
                    <p className="font-heading font-bold text-lg text-foreground">{lvl.name}</p>
                    <p className="text-sm text-muted-foreground font-medium">{lvl.description}</p>
                    <div className="mt-2 inline-flex items-center gap-1 bg-white/60 rounded-lg px-2.5 py-1">
                      <code className="text-xs font-bold text-foreground">{lvl.pattern}</code>
                    </div>
                  </div>
                  <ArrowRight size={20} className="text-muted-foreground" />
                </div>
              </button>
            ))}
          </div>
        ) : exercise ? (
          /* Exercise */
          <div className="animate-slide-up">
            {/* Progress */}
            <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-5">
              <div
                className="h-full gradient-primary rounded-full transition-all duration-300"
                style={{ width: `${((exerciseIndex + 1) / level.exercises.length) * 100}%` }}
              />
            </div>

            {/* Pattern reminder */}
            <div className="bg-muted/60 rounded-xl px-4 py-2 mb-4 text-center">
              <span className="text-xs font-bold text-muted-foreground">Cấu trúc: </span>
              <code className="text-xs font-bold text-primary">{level.pattern}</code>
            </div>

            {/* Instruction */}
            <p className="text-lg font-heading font-bold text-foreground mb-5 text-center">
              {exercise.instruction}
            </p>

            {/* Slots */}
            <div className="space-y-3 mb-5">
              {exercise.slots.map((slot, i) => (
                <div key={i}>
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                    {slot.label}
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {slot.options.map(opt => {
                      const selected = answers[i] === opt;
                      const isCorrect = submitted && opt === slot.correct;
                      const isWrong = submitted && selected && opt !== slot.correct;
                      return (
                        <button
                          key={opt}
                          onClick={() => !submitted && setAnswers(prev => ({ ...prev, [i]: opt }))}
                          disabled={submitted}
                          className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                            isCorrect
                              ? 'bg-success text-success-foreground shadow-card animate-bounce-in'
                              : isWrong
                              ? 'bg-destructive text-destructive-foreground animate-shake'
                              : selected
                              ? 'gradient-primary text-primary-foreground shadow-card scale-105'
                              : 'bg-card shadow-card text-foreground hover:bg-accent'
                          }`}
                        >
                          {opt}
                          {isCorrect && <Check size={14} className="inline ml-1" />}
                          {isWrong && <X size={14} className="inline ml-1" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Sentence preview */}
            <div className="bg-card rounded-2xl shadow-card p-4 mb-4 text-center min-h-[60px] flex items-center justify-center">
              <p className="text-lg font-heading font-bold text-foreground">
                {exercise.slots.map((_, i) => answers[i] || '___').join(' ')}
                {exercise.slots.every((_, i) => answers[i]) ? '.' : ''}
              </p>
            </div>

            {/* Result */}
            {submitted && (
              <div className={`rounded-2xl p-4 mb-4 text-center animate-scale-in ${allCorrect ? 'bg-success/10' : 'bg-destructive/10'}`}>
                <p className="font-heading font-bold text-lg">
                  {allCorrect ? '🎉 Xuất sắc!' : '😅 Thử lại nhé!'}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{exercise.translation}</p>
              </div>
            )}

            {/* Tip */}
            {exercise.tip && (
              <button
                onClick={() => setShowTip(!showTip)}
                className="w-full flex items-center gap-2 text-sm text-secondary font-bold mb-4"
              >
                <Lightbulb size={16} />
                {showTip ? 'Ẩn gợi ý' : 'Xem gợi ý'}
              </button>
            )}
            {showTip && exercise.tip && (
              <div className="bg-secondary/10 rounded-xl p-3 mb-4 text-sm text-foreground animate-slide-up">
                💡 {exercise.tip}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              {!submitted ? (
                <button
                  onClick={handleSubmit}
                  disabled={!exercise.slots.every((_, i) => answers[i])}
                  className="flex-1 gradient-primary text-primary-foreground rounded-xl py-3.5 font-bold shadow-card hover:opacity-90 transition-opacity disabled:opacity-40"
                >
                  Kiểm tra
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex-1 gradient-primary text-primary-foreground rounded-xl py-3.5 font-bold shadow-card hover:opacity-90 transition-opacity"
                >
                  {exerciseIndex + 1 < level.exercises.length ? 'Câu tiếp →' : 'Hoàn thành 🎉'}
                </button>
              )}
            </div>
          </div>
        ) : null}
      </div>
      <BottomNav />
    </div>
  );
}
