import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Pause, Volume2, Mic, MicOff, MessageCircle, Music, Ear, Radio } from 'lucide-react';
import { LISTENING_VIDEOS, FILM_EXCERPTS } from '@/lib/listening-data';
import { SHORT_DIALOGUES, PRONUNCIATION_DRILLS, SHADOW_EXERCISES } from '@/lib/listening-exercises';
import VideoLesson from '@/components/listening/VideoLesson';
import FilmExcerptCard from '@/components/listening/FilmExcerptCard';
import BottomNav from '@/components/BottomNav';

const TABS = [
  { key: 'dialogues' as const, label: 'Hội thoại', icon: MessageCircle },
  { key: 'pronunciation' as const, label: 'Phát âm', icon: Ear },
  { key: 'shadowing' as const, label: 'Shadowing', icon: Radio },
  { key: 'videos' as const, label: 'Video', icon: Play },
  { key: 'films' as const, label: 'Phim', icon: Music },
];

type Tab = typeof TABS[number]['key'];

export default function ListeningScreen() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('dialogues');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedFilm, setSelectedFilm] = useState<string | null>(null);
  const [selectedDialogue, setSelectedDialogue] = useState<number | null>(null);
  const [selectedDrill, setSelectedDrill] = useState<number | null>(null);
  const [selectedShadow, setSelectedShadow] = useState<number | null>(null);
  const [speed, setSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const [dialogueAnswers, setDialogueAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [shadowStep, setShadowStep] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [voiceType, setVoiceType] = useState<'es-ES' | 'es-MX'>('es-ES');
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  const video = LISTENING_VIDEOS.find(v => v.id === selectedVideo);
  const film = FILM_EXCERPTS.find(f => f.id === selectedFilm);
  if (video) return <VideoLesson video={video} onBack={() => setSelectedVideo(null)} />;
  if (film) return <FilmExcerptCard excerpt={film} onBack={() => setSelectedFilm(null)} />;

  const speak = (text: string, rate = speed) => {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = voiceType;
    u.rate = rate;
    utterRef.current = u;
    u.onstart = () => setIsPlaying(true);
    u.onend = () => setIsPlaying(false);
    speechSynthesis.speak(u);
  };

  const stopSpeech = () => { speechSynthesis.cancel(); setIsPlaying(false); };

  const playDialogue = (dialogueIdx: number) => {
    const d = SHORT_DIALOGUES[dialogueIdx];
    let i = 0;
    const playNext = () => {
      if (i >= d.lines.length) { setIsPlaying(false); return; }
      setCurrentLine(i);
      const u = new SpeechSynthesisUtterance(d.lines[i].spanish);
      u.lang = voiceType;
      u.rate = speed;
      u.onend = () => { i++; setTimeout(playNext, 500); };
      speechSynthesis.speak(u);
    };
    setIsPlaying(true);
    playNext();
  };

  const dialogue = selectedDialogue !== null ? SHORT_DIALOGUES[selectedDialogue] : null;
  const drill = selectedDrill !== null ? PRONUNCIATION_DRILLS[selectedDrill] : null;
  const shadow = selectedShadow !== null ? SHADOW_EXERCISES[selectedShadow] : null;

  const DIFF_COLORS: Record<string, string> = {
    'Dễ': 'bg-success/15 text-success',
    'Trung bình': 'bg-secondary/15 text-secondary',
    'Khó': 'bg-primary/15 text-primary',
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <div className="w-full max-w-[430px] px-5 pt-6 pb-24 page-enter">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => {
            if (dialogue !== null) { setSelectedDialogue(null); setDialogueAnswers({}); setShowResults(false); setCurrentLine(0); }
            else if (drill !== null) setSelectedDrill(null);
            else if (shadow !== null) { setSelectedShadow(null); setShadowStep(0); }
            else navigate('/dashboard');
          }} className="btn-icon bg-muted text-muted-foreground hover:text-foreground hover:bg-accent">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-heading font-bold text-foreground">Luyện nghe</h1>
        </div>

        {/* Voice selector */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-bold text-muted-foreground">Giọng:</span>
          {(['es-ES', 'es-MX'] as const).map(v => (
            <button key={v} onClick={() => setVoiceType(v)}
              className={`text-xs font-bold px-2.5 py-1 rounded-lg transition-all ${voiceType === v ? 'gradient-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
              {v === 'es-ES' ? '🇪🇸 Tây Ban Nha' : '🇲🇽 Mexico'}
            </button>
          ))}
        </div>

        {/* Tabs */}
        {!dialogue && !drill && !shadow && (
          <div className="flex gap-1.5 overflow-x-auto pb-3 mb-4 scrollbar-hide">
            {TABS.map(t => (
              <button key={t.key} onClick={() => setTab(t.key)}
                className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${tab === t.key ? 'gradient-primary text-primary-foreground shadow-card' : 'bg-muted text-muted-foreground'}`}>
                <t.icon size={14} />{t.label}
              </button>
            ))}
          </div>
        )}

        {/* DIALOGUES TAB */}
        {tab === 'dialogues' && !dialogue && (
          <div className="space-y-3 animate-slide-up">
            {SHORT_DIALOGUES.map((d, i) => (
              <button key={d.id} onClick={() => setSelectedDialogue(i)}
                className="w-full rounded-2xl bg-card shadow-card p-4 text-left card-hover">
                <p className="font-heading font-bold text-foreground">{d.title}</p>
                <p className="text-xs text-muted-foreground">{d.titleVi}</p>
                <div className="flex gap-2 mt-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-lg ${DIFF_COLORS[d.difficulty]}`}>{d.difficulty}</span>
                  <span className="text-xs text-muted-foreground">💬 {d.lines.length} câu</span>
                  <span className="text-xs text-muted-foreground">❓ {d.questions.length} quiz</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* DIALOGUE DETAIL */}
        {dialogue && (
          <div className="animate-slide-up">
            <div className="rounded-2xl bg-card shadow-card p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <p className="font-heading font-bold text-foreground">{dialogue.title}</p>
                <div className="flex items-center gap-2">
                  {[0.5, 0.75, 1, 1.25].map(s => (
                    <button key={s} onClick={() => setSpeed(s)}
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${speed === s ? 'gradient-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                      {s}x
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={() => isPlaying ? stopSpeech() : playDialogue(selectedDialogue!)}
                className="w-full gradient-primary text-primary-foreground rounded-xl py-2.5 font-bold text-sm flex items-center justify-center gap-2 mb-3 shadow-card">
                {isPlaying ? <><Pause size={16} /> Dừng</> : <><Play size={16} /> Nghe hội thoại</>}
              </button>
              <div className="space-y-2">
                {dialogue.lines.map((line, i) => (
                  <div key={i} className={`rounded-xl px-3 py-2 transition-all ${currentLine === i && isPlaying ? 'bg-primary/10 border border-primary/30' : 'bg-muted/50'}`}>
                    <div className="flex items-start gap-2">
                      <span className="text-lg">{line.speaker}</span>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-foreground">{line.spanish}</p>
                        <p className="text-xs text-muted-foreground">{line.vietnamese}</p>
                      </div>
                      <button onClick={() => speak(line.spanish)} className="text-muted-foreground hover:text-primary p-1">
                        <Volume2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quiz */}
            <div className="rounded-2xl bg-card shadow-card p-4">
              <p className="font-heading font-bold text-foreground mb-3">❓ Kiểm tra hiểu</p>
              {dialogue.questions.map((q, qi) => (
                <div key={qi} className="mb-4">
                  <p className="text-sm font-bold text-foreground mb-2">{qi + 1}. {q.question}</p>
                  <div className="space-y-1.5">
                    {q.options.map((opt, oi) => {
                      const selected = dialogueAnswers[qi] === oi;
                      const isCorrect = showResults && oi === q.correct;
                      const isWrong = showResults && selected && oi !== q.correct;
                      return (
                        <button key={oi} onClick={() => !showResults && setDialogueAnswers(prev => ({ ...prev, [qi]: oi }))}
                          className={`w-full text-left rounded-xl px-3 py-2 text-sm font-medium transition-all ${isCorrect ? 'bg-success/15 text-success font-bold' : isWrong ? 'bg-destructive/15 text-destructive' : selected ? 'bg-primary/10 text-primary font-bold' : 'bg-muted/50 text-foreground hover:bg-accent'}`}>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
              {!showResults && Object.keys(dialogueAnswers).length === dialogue.questions.length && (
                <button onClick={() => setShowResults(true)}
                  className="w-full gradient-primary text-primary-foreground rounded-xl py-2.5 font-bold text-sm shadow-card">Kiểm tra</button>
              )}
              {showResults && (
                <div className="text-center text-sm font-bold text-success animate-bounce-in">
                  🎉 {dialogue.questions.filter((q, i) => dialogueAnswers[i] === q.correct).length}/{dialogue.questions.length} đúng!
                </div>
              )}
            </div>
          </div>
        )}

        {/* PRONUNCIATION TAB */}
        {tab === 'pronunciation' && !drill && (
          <div className="space-y-3 animate-slide-up">
            {PRONUNCIATION_DRILLS.map((d, i) => (
              <button key={d.id} onClick={() => setSelectedDrill(i)}
                className="w-full rounded-2xl bg-card shadow-card p-4 text-left card-hover">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{d.emoji}</span>
                  <div>
                    <p className="font-heading font-bold text-foreground">{d.title}</p>
                    <p className="text-xs text-muted-foreground">{d.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {drill && (
          <div className="animate-slide-up">
            <div className="rounded-2xl bg-card shadow-card p-5 mb-4 text-center">
              <span className="text-5xl">{drill.emoji}</span>
              <p className="font-heading font-bold text-xl text-foreground mt-2">{drill.title}</p>
              <p className="text-sm text-muted-foreground">{drill.description}</p>
            </div>
            <div className="space-y-2">
              {drill.words.map((w, i) => (
                <div key={i} className="rounded-2xl bg-card shadow-card p-4 flex items-center gap-3">
                  <button onClick={() => speak(w.spanish.split(' - ')[0] || w.spanish, 0.7)}
                    className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground shadow-card shrink-0">
                    <Volume2 size={18} />
                  </button>
                  <div className="flex-1">
                    <p className="font-heading font-bold text-foreground">{w.spanish}</p>
                    <p className="text-xs text-muted-foreground">[{w.phonetic}] — {w.vietnamese}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SHADOWING TAB */}
        {tab === 'shadowing' && !shadow && (
          <div className="space-y-3 animate-slide-up">
            <p className="text-sm text-muted-foreground mb-2">Nghe → Dừng → Nói theo → So sánh</p>
            {SHADOW_EXERCISES.map((s, i) => (
              <button key={s.id} onClick={() => setSelectedShadow(i)}
                className="w-full rounded-2xl bg-card shadow-card p-4 text-left card-hover">
                <p className="font-heading font-bold text-foreground">{s.title}</p>
                <p className="text-xs text-muted-foreground">{s.sentences.length} câu luyện tập</p>
              </button>
            ))}
          </div>
        )}

        {shadow && (
          <div className="animate-slide-up">
            <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-5">
              <div className="h-full gradient-primary rounded-full transition-all duration-300" style={{ width: `${((shadowStep + 1) / shadow.sentences.length) * 100}%` }} />
            </div>

            <p className="text-xs font-bold text-muted-foreground text-center mb-4">{shadowStep + 1} / {shadow.sentences.length}</p>

            <div className="rounded-2xl bg-card shadow-elevated p-6 text-center mb-5">
              <p className="text-xl font-heading font-bold text-foreground mb-2">{shadow.sentences[shadowStep].spanish}</p>
              <p className="text-sm text-muted-foreground">{shadow.sentences[shadowStep].vietnamese}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <button onClick={() => speak(shadow.sentences[shadowStep].spanish)}
                className="rounded-xl gradient-primary text-primary-foreground py-3 font-bold text-sm flex items-center justify-center gap-2 shadow-card">
                <Volume2 size={16} /> Nghe
              </button>
              <button onClick={() => speak(shadow.sentences[shadowStep].spanish, 0.6)}
                className="rounded-xl bg-muted text-foreground py-3 font-bold text-sm flex items-center justify-center gap-2">
                🐢 Chậm
              </button>
            </div>

            <div className="flex gap-3">
              <button disabled={shadowStep === 0} onClick={() => setShadowStep(prev => prev - 1)}
                className="flex-1 rounded-xl bg-muted text-muted-foreground py-3 font-bold text-sm disabled:opacity-30">← Trước</button>
              <button disabled={shadowStep >= shadow.sentences.length - 1} onClick={() => setShadowStep(prev => prev + 1)}
                className="flex-1 rounded-xl gradient-primary text-primary-foreground py-3 font-bold text-sm shadow-card disabled:opacity-30">Tiếp →</button>
            </div>
          </div>
        )}

        {/* VIDEOS TAB */}
        {tab === 'videos' && (
          <div className="space-y-3 animate-slide-up">
            {LISTENING_VIDEOS.map((v, i) => (
              <button key={v.id} onClick={() => setSelectedVideo(v.id)}
                className="w-full rounded-2xl bg-card shadow-card p-4 text-left card-hover">
                <p className="font-heading font-bold text-foreground text-sm">{v.title}</p>
                <p className="text-xs text-muted-foreground">{v.titleVi}</p>
                <div className="flex gap-2 mt-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-lg ${DIFF_COLORS[v.difficulty]}`}>{v.difficulty}</span>
                  <span className="text-xs text-muted-foreground">⏱ {v.duration}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* FILMS TAB */}
        {tab === 'films' && (
          <div className="space-y-3 animate-slide-up">
            {FILM_EXCERPTS.map((f, i) => (
              <button key={f.id} onClick={() => setSelectedFilm(f.id)}
                className="w-full rounded-2xl bg-card shadow-card p-4 text-left card-hover">
                <p className="font-heading font-bold text-foreground text-sm">{f.filmTitle}</p>
                <p className="text-xs text-muted-foreground">{f.filmTitleVi} — {f.sceneVi}</p>
                <div className="flex gap-2 mt-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-lg ${DIFF_COLORS[f.difficulty]}`}>{f.difficulty}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
