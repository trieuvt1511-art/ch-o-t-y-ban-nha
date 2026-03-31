import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Pause, Volume2, MessageCircle, Music, Ear, Radio, Mic, BookOpen, ChevronDown } from 'lucide-react';
import { SHORT_DIALOGUES, PRONUNCIATION_DRILLS, SHADOW_EXERCISES, SONGS, PODCAST_EPISODES } from '@/lib/listening-exercises';
import BottomNav from '@/components/BottomNav';
import { VoiceWaveformCompare } from '@/components/VoiceWaveformCompare';

const TABS = [
  { key: 'dialogues' as const, label: 'Hội thoại', icon: MessageCircle, emoji: '💬' },
  { key: 'songs' as const, label: 'Bài hát', icon: Music, emoji: '🎵' },
  { key: 'pronunciation' as const, label: 'Phát âm', icon: Ear, emoji: '🔤' },
  { key: 'podcasts' as const, label: 'Podcast', icon: BookOpen, emoji: '🎙️' },
  { key: 'shadowing' as const, label: 'Shadow', icon: Radio, emoji: '🔁' },
];
type Tab = typeof TABS[number]['key'];

const DIFF_COLORS: Record<string, string> = {
  'Dễ': 'bg-success/15 text-success',
  'Trung bình': 'bg-secondary/15 text-secondary',
  'Khó': 'bg-primary/15 text-primary',
  'Beginner': 'bg-success/15 text-success',
  'Intermediate': 'bg-secondary/15 text-secondary',
};

