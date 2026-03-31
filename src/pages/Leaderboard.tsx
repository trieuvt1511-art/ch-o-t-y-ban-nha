import { useState, useMemo, useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useApp, LocalProfile } from '@/context/AppContext';
import { getLevel, XP } from '@/lib/xp-system';
import { ArrowLeft, Volume2, Send, Trophy, Copy, Check, Mic, MicOff, Square } from 'lucide-react';
import { speak as ttsSpeak } from '@/lib/speech';
import { isRecordingSupported, createRecorder, RecordingResult } from '@/lib/speech';
import BottomNav from '@/components/BottomNav';
import { StorySuggestion } from '@/components/StorySuggestion';
import { toast } from '@/hooks/use-toast';
import { DAILY_PHRASES, DUEL_QUESTIONS, CHEER_OPTIONS, MEMBER_COLORS, getWeeklyQuest, getTodayPhrase, getStoryStarter } from '@/lib/family-data';

type Section = 'war-room' | 'duel' | 'quest' | 'cheer' | 'voice' | 'story' | 'calendar';

const SECTIONS: { key: Section; emoji: string; label: string }[] = [
  { key: 'war-room', emoji: '🏠', label: 'Phòng' },
  { key: 'duel', emoji: '⚔️', label: 'Đấu' },
  { key: 'quest', emoji: '🗺️', label: 'Quest' },
  { key: 'cheer', emoji: '🎁', label: 'Cổ vũ' },
  { key: 'voice', emoji: '🎤', label: 'Voice' },
  { key: 'story', emoji: '📖', label: 'Story' },
  { key: 'calendar', emoji: '📅', label: 'Ngày' },
];

