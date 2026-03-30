import { useState } from 'react';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { ListeningVideo } from '@/lib/listening-data';

interface Props {
  video: ListeningVideo;
  onBack: () => void;
}

export default function VideoLesson({ video, onBack }: Props) {
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [showResults, setShowResults] = useState<Record<string, boolean>>({});

  const handleAnswer = (qId: string, idx: number) => {
    if (showResults[qId]) return;
    setAnswers(prev => ({ ...prev, [qId]: idx }));
  };

  const checkAnswer = (qId: string) => {
    setShowResults(prev => ({ ...prev, [qId]: true }));
  };

  const allAnswered = video.questions.every(q => showResults[q.id]);
  const correctCount = video.questions.filter(q => answers[q.id] === q.correctIndex).length;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <div className="w-full max-w-[390px] px-4 pt-6 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={22} />
          </button>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-foreground text-sm truncate">{video.title}</p>
            <p className="text-xs text-muted-foreground">{video.titleVi}</p>
          </div>
        </div>

        {/* YouTube Embed */}
        <div className="w-full aspect-video rounded-lg overflow-hidden shadow-card mb-5 bg-foreground/5">
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={video.title}
          />
        </div>

        <p className="text-sm text-muted-foreground mb-5">{video.description}</p>

        {/* Questions */}
        <h2 className="font-bold text-foreground mb-3">📝 Bài tập nghe hiểu</h2>

        <div className="space-y-4">
          {video.questions.map((q, qi) => {
            const answered = answers[q.id] !== undefined && answers[q.id] !== null;
            const checked = showResults[q.id];
            const isCorrect = answers[q.id] === q.correctIndex;

            return (
              <div key={q.id} className="rounded-lg bg-card shadow-card p-4 animate-scale-in" style={{ animationDelay: `${qi * 0.05}s` }}>
                <p className="font-semibold text-foreground text-sm mb-1">Câu {qi + 1}: {q.question}</p>
                <p className="text-xs text-muted-foreground mb-3">{q.questionVi}</p>

                <div className="space-y-2">
                  {q.options.map((opt, oi) => {
                    let style = 'border-border text-foreground';
                    if (checked) {
                      if (oi === q.correctIndex) style = 'border-success bg-success/10 text-success';
                      else if (oi === answers[q.id] && !isCorrect) style = 'border-destructive bg-destructive/10 text-destructive';
                    } else if (answers[q.id] === oi) {
                      style = 'border-primary bg-primary/10 text-primary';
                    }

                    return (
                      <button
                        key={oi}
                        onClick={() => handleAnswer(q.id, oi)}
                        className={`w-full text-left rounded-md border px-3 py-2 text-sm font-medium transition-all ${style}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {answered && !checked && (
                  <button onClick={() => checkAnswer(q.id)} className="mt-3 w-full bg-primary text-primary-foreground rounded-md py-2 text-sm font-bold hover:opacity-90 transition-opacity">
                    Kiểm tra
                  </button>
                )}

                {checked && (
                  <div className={`mt-3 flex items-start gap-2 p-2 rounded-md text-sm ${isCorrect ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
                    {isCorrect ? <CheckCircle size={16} className="shrink-0 mt-0.5" /> : <XCircle size={16} className="shrink-0 mt-0.5" />}
                    <span>{isCorrect ? 'Chính xác! ' : 'Sai rồi. '}{q.explanation}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {allAnswered && (
          <div className="mt-6 rounded-lg bg-card shadow-elevated p-5 text-center animate-scale-in">
            <p className="text-3xl mb-2">{correctCount === video.questions.length ? '🎉' : '💪'}</p>
            <p className="font-bold text-foreground text-lg">{correctCount}/{video.questions.length} câu đúng</p>
            <p className="text-sm text-muted-foreground mt-1">
              {correctCount === video.questions.length ? 'Xuất sắc! Bạn nghe rất tốt!' : 'Tiếp tục luyện nghe nhé!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