export default function ListeningScreen() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('dialogues');
  const [voiceType, setVoiceType] = useState<'es-ES' | 'es-MX'>('es-ES');
  const [speed, setSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLine, setCurrentLine] = useState(-1);
  const [currentWord, setCurrentWord] = useState(-1);

  // Detail selections
  const [selectedDialogue, setSelectedDialogue] = useState<number | null>(null);
  const [selectedDrill, setSelectedDrill] = useState<number | null>(null);
  const [selectedShadow, setSelectedShadow] = useState<number | null>(null);
  const [selectedSong, setSelectedSong] = useState<number | null>(null);
  const [selectedPodcast, setSelectedPodcast] = useState<number | null>(null);

  // Quiz state
  const [dialogueAnswers, setDialogueAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [podcastAnswers, setPodcastAnswers] = useState<Record<number, number>>({});
  const [showPodcastResults, setShowPodcastResults] = useState(false);
  const [shadowStep, setShadowStep] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);

  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);
  const playingRef = useRef(false);

  const speak = useCallback((text: string, rate = speed) => {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = voiceType;
    u.rate = rate;
    utterRef.current = u;
    u.onstart = () => setIsPlaying(true);
    u.onend = () => { setIsPlaying(false); setCurrentWord(-1); };
    speechSynthesis.speak(u);
  }, [voiceType, speed]);

  const stopSpeech = () => { speechSynthesis.cancel(); setIsPlaying(false); playingRef.current = false; setCurrentWord(-1); };

  // Play dialogue with word-by-word highlight
  const playDialogueLines = useCallback((lines: { spanish: string }[], startIdx = 0) => {
    playingRef.current = true;
    let i = startIdx;
    const playNext = () => {
      if (!playingRef.current || i >= lines.length) { setIsPlaying(false); playingRef.current = false; setCurrentLine(-1); setCurrentWord(-1); return; }
      setCurrentLine(i);
      const words = lines[i].spanish.split(' ');
      let w = 0;
      const u = new SpeechSynthesisUtterance(lines[i].spanish);
      u.lang = voiceType;
      u.rate = speed;
      u.onboundary = (e) => {
        if (e.name === 'word') { setCurrentWord(w); w++; }
      };
      u.onend = () => { i++; setCurrentWord(-1); setTimeout(playNext, 400); };
      speechSynthesis.speak(u);
    };
    setIsPlaying(true);
    playNext();
  }, [voiceType, speed]);

  const inDetail = selectedDialogue !== null || selectedDrill !== null || selectedShadow !== null || selectedSong !== null || selectedPodcast !== null;

  const handleBack = () => {
    stopSpeech();
    if (selectedDialogue !== null) { setSelectedDialogue(null); setDialogueAnswers({}); setShowResults(false); setCurrentLine(-1); }
    else if (selectedDrill !== null) setSelectedDrill(null);
    else if (selectedShadow !== null) { setSelectedShadow(null); setShadowStep(0); }
    else if (selectedSong !== null) { setSelectedSong(null); setShowTranslation(false); }
    else if (selectedPodcast !== null) { setSelectedPodcast(null); setPodcastAnswers({}); setShowPodcastResults(false); }
    else navigate('/dashboard');
  };

  const dialogue = selectedDialogue !== null ? SHORT_DIALOGUES[selectedDialogue] : null;
  const drill = selectedDrill !== null ? PRONUNCIATION_DRILLS[selectedDrill] : null;
  const shadow = selectedShadow !== null ? SHADOW_EXERCISES[selectedShadow] : null;
  const song = selectedSong !== null ? SONGS[selectedSong] : null;
  const podcast = selectedPodcast !== null ? PODCAST_EPISODES[selectedPodcast] : null;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <div className="w-full max-w-[430px] px-5 pt-6 pb-24 page-enter">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <button onClick={handleBack} className="btn-icon bg-muted text-muted-foreground hover:text-foreground hover:bg-accent">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-heading font-bold text-foreground">Luyện nghe</h1>
        </div>

        {/* Voice + Speed */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-muted-foreground">Giọng:</span>
            {(['es-ES', 'es-MX'] as const).map(v => (
              <button key={v} onClick={() => setVoiceType(v)}
                className={`text-xs font-bold px-2.5 py-1 rounded-lg transition-all ${voiceType === v ? 'gradient-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                {v === 'es-ES' ? '🇪🇸' : '🇲🇽'}
              </button>
            ))}
          </div>
          {inDetail && (
            <div className="flex items-center gap-1">
              {[0.5, 0.75, 1, 1.25].map(s => (
                <button key={s} onClick={() => setSpeed(s)}
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${speed === s ? 'gradient-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  {s}x
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tabs */}
        {!inDetail && (
          <div className="flex gap-1.5 overflow-x-auto pb-3 mb-4 scrollbar-hide">
            {TABS.map(t => (
              <button key={t.key} onClick={() => setTab(t.key)}
                className={`shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${tab === t.key ? 'gradient-primary text-primary-foreground shadow-card' : 'bg-muted text-muted-foreground'}`}>
                <span>{t.emoji}</span>{t.label}
              </button>
            ))}
          </div>
        )}

        {/* ========== 1. DIALOGUES ========== */}
        {tab === 'dialogues' && !inDetail && (
          <div className="space-y-3 animate-slide-up">
            <p className="text-xs text-muted-foreground mb-2">💬 {SHORT_DIALOGUES.length} hội thoại · Nghe + quiz</p>
            {SHORT_DIALOGUES.map((d, i) => (
              <button key={d.id} onClick={() => setSelectedDialogue(i)}
                className="w-full rounded-2xl bg-card shadow-card p-4 text-left card-hover">
                <p className="font-heading font-bold text-foreground text-sm">{d.title}</p>
                <p className="text-xs text-muted-foreground">{d.titleVi}</p>
                <div className="flex gap-2 mt-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${DIFF_COLORS[d.difficulty]}`}>{d.difficulty}</span>
                  <span className="text-[10px] text-muted-foreground">{d.category}</span>
                  <span className="text-[10px] text-muted-foreground">💬{d.lines.length} ❓{d.questions.length}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* DIALOGUE DETAIL */}
        {dialogue && (
          <div className="animate-slide-up">
            <div className="rounded-2xl bg-card shadow-card p-4 mb-4">
              <p className="font-heading font-bold text-foreground mb-1">{dialogue.title}</p>
              <p className="text-xs text-muted-foreground mb-3">{dialogue.titleVi}</p>

              <button onClick={() => isPlaying ? stopSpeech() : playDialogueLines(dialogue.lines)}
                className="w-full gradient-primary text-primary-foreground rounded-xl py-2.5 font-bold text-sm flex items-center justify-center gap-2 mb-3 shadow-card">
                {isPlaying ? <><Pause size={16} /> Dừng</> : <><Play size={16} /> Nghe hội thoại</>}
              </button>

              <div className="space-y-2">
                {dialogue.lines.map((line, i) => {
                  const words = line.spanish.split(' ');
                  const isActive = currentLine === i && isPlaying;
                  return (
                    <div key={i} className={`rounded-xl px-3 py-2 transition-all ${isActive ? 'bg-primary/10 border border-primary/30' : 'bg-muted/50'}`}>
                      <div className="flex items-start gap-2">
                        <span className="text-lg">{line.speaker}</span>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-foreground">
                            {isActive ? words.map((w, wi) => (
                              <span key={wi} className={`${wi === currentWord ? 'bg-primary/20 text-primary rounded px-0.5' : ''} transition-all`}>
                                {w}{' '}
                              </span>
                            )) : line.spanish}
                          </p>
                          <p className="text-xs text-muted-foreground">{line.vietnamese}</p>
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); speak(line.spanish); }} className="text-muted-foreground hover:text-primary p-1">
                          <Volume2 size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Fill in blank */}
            {dialogue.fillBlank && (
              <div className="rounded-2xl bg-card shadow-card p-4 mb-4">
                <p className="text-xs font-bold text-muted-foreground uppercase mb-2">✍️ Điền từ</p>
                <p className="text-sm font-bold text-foreground mb-1">{dialogue.fillBlank.sentence}</p>
                <p className="text-xs text-muted-foreground">💡 {dialogue.fillBlank.hint} → <span className="text-primary font-bold">{dialogue.fillBlank.answer}</span></p>
              </div>
            )}

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

        {/* ========== 2. SONGS ========== */}
        {tab === 'songs' && !inDetail && (
          <div className="space-y-3 animate-slide-up">
            <p className="text-xs text-muted-foreground mb-2">🎵 {SONGS.length} bài hát · Từ vựng qua âm nhạc</p>
            {SONGS.map((s, i) => (
              <button key={s.id} onClick={() => setSelectedSong(i)}
                className="w-full rounded-2xl bg-card shadow-card p-4 text-left card-hover">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{s.emoji}</span>
                  <div className="flex-1">
                    <p className="font-heading font-bold text-foreground text-sm">{s.title}</p>
                    <p className="text-xs text-muted-foreground">{s.artist}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${DIFF_COLORS[s.difficulty]}`}>{s.difficulty}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* SONG DETAIL */}
        {song && (
          <div className="animate-slide-up">
            <div className="rounded-2xl bg-card shadow-card p-5 mb-4 text-center">
              <span className="text-5xl">{song.emoji}</span>
              <p className="font-heading font-bold text-xl text-foreground mt-2">{song.title}</p>
              <p className="text-sm text-muted-foreground">{song.artist}</p>
            </div>

            <div className="flex gap-2 mb-4">
              <button onClick={() => {
                const fullLyrics = song.lyrics.map(l => l.spanish).join('. ');
                isPlaying ? stopSpeech() : playDialogueLines(song.lyrics.map(l => ({ spanish: l.spanish })));
              }}
                className="flex-1 gradient-primary text-primary-foreground rounded-xl py-2.5 font-bold text-sm flex items-center justify-center gap-2 shadow-card">
                {isPlaying ? <><Pause size={16} /> Dừng</> : <><Play size={16} /> Sing-along</>}
              </button>
              <button onClick={() => setShowTranslation(!showTranslation)}
                className={`px-4 rounded-xl font-bold text-sm ${showTranslation ? 'gradient-secondary text-secondary-foreground' : 'bg-muted text-muted-foreground'}`}>
                🇻🇳
              </button>
            </div>

            <div className="space-y-2">
              {song.lyrics.map((line, i) => {
                const words = line.spanish.split(' ');
                const isActive = currentLine === i && isPlaying;
                return (
                  <div key={i} className={`rounded-xl px-4 py-3 transition-all ${isActive ? 'bg-primary/10 border border-primary/30' : 'bg-card shadow-card'}`}>
                    <p className="text-sm font-bold text-foreground">
                      {isActive ? words.map((w, wi) => {
                        const clean = w.replace(/[.,!?¡¿]/g, '');
                        const isVocab = line.vocabHighlight?.includes(clean);
                        return (
                          <span key={wi} className={`${wi === currentWord ? 'bg-primary/25 text-primary rounded px-0.5' : ''} ${isVocab ? 'underline decoration-secondary decoration-2' : ''} transition-all`}>
                            {w}{' '}
                          </span>
                        );
                      }) : words.map((w, wi) => {
                        const clean = w.replace(/[.,!?¡¿]/g, '');
                        const isVocab = line.vocabHighlight?.includes(clean);
                        return <span key={wi} className={isVocab ? 'text-primary font-extrabold' : ''}>{w}{' '}</span>;
                      })}
                    </p>
                    {showTranslation && <p className="text-xs text-muted-foreground mt-1">{line.vietnamese}</p>}
                    <button onClick={() => speak(line.spanish)} className="text-[10px] text-primary font-bold mt-1 flex items-center gap-1">
                      <Volume2 size={10} /> Nghe
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========== 3. PRONUNCIATION ========== */}
        {tab === 'pronunciation' && !inDetail && (
          <div className="space-y-3 animate-slide-up">
            <p className="text-xs text-muted-foreground mb-2">🔤 {PRONUNCIATION_DRILLS.length} bài · Luyện âm khó</p>
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

            {/* Mouth diagram tip */}
            <div className="rounded-2xl bg-secondary/10 p-4 mb-4">
              <p className="text-sm font-bold text-foreground mb-1">🪞 Cách đặt miệng</p>
              <p className="text-xs text-foreground">{drill.mouthTip}</p>
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
                  <button onClick={() => speak(w.spanish.split(' - ')[0] || w.spanish, 0.4)}
                    className="text-[10px] font-bold text-muted-foreground bg-muted px-2 py-1 rounded-lg">🐢</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========== 4. PODCASTS ========== */}
        {tab === 'podcasts' && !inDetail && (
          <div className="space-y-3 animate-slide-up">
            <p className="text-xs text-muted-foreground mb-2">🎙️ {PODCAST_EPISODES.length} tập · ~2 phút mỗi tập</p>
            {PODCAST_EPISODES.map((ep, i) => (
              <button key={ep.id} onClick={() => setSelectedPodcast(i)}
                className="w-full rounded-2xl bg-card shadow-card p-4 text-left card-hover">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{ep.emoji}</span>
                  <div className="flex-1">
                    <p className="font-heading font-bold text-foreground text-sm">{ep.title}</p>
                    <p className="text-xs text-muted-foreground">{ep.titleVi} · {ep.topic}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${DIFF_COLORS[ep.level]}`}>{ep.level}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {podcast && (
          <div className="animate-slide-up">
            <div className="rounded-2xl bg-card shadow-card p-5 mb-4 text-center">
              <span className="text-5xl">{podcast.emoji}</span>
              <p className="font-heading font-bold text-xl text-foreground mt-2">{podcast.title}</p>
              <p className="text-sm text-muted-foreground">{podcast.titleVi}</p>
            </div>

            <button onClick={() => isPlaying ? stopSpeech() : playDialogueLines(podcast.script)}
              className="w-full gradient-primary text-primary-foreground rounded-xl py-2.5 font-bold text-sm flex items-center justify-center gap-2 mb-4 shadow-card">
              {isPlaying ? <><Pause size={16} /> Dừng</> : <><Play size={16} /> Nghe podcast</>}
            </button>

            <div className="space-y-2 mb-4">
              {podcast.script.map((line, i) => {
                const words = line.spanish.split(' ');
                const isActive = currentLine === i && isPlaying;
                return (
                  <div key={i} className={`rounded-xl px-3 py-2 transition-all ${isActive ? 'bg-primary/10 border border-primary/30' : 'bg-muted/50'}`}>
                    <p className="text-sm font-bold text-foreground">
                      {isActive ? words.map((w, wi) => (
                        <span key={wi} className={`${wi === currentWord ? 'bg-primary/20 text-primary rounded px-0.5' : ''} transition-all`}>{w}{' '}</span>
                      )) : line.spanish}
                    </p>
                    <p className="text-xs text-muted-foreground">{line.vietnamese}</p>
                  </div>
                );
              })}
            </div>

            {/* Quiz */}
            <div className="rounded-2xl bg-card shadow-card p-4">
              <p className="font-heading font-bold text-foreground mb-3">❓ Kiểm tra hiểu ({podcast.questions.length} câu)</p>
              {podcast.questions.map((q, qi) => (
                <div key={qi} className="mb-4">
                  <p className="text-sm font-bold text-foreground mb-2">{qi + 1}. {q.question}</p>
                  <div className="space-y-1.5">
                    {q.options.map((opt, oi) => {
                      const selected = podcastAnswers[qi] === oi;
                      const isCorrect = showPodcastResults && oi === q.correct;
                      const isWrong = showPodcastResults && selected && oi !== q.correct;
                      return (
                        <button key={oi} onClick={() => !showPodcastResults && setPodcastAnswers(prev => ({ ...prev, [qi]: oi }))}
                          className={`w-full text-left rounded-xl px-3 py-2 text-sm font-medium transition-all ${isCorrect ? 'bg-success/15 text-success font-bold' : isWrong ? 'bg-destructive/15 text-destructive' : selected ? 'bg-primary/10 text-primary font-bold' : 'bg-muted/50 text-foreground hover:bg-accent'}`}>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
              {!showPodcastResults && Object.keys(podcastAnswers).length === podcast.questions.length && (
                <button onClick={() => setShowPodcastResults(true)}
                  className="w-full gradient-primary text-primary-foreground rounded-xl py-2.5 font-bold text-sm shadow-card">Kiểm tra</button>
              )}
              {showPodcastResults && (
                <div className="text-center text-sm font-bold text-success animate-bounce-in">
                  🎉 {podcast.questions.filter((q, i) => podcastAnswers[i] === q.correct).length}/{podcast.questions.length} đúng!
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========== 5. SHADOWING ========== */}
        {tab === 'shadowing' && !inDetail && (
          <div className="space-y-3 animate-slide-up">
            <p className="text-xs text-muted-foreground mb-2">🔁 Nghe → Dừng → Nói theo → So sánh</p>
            {SHADOW_EXERCISES.map((s, i) => (
              <button key={s.id} onClick={() => setSelectedShadow(i)}
                className="w-full rounded-2xl bg-card shadow-card p-4 text-left card-hover">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-heading font-bold text-foreground">{s.title}</p>
                    <p className="text-xs text-muted-foreground">{s.sentences.length} câu luyện tập</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${DIFF_COLORS[s.level]}`}>{s.level}</span>
                </div>
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
              <button onClick={() => speak(shadow.sentences[shadowStep].spanish, 0.5)}
                className="rounded-xl bg-muted text-foreground py-3 font-bold text-sm flex items-center justify-center gap-2">
                🐢 Chậm
              </button>
            </div>

            {/* Voice waveform comparison */}
            <div className="mb-4">
              <VoiceWaveformCompare
                key={shadowStep}
                referenceText={shadow.sentences[shadowStep].spanish}
                voiceLang={voiceType}
                speed={speed}
              />
            </div>

            <div className="flex gap-3">
              <button disabled={shadowStep === 0} onClick={() => setShadowStep(prev => prev - 1)}
                className="flex-1 rounded-xl bg-muted text-muted-foreground py-3 font-bold text-sm disabled:opacity-30">← Trước</button>
              <button disabled={shadowStep >= shadow.sentences.length - 1} onClick={() => setShadowStep(prev => prev + 1)}
                className="flex-1 rounded-xl gradient-primary text-primary-foreground py-3 font-bold text-sm shadow-card disabled:opacity-30">Tiếp →</button>
            </div>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