export default function Leaderboard() {
  const { profiles, activeProfile, updateProfile, addXP, family, updateFamily } = useApp();
  const navigate = useNavigate();
  const [section, setSection] = useState<Section>('war-room');

  // Duel state
  const [duelTarget, setDuelTarget] = useState<LocalProfile | null>(null);
  const [duelStep, setDuelStep] = useState(0);
  const [duelScore, setDuelScore] = useState(0);
  const [duelQuestions, setDuelQuestions] = useState<typeof DUEL_QUESTIONS>([]);
  const [duelDone, setDuelDone] = useState(false);
  const [duelAnswer, setDuelAnswer] = useState<number | null>(null);
  const [duelOpponentScore, setDuelOpponentScore] = useState(0);

  // Cheer
  const [cheerTarget, setCheerTarget] = useState<LocalProfile | null>(null);

  // Voice
  const [voiceText, setVoiceText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingUrl, setRecordingUrl] = useState<string | null>(null);
  const recorderRef = useRef<{ start: () => Promise<void>; stop: () => void } | null>(null);

  // Story
  const [newSentence, setNewSentence] = useState('');

  const today = new Date().toISOString().split('T')[0];
  const todayPhrase = getTodayPhrase();
  const quest = getWeeklyQuest();
  const storyData = getStoryStarter();

  const otherProfiles = profiles.filter(p => p.id !== activeProfile?.id);
  const sortedProfiles = useMemo(() =>
    [...profiles].sort((a, b) => b.weeklyXP - a.weeklyXP), [profiles]);
  const topProfile = sortedProfiles[0];

  if (!activeProfile) { navigate('/'); return null; }

  const speak = (text: string) => ttsSpeak(text);

  // Duel
  const startDuel = (member: LocalProfile) => {
    const shuffled = [...DUEL_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 10);
    setDuelQuestions(shuffled);
    setDuelTarget(member);
    setDuelStep(0);
    setDuelScore(0);
    setDuelDone(false);
    setDuelAnswer(null);
    setDuelOpponentScore(Math.floor(Math.random() * 5) + 4);
    setSection('duel');
  };

  const answerDuel = (idx: number) => {
    if (duelAnswer !== null) return;
    setDuelAnswer(idx);
    const correct = duelQuestions[duelStep].correct === idx;
    if (correct) setDuelScore(prev => prev + 1);
    setTimeout(() => {
      if (duelStep >= duelQuestions.length - 1) {
        setDuelDone(true);
        const finalScore = duelScore + (correct ? 1 : 0);
        if (finalScore > duelOpponentScore) {
          addXP(XP.DUEL_WIN);
          updateProfile({ duelsWon: activeProfile.duelsWon + 1 });
        }
        updateFamily({
          duelResults: [...family.duelResults, {
            challengerId: activeProfile.id,
            opponentId: duelTarget!.id,
            challengerScore: finalScore,
            opponentScore: duelOpponentScore,
            date: today,
          }],
        });
      } else {
        setDuelStep(prev => prev + 1);
        setDuelAnswer(null);
      }
    }, 800);
  };

  // Cheer
  const sendCheer = (type: string) => {
    if (!cheerTarget) return;
    updateFamily({
      cheers: [...family.cheers, { from: activeProfile.id, to: cheerTarget.id, type, date: today }],
    });
    toast({ title: `${type} Đã gửi cổ vũ cho ${cheerTarget.name}!` });
    setCheerTarget(null);
  };

  // Voice
  const postVoice = () => {
    if (!voiceText.trim()) return;
    updateFamily({
      voicePosts: [{ id: crypto.randomUUID(), userId: activeProfile.id, text: voiceText.trim(), date: today }, ...family.voicePosts].slice(0, 20),
    });
    updateProfile({ voiceNotes: activeProfile.voiceNotes + 1 });
    setVoiceText('');
    setRecordingUrl(null);
  };

  const toggleRecording = () => {
    if (isRecording) {
      recorderRef.current?.stop();
      setIsRecording(false);
      return;
    }
    const recorder = createRecorder(
      (result: RecordingResult) => {
        setRecordingUrl(result.url);
        setIsRecording(false);
        toast({ title: `🎤 Đã ghi ${result.duration.toFixed(1)}s` });
      },
      (msg: string) => { toast({ title: msg, variant: 'destructive' }); setIsRecording(false); },
      15000,
    );
    recorderRef.current = recorder;
    recorder.start();
    setIsRecording(true);
  };

  // Story
  const addSentence = () => {
    if (!newSentence.trim()) return;
    const currentWeek = new Date();
    currentWeek.setDate(currentWeek.getDate() - currentWeek.getDay());
    const weekStr = currentWeek.toISOString().split('T')[0];
    updateFamily({
      storySentences: [...family.storySentences, { userId: activeProfile.id, sentence: newSentence.trim(), week: weekStr }],
    });
    setNewSentence('');
  };

  // Phrase check-in
  const checkInPhrase = () => {
    if (activeProfile.phraseLog.includes(today)) return;
    addXP(XP.FAMILY_PHRASE);
    updateProfile({ phraseLog: [today, ...activeProfile.phraseLog] });
    toast({ title: '✅ +15 XP! Tuyệt vời!' });
  };

  const getProfileName = (id: string) => profiles.find(p => p.id === id)?.name || '?';
  const getProfileEmoji = (id: string) => profiles.find(p => p.id === id)?.emoji || '😊';

  if (profiles.length < 2 && section === 'war-room') {
    // Show invite prompt
    return (
      <div className="min-h-screen bg-background flex flex-col items-center">
        <div className="w-full max-w-[430px] px-5 pt-6 pb-24 page-enter">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => navigate('/dashboard')} className="btn-icon bg-muted text-muted-foreground hover:text-foreground hover:bg-accent"><ArrowLeft size={20} /></button>
            <h1 className="text-xl font-heading font-bold text-foreground">👨‍👩‍👧 Gia đình</h1>
          </div>

          <div className="rounded-2xl bg-card shadow-elevated p-6 text-center animate-bounce-in">
            <span className="text-6xl block mb-3">👨‍👩‍👧‍👦</span>
            <h2 className="font-heading text-xl font-bold text-foreground mb-2">Chào {activeProfile.name}!</h2>
            <p className="text-sm text-muted-foreground mb-6">Thêm thành viên gia đình để mở khóa thách đấu, cổ vũ, và nhiều tính năng vui!</p>
            <button onClick={() => navigate('/')} className="w-full btn-primary">+ Thêm thành viên gia đình</button>
            <p className="text-xs text-muted-foreground mt-3">Tối đa 8 thành viên · Tất cả dữ liệu lưu trên thiết bị</p>
          </div>

          {/* Still show your stats */}
          <div className="rounded-2xl bg-card shadow-card p-4 mt-4">
            <p className="font-heading font-bold text-foreground mb-3">📊 Thành tích của bạn</p>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <p className="text-2xl font-heading font-bold text-primary">{activeProfile.wordsLearned}</p>
                <p className="text-[10px] text-muted-foreground font-bold">Từ</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-heading font-bold text-secondary">{activeProfile.streak}</p>
                <p className="text-[10px] text-muted-foreground font-bold">Streak</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-heading font-bold text-success">{activeProfile.totalXP}</p>
                <p className="text-[10px] text-muted-foreground font-bold">XP</p>
              </div>
            </div>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <div className="w-full max-w-[430px] px-5 pt-6 pb-24 page-enter">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/dashboard')} className="btn-icon bg-muted text-muted-foreground hover:text-foreground hover:bg-accent"><ArrowLeft size={20} /></button>
            <h1 className="text-lg font-heading font-bold text-foreground">{family.name}</h1>
          </div>
          <span className="text-xs font-bold text-muted-foreground">{profiles.length} thành viên</span>
        </div>

        {/* Tabs */}
        <div className="flex gap-1.5 overflow-x-auto pb-3 mb-4 scrollbar-hide">
          {SECTIONS.map(s => (
            <button key={s.key} onClick={() => setSection(s.key)}
              className={`shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all ${section === s.key ? 'gradient-primary text-primary-foreground shadow-card' : 'bg-muted text-muted-foreground'}`}>
              {s.emoji} {s.label}
            </button>
          ))}
        </div>

        {/* ========== WAR ROOM ========== */}
        {section === 'war-room' && (
          <div className="space-y-3 animate-fade-in">
            <div className="grid grid-cols-2 gap-3">
              {sortedProfiles.map((m, i) => {
                const studied = m.lastActiveDate === today;
                const isTop = topProfile?.id === m.id && m.weeklyXP > 0;
                const isMe = m.id === activeProfile.id;
                const lvl = getLevel(m.totalXP);
                return (
                  <div key={m.id} className={`rounded-2xl bg-card shadow-card p-4 relative card-hover ${isMe ? 'ring-2 ring-primary/30' : ''}`}>
                    {isTop && <span className="absolute -top-2 -right-2 text-xl animate-float">🏆</span>}
                    {!studied && <span className="absolute -top-1 -left-1 text-sm animate-pulse">📣</span>}
                    <div className="flex flex-col items-center">
                      <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-1.5 shadow-card"
                        style={{ background: MEMBER_COLORS[i % MEMBER_COLORS.length] }}>
                        {m.emoji}
                      </div>
                      <p className="font-heading font-bold text-sm text-foreground truncate w-full text-center">{m.name} {lvl.badge}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-bold text-primary">🔥{m.streak}</span>
                        <span className="text-[10px] font-bold text-secondary">⭐{m.weeklyXP}</span>
                      </div>
                      <span className={`text-[10px] font-bold mt-1 px-2 py-0.5 rounded-full ${studied ? 'bg-success/15 text-success' : 'bg-muted text-muted-foreground'}`}>
                        {studied ? '✅ học rồi' : '😴 chưa học'}
                      </span>
                    </div>
                    {!isMe && (
                      <div className="flex gap-1 mt-2">
                        <button onClick={() => startDuel(m)} className="flex-1 text-[9px] font-bold px-1 py-1 rounded-lg bg-primary/10 text-primary">⚔️</button>
                        <button onClick={() => { setCheerTarget(m); setSection('cheer'); }} className="flex-1 text-[9px] font-bold px-1 py-1 rounded-lg bg-secondary/10 text-secondary">🎁</button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Weekly XP chart */}
            <div className="rounded-2xl bg-card shadow-card p-4">
              <p className="font-heading font-bold text-foreground text-sm mb-3">📊 XP tuần này</p>
              <div className="space-y-2">
                {sortedProfiles.map((m, i) => {
                  const maxXP = Math.max(...sortedProfiles.map(s => s.weeklyXP || 1), 1);
                  const pct = (m.weeklyXP / maxXP) * 100;
                  return (
                    <div key={m.id} className="flex items-center gap-2">
                      <span className="text-sm w-6 text-center">{m.emoji}</span>
                      <div className="flex-1 h-5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: MEMBER_COLORS[i % MEMBER_COLORS.length] }} />
                      </div>
                      <span className="text-xs font-bold text-foreground w-10 text-right">{m.weeklyXP}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Daily phrase */}
            <div className="rounded-2xl bg-card shadow-card p-4">
              <p className="text-[10px] font-bold text-muted-foreground uppercase mb-2">📅 Câu hôm nay</p>
              <p className="text-lg font-heading font-bold text-foreground">{todayPhrase.spanish}</p>
              <p className="text-sm text-muted-foreground mb-3">{todayPhrase.vietnamese}</p>
              <div className="flex gap-2">
                <button onClick={() => speak(todayPhrase.spanish)} className="btn-icon bg-muted text-primary w-10 h-10 min-h-0"><Volume2 size={16} /></button>
                <button onClick={checkInPhrase} disabled={activeProfile.phraseLog.includes(today)}
                  className={`flex-1 rounded-xl py-2 text-sm font-bold transition-all ${activeProfile.phraseLog.includes(today) ? 'bg-success/15 text-success' : 'gradient-primary text-primary-foreground shadow-card'}`}>
                  {activeProfile.phraseLog.includes(today) ? '✅ Đã dùng!' : '✅ Tôi đã dùng! (+15 XP)'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========== DUEL ========== */}
        {section === 'duel' && (
          <div className="animate-fade-in">
            {!duelTarget ? (
              <div className="space-y-3">
                <p className="text-sm font-bold text-foreground mb-2">⚔️ Chọn đối thủ!</p>
                {otherProfiles.map(m => (
                  <button key={m.id} onClick={() => startDuel(m)} className="w-full rounded-2xl bg-card shadow-card p-4 text-left card-hover">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{m.emoji}</span>
                      <div className="flex-1">
                        <p className="font-heading font-bold text-foreground">{m.name} {getLevel(m.totalXP).badge}</p>
                        <p className="text-xs text-muted-foreground">🔥{m.streak} · ⭐{m.totalXP} XP</p>
                      </div>
                      <span className="text-primary font-bold text-sm">⚔️ Đấu</span>
                    </div>
                  </button>
                ))}
                {otherProfiles.length === 0 && (
                  <div className="text-center py-10 text-muted-foreground">
                    <p className="text-4xl mb-3">👥</p>
                    <p className="text-sm">Thêm thành viên để thách đấu!</p>
                  </div>
                )}
              </div>
            ) : duelDone ? (
              <div className="text-center animate-bounce-in">
                <div className="rounded-2xl bg-card shadow-elevated p-8">
                  {duelScore > duelOpponentScore ? (
                    <>
                      <span className="text-7xl block mb-3">🏆</span>
                      <p className="font-heading text-2xl font-bold text-foreground">Chiến thắng!</p>
                      <p className="text-sm text-muted-foreground mt-1">+{XP.DUEL_WIN} XP 🎉</p>
                    </>
                  ) : duelScore === duelOpponentScore ? (
                    <>
                      <span className="text-7xl block mb-3">🤝</span>
                      <p className="font-heading text-2xl font-bold text-foreground">Hòa!</p>
                    </>
                  ) : (
                    <>
                      <span className="text-7xl block mb-3">💪</span>
                      <p className="font-heading text-2xl font-bold text-foreground">Thử lại ngày mai!</p>
                      <p className="text-sm text-muted-foreground mt-1">Cố gắng lên nào!</p>
                    </>
                  )}
                  <div className="flex justify-center gap-6 mt-4">
                    <div>
                      <p className="text-3xl font-heading font-bold text-primary">{duelScore}</p>
                      <p className="text-xs text-muted-foreground">{activeProfile.name}</p>
                    </div>
                    <p className="text-2xl font-bold text-muted-foreground self-center">vs</p>
                    <div>
                      <p className="text-3xl font-heading font-bold text-secondary">{duelOpponentScore}</p>
                      <p className="text-xs text-muted-foreground">{duelTarget.name}</p>
                    </div>
                  </div>
                  <button onClick={() => { setDuelTarget(null); setDuelDone(false); }}
                    className="btn-primary mt-6 w-full">Đấu tiếp ⚔️</button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-muted-foreground">vs {duelTarget.name} {duelTarget.emoji}</span>
                  <span className="text-xs font-bold text-primary">{duelStep + 1}/10 · ✅ {duelScore}</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-5">
                  <div className="h-full gradient-primary rounded-full transition-all duration-300" style={{ width: `${((duelStep + 1) / 10) * 100}%` }} />
                </div>
                <div className="rounded-2xl bg-card shadow-elevated p-5 mb-4">
                  <p className="font-heading font-bold text-lg text-foreground text-center mb-1">{duelQuestions[duelStep]?.spanish}</p>
                  <button onClick={() => duelQuestions[duelStep] && speak(duelQuestions[duelStep].spanish)} className="mx-auto flex items-center gap-1 text-[10px] text-primary font-bold">
                    <Volume2 size={10} /> Nghe
                  </button>
                </div>
                <div className="space-y-2">
                  {duelQuestions[duelStep]?.options.map((opt, i) => {
                    const isCorrect = duelAnswer !== null && i === duelQuestions[duelStep].correct;
                    const isWrong = duelAnswer === i && i !== duelQuestions[duelStep].correct;
                    return (
                      <button key={i} onClick={() => answerDuel(i)}
                        className={`w-full rounded-xl px-4 py-3 text-left text-sm font-bold transition-all ${isCorrect ? 'bg-success/15 text-success scale-[1.02]' : isWrong ? 'bg-destructive/15 text-destructive animate-shake' : duelAnswer !== null ? 'bg-muted/50 text-muted-foreground' : 'bg-card shadow-card text-foreground card-hover'}`}>
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========== QUEST ========== */}
        {section === 'quest' && (
          <div className="animate-fade-in space-y-4">
            <div className="rounded-2xl bg-card shadow-elevated p-5 text-center">
              <span className="text-5xl block mb-2">🗺️</span>
              <p className="font-heading font-bold text-lg text-foreground">{quest.title}</p>
              <p className="text-xs text-muted-foreground mt-1">Nhiệm vụ tuần này · Cả nhà cùng làm!</p>
              <div className="mt-5 mb-2">
                <div className="h-4 bg-muted rounded-full overflow-hidden">
                  <div className="h-full gradient-success rounded-full transition-all duration-700 flex items-center justify-end pr-2"
                    style={{ width: `${Math.min((family.questProgress / quest.target) * 100, 100)}%` }}>
                    {family.questProgress > quest.target * 0.2 && <span className="text-[9px] font-bold text-success-foreground">{family.questProgress}/{quest.target}</span>}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1.5">{family.questProgress}/{quest.target}</p>
              </div>
              {family.questProgress >= quest.target && (
                <div className="mt-4 animate-bounce-in"><span className="text-4xl">🎉</span><p className="font-heading font-bold text-success">Hoàn thành!</p></div>
              )}
            </div>
            <div className="rounded-2xl bg-card shadow-card p-4">
              <p className="font-heading font-bold text-sm text-foreground mb-3">🏅 Đóng góp</p>
              {sortedProfiles.map(m => (
                <div key={m.id} className="flex items-center gap-2 py-1.5">
                  <span className="text-lg">{m.emoji}</span>
                  <span className="text-sm font-medium text-foreground flex-1">{m.name}</span>
                  <span className="text-xs font-bold text-primary">{m.wordsLearned} từ</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========== CHEER ========== */}
        {section === 'cheer' && (
          <div className="animate-fade-in">
            {cheerTarget ? (
              <div className="rounded-2xl bg-card shadow-elevated p-6 text-center animate-bounce-in">
                <span className="text-5xl block mb-2">{cheerTarget.emoji}</span>
                <p className="font-heading font-bold text-lg text-foreground">{cheerTarget.name}</p>
                <p className="text-sm text-muted-foreground mb-5">Gửi cổ vũ!</p>
                <div className="grid grid-cols-2 gap-3">
                  {CHEER_OPTIONS.map(c => (
                    <button key={c.emoji} onClick={() => sendCheer(c.emoji)} className="rounded-2xl bg-muted p-4 card-hover text-center">
                      <span className="text-3xl block mb-1">{c.emoji}</span>
                      <span className="text-xs font-bold text-foreground">{c.label}</span>
                    </button>
                  ))}
                </div>
                <button onClick={() => setCheerTarget(null)} className="mt-4 text-sm font-bold text-muted-foreground">← Quay lại</button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm font-bold text-foreground mb-2">🎁 Chọn người để cổ vũ!</p>
                {otherProfiles.map(m => (
                  <button key={m.id} onClick={() => setCheerTarget(m)} className="w-full rounded-2xl bg-card shadow-card p-4 text-left card-hover">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{m.emoji}</span>
                      <div className="flex-1">
                        <p className="font-heading font-bold text-foreground">{m.name}</p>
                        <p className="text-xs text-muted-foreground">🔥{m.streak} · {m.wordsLearned} từ</p>
                      </div>
                      <span className="text-2xl">🎁</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Recent cheers */}
            {family.cheers.length > 0 && !cheerTarget && (
              <div className="rounded-2xl bg-card shadow-card p-4 mt-4">
                <p className="font-heading font-bold text-sm text-foreground mb-2">💌 Lời cổ vũ gần đây</p>
                {family.cheers.slice(-5).reverse().map((c, i) => (
                  <p key={i} className="text-xs text-muted-foreground py-1">
                    {getProfileEmoji(c.from)} → {getProfileEmoji(c.to)} {c.type}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========== VOICE ========== */}
        {section === 'voice' && (
          <div className="animate-fade-in space-y-3">
            <div className="rounded-2xl bg-card shadow-card p-4">
              <p className="text-xs font-bold text-muted-foreground uppercase mb-2">🎤 Nói câu tiếng TBN</p>
              <div className="flex gap-2 mb-2">
                <input value={voiceText} onChange={e => setVoiceText(e.target.value)} placeholder="Viết câu tiếng TBN..."
                  className="flex-1 rounded-xl bg-muted px-3 py-2.5 text-sm font-medium text-foreground placeholder:text-muted-foreground" />
                <button onClick={postVoice} disabled={!voiceText.trim()} className="btn-icon gradient-primary text-primary-foreground w-10 h-10 min-h-0 shadow-card disabled:opacity-30">
                  <Send size={16} />
                </button>
              </div>
              {isRecordingSupported() && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleRecording}
                    className={`min-h-[40px] rounded-full px-4 flex items-center gap-2 text-sm font-bold transition-all ${
                      isRecording
                        ? 'bg-destructive text-destructive-foreground animate-pulse'
                        : 'bg-muted text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {isRecording ? <><Square size={14} /> Dừng</> : <><Mic size={14} /> Ghi âm (15s)</>}
                  </button>
                  {recordingUrl && (
                    <audio src={recordingUrl} controls className="h-8 flex-1" />
                  )}
                </div>
              )}
            </div>
            {family.voicePosts.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">
                <span className="text-4xl block mb-2">🎤</span>
                <p className="text-sm">Chưa có bài đăng. Hãy là người đầu tiên!</p>
              </div>
            ) : family.voicePosts.map(post => (
              <div key={post.id} className="rounded-2xl bg-card shadow-card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{getProfileEmoji(post.userId)}</span>
                  <span className="text-sm font-bold text-foreground">{getProfileName(post.userId)}</span>
                  <span className="text-[10px] text-muted-foreground">{post.date}</span>
                </div>
                <p className="text-sm font-medium text-foreground mb-2">{post.text}</p>
                <div className="flex gap-2">
                  <button onClick={() => speak(post.text)} className="text-xs font-bold text-primary flex items-center gap-1 bg-primary/10 rounded-lg px-2 py-1">
                    <Volume2 size={12} /> Nghe
                  </button>
                  <button className="text-xs font-bold text-secondary bg-secondary/10 rounded-lg px-2 py-1">❤️</button>
                  <button className="text-xs font-bold text-muted-foreground bg-muted rounded-lg px-2 py-1">🔁 Tôi cũng!</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========== STORY ========== */}
        {section === 'story' && (
          <div className="animate-fade-in space-y-4">
            <div className="rounded-2xl bg-card shadow-elevated p-5">
              <p className="font-heading font-bold text-foreground mb-1">📖 Câu chuyện tuần này</p>
              <p className="text-xs text-muted-foreground mb-4">Mỗi người thêm 1 câu tiếng TBN!</p>
              <div className="space-y-2 mb-4">
                <div className="rounded-xl bg-secondary/10 px-3 py-2">
                  <p className="text-sm font-bold text-foreground italic">{storyData.starter}</p>
                  <p className="text-[10px] text-muted-foreground">📖 Mở đầu</p>
                </div>
                {family.storySentences.map((s, i) => (
                  <div key={i} className="rounded-xl bg-muted/50 px-3 py-2">
                    <p className="text-sm font-medium text-foreground">{s.sentence}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-xs">{getProfileEmoji(s.userId)}</span>
                      <span className="text-[10px] text-muted-foreground">{getProfileName(s.userId)}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-muted-foreground uppercase">💡 Gợi ý:</p>
                <div className="flex flex-wrap gap-1.5">
                  {storyData.suggestions.map((s, i) => (
                    <button key={i} onClick={() => setNewSentence(s)} className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-1 rounded-lg">{s}</button>
                  ))}
                </div>
                <div className="flex gap-2 mt-2">
                  <input value={newSentence} onChange={e => setNewSentence(e.target.value)} placeholder="Thêm câu tiếp theo..."
                    className="flex-1 rounded-xl bg-muted px-3 py-2.5 text-sm font-medium text-foreground placeholder:text-muted-foreground" />
                  <button onClick={addSentence} disabled={!newSentence.trim()} className="btn-icon gradient-primary text-primary-foreground w-10 h-10 min-h-0 shadow-card disabled:opacity-30">
                    <Send size={16} />
                  </button>
                </div>
                {/* AI Story Suggestion */}
                <StorySuggestion 
                  currentStory={[storyData.starter, ...family.storySentences.map(s => s.sentence)].join(' ')} 
                  onSelect={(s) => setNewSentence(s)} 
                />
              </div>
            </div>
          </div>
        )}

        {/* ========== CALENDAR ========== */}
        {section === 'calendar' && (
          <div className="animate-fade-in space-y-3">
            <div className="rounded-2xl bg-card shadow-card p-4 text-center">
              <p className="font-heading font-bold text-foreground mb-1">📅 Lịch sử câu hôm nay</p>
              <p className="text-xs text-muted-foreground mb-4">{activeProfile.phraseLog.length} ngày đã check-in</p>
              <div className="grid grid-cols-7 gap-1 mb-4">
                {Array.from({ length: 30 }).map((_, i) => {
                  const d = new Date();
                  d.setDate(d.getDate() - (29 - i));
                  const dateStr = d.toISOString().split('T')[0];
                  const done = activeProfile.phraseLog.includes(dateStr);
                  const isToday = dateStr === today;
                  return (
                    <div key={i} className={`w-full aspect-square rounded-lg flex items-center justify-center text-[10px] font-bold transition-all ${done ? 'gradient-success text-success-foreground' : isToday ? 'ring-2 ring-primary bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                      {d.getDate()}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="rounded-2xl bg-card shadow-card p-4">
              <p className="font-heading font-bold text-foreground text-sm mb-3">📝 Các câu gần đây</p>
              {DAILY_PHRASES.slice(0, 7).map((p, i) => (
                <div key={i} className="py-2 border-b border-border last:border-0">
                  <div className="flex items-center gap-2">
                    <button onClick={() => speak(p.spanish)} className="text-primary shrink-0"><Volume2 size={14} /></button>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-foreground">{p.spanish}</p>
                      <p className="text-xs text-muted-foreground">{p.vietnamese}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );

}
