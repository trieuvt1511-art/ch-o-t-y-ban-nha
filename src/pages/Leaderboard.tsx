import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Trophy, Swords, MapPin, Gift, Mic, BookOpen, CalendarDays, Plus, Copy, Check, Users, Volume2, Send, Crown } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { toast } from '@/hooks/use-toast';
import { DAILY_PHRASES, DUEL_QUESTIONS, CHEER_OPTIONS, MEMBER_COLORS, getWeeklyQuest, getTodayPhrase, getStoryStarter, STORY_SUGGESTIONS } from '@/lib/family-data';

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

interface FamilyMember {
  user_id: string;
  role: string;
  color: string;
  profile?: { name: string; emoji: string; streak: number; weekly_xp: number; words_learned: number; last_active_date: string };
}

export default function Leaderboard() {
  const { profile, user, updateDbProfile } = useApp();
  const navigate = useNavigate();
  const [section, setSection] = useState<Section>('war-room');
  const [familyId, setFamilyId] = useState<string | null>(null);
  const [familyCode, setFamilyCode] = useState('');
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [joinCode, setJoinCode] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  // Duel state
  const [duelTarget, setDuelTarget] = useState<FamilyMember | null>(null);
  const [duelStep, setDuelStep] = useState(0);
  const [duelScore, setDuelScore] = useState(0);
  const [duelQuestions, setDuelQuestions] = useState<typeof DUEL_QUESTIONS>([]);
  const [duelDone, setDuelDone] = useState(false);
  const [duelAnswer, setDuelAnswer] = useState<number | null>(null);

  // Cheer
  const [cheerTarget, setCheerTarget] = useState<FamilyMember | null>(null);

  // Voice
  const [voicePosts, setVoicePosts] = useState<any[]>([]);
  const [voiceText, setVoiceText] = useState('');

  // Story
  const [storySentences, setStorySentences] = useState<any[]>([]);
  const [newSentence, setNewSentence] = useState('');

  // Calendar
  const [phraseLog, setPhraseLog] = useState<string[]>([]);

  // Quest
  const [quest, setQuest] = useState(getWeeklyQuest());
  const [questProgress, setQuestProgress] = useState(0);

  const today = new Date().toISOString().split('T')[0];
  const todayPhrase = getTodayPhrase();

  // Load family data
  const loadFamily = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      // Check if user is in a family
      const { data: membership } = await supabase
        .from('family_members')
        .select('family_id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (membership) {
        setFamilyId(membership.family_id);

        // Load family info
        const { data: fam } = await supabase
          .from('family_groups')
          .select('*')
          .eq('id', membership.family_id)
          .single();
        if (fam) {
          setFamilyCode(fam.code);
          setFamilyName(fam.name);
          setQuestProgress(fam.quest_progress || 0);
        }

        // Load members with their profiles
        const { data: mems } = await supabase
          .from('family_members')
          .select('user_id, role, color')
          .eq('family_id', membership.family_id);

        if (mems) {
          const enriched: FamilyMember[] = [];
          for (const m of mems) {
            const { data: p } = await supabase
              .from('profiles')
              .select('name, emoji, streak, weekly_xp, words_learned, last_active_date')
              .eq('id', m.user_id)
              .single();
            enriched.push({ ...m, profile: p || undefined });
          }
          setMembers(enriched);
        }

        // Load voice posts
        const { data: vp } = await supabase
          .from('voice_posts')
          .select('*')
          .eq('family_id', membership.family_id)
          .order('created_at', { ascending: false })
          .limit(20);
        setVoicePosts(vp || []);

        // Load story sentences
        const currentWeek = new Date();
        currentWeek.setDate(currentWeek.getDate() - currentWeek.getDay());
        const weekStr = currentWeek.toISOString().split('T')[0];
        const { data: ss } = await supabase
          .from('story_sentences')
          .select('*')
          .eq('family_id', membership.family_id)
          .eq('week', weekStr)
          .order('order_num');
        setStorySentences(ss || []);
      }

      // Load phrase log
      const { data: pl } = await supabase
        .from('daily_phrase_log')
        .select('phrase_date')
        .eq('user_id', user.id)
        .order('phrase_date', { ascending: false })
        .limit(30);
      setPhraseLog((pl || []).map(p => p.phrase_date));

    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => { loadFamily(); }, [loadFamily]);

  // Realtime subscriptions
  useEffect(() => {
    if (!familyId) return;
    const channel = supabase.channel('family-' + familyId)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'cheers', filter: `family_id=eq.${familyId}` }, (payload) => {
        const d = payload.new as any;
        if (d.to_user_id === user?.id) {
          toast({ title: `${d.cheer_type} Bạn nhận được cổ vũ!`, description: 'Một thành viên gia đình đã gửi yêu thương!' });
        }
      })
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'voice_posts', filter: `family_id=eq.${familyId}` }, () => {
        loadFamily();
      })
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'story_sentences', filter: `family_id=eq.${familyId}` }, () => {
        loadFamily();
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [familyId, user, loadFamily]);

  // Sorted members by XP
  const sortedMembers = useMemo(() =>
    [...members].sort((a, b) => (b.profile?.weekly_xp || 0) - (a.profile?.weekly_xp || 0)),
    [members]
  );
  const topMember = sortedMembers[0];

  const getMemberName = (userId: string) => members.find(m => m.user_id === userId)?.profile?.name || '?';
  const getMemberEmoji = (userId: string) => members.find(m => m.user_id === userId)?.profile?.emoji || '😊';

  const storyData = getStoryStarter();

  if (!user) { navigate('/auth'); return null; }

  // Create family
  const createFamily = async () => {
    const name = familyName.trim() || 'Gia đình';
    const { data: g, error } = await supabase.from('family_groups').insert({ name }).select().single();
    if (error || !g) { toast({ title: 'Lỗi tạo nhóm', variant: 'destructive' }); return; }
    await supabase.from('family_members').insert({ family_id: g.id, user_id: user.id, role: 'admin', color: MEMBER_COLORS[0] });
    setFamilyId(g.id);
    setFamilyCode(g.code);
    loadFamily();
    toast({ title: '🎉 Đã tạo gia đình!' });
  };

  // Join family
  const joinFamily = async () => {
    const code = joinCode.trim();
    if (!code) return;
    const { data: g } = await supabase.from('family_groups').select('id').eq('code', code).single();
    if (!g) { toast({ title: 'Không tìm thấy mã', variant: 'destructive' }); return; }
    const existingCount = members.length;
    await supabase.from('family_members').insert({ family_id: g.id, user_id: user.id, color: MEMBER_COLORS[existingCount % MEMBER_COLORS.length] });
    loadFamily();
    toast({ title: '🎉 Đã tham gia gia đình!' });
  };

  const copyCode = () => {
    navigator.clipboard.writeText(familyCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Duel
  const startDuel = (member: FamilyMember) => {
    const shuffled = [...DUEL_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 10);
    setDuelQuestions(shuffled);
    setDuelTarget(member);
    setDuelStep(0);
    setDuelScore(0);
    setDuelDone(false);
    setDuelAnswer(null);
    setSection('duel');
  };

  const answerDuel = async (idx: number) => {
    if (duelAnswer !== null) return;
    setDuelAnswer(idx);
    const correct = duelQuestions[duelStep].correct === idx;
    if (correct) setDuelScore(prev => prev + 1);
    setTimeout(() => {
      if (duelStep >= duelQuestions.length - 1) {
        setDuelDone(true);
        // Save result
        if (familyId && duelTarget) {
          const opponentScore = Math.floor(Math.random() * 7) + 3; // simulate
          supabase.from('duel_results').insert({
            family_id: familyId,
            challenger_id: user.id,
            opponent_id: duelTarget.user_id,
            challenger_score: duelScore + (correct ? 1 : 0),
            opponent_score: opponentScore,
          });
          const finalScore = duelScore + (correct ? 1 : 0);
          if (finalScore > opponentScore) {
            updateDbProfile({ weekly_xp: (profile?.weekly_xp || 0) + 50 });
          }
        }
      } else {
        setDuelStep(prev => prev + 1);
        setDuelAnswer(null);
      }
    }, 800);
  };

  // Cheer
  const sendCheer = async (type: string) => {
    if (!familyId || !cheerTarget) return;
    await supabase.from('cheers').insert({
      family_id: familyId,
      from_user_id: user.id,
      to_user_id: cheerTarget.user_id,
      cheer_type: type,
    });
    toast({ title: `${type} Đã gửi cổ vũ cho ${cheerTarget.profile?.name}!` });
    setCheerTarget(null);
  };

  // Voice post
  const postVoice = async () => {
    if (!familyId || !voiceText.trim()) return;
    await supabase.from('voice_posts').insert({
      family_id: familyId,
      user_id: user.id,
      text: voiceText.trim(),
    });
    setVoiceText('');
    loadFamily();
  };

  // Story
  const addSentence = async () => {
    if (!familyId || !newSentence.trim()) return;
    const currentWeek = new Date();
    currentWeek.setDate(currentWeek.getDate() - currentWeek.getDay());
    const weekStr = currentWeek.toISOString().split('T')[0];
    await supabase.from('story_sentences').insert({
      family_id: familyId,
      user_id: user.id,
      sentence: newSentence.trim(),
      week: weekStr,
      order_num: storySentences.length,
    });
    setNewSentence('');
    loadFamily();
  };

  // Daily phrase check-in
  const checkInPhrase = async () => {
    if (phraseLog.includes(today)) return;
    await supabase.from('daily_phrase_log').insert({ user_id: user.id, phrase_date: today });
    await updateDbProfile({ weekly_xp: (profile?.weekly_xp || 0) + 15 });
    setPhraseLog(prev => [today, ...prev]);
    toast({ title: '✅ +15 XP! Tuyệt vời!' });
  };

  const speak = (text: string) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'es-ES';
    u.rate = 0.85;
    speechSynthesis.speak(u);
  };

  // ===== NO FAMILY YET =====
  if (!familyId && !loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center">
        <div className="w-full max-w-[430px] px-5 pt-6 pb-24 page-enter">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => navigate('/dashboard')} className="btn-icon bg-muted text-muted-foreground hover:text-foreground hover:bg-accent"><ArrowLeft size={20} /></button>
            <h1 className="text-xl font-heading font-bold text-foreground">👨‍👩‍👧 Gia đình</h1>
          </div>

          <div className="rounded-2xl bg-card shadow-elevated p-6 text-center mb-5 animate-bounce-in">
            <span className="text-6xl block mb-3">👨‍👩‍👧‍👦</span>
            <h2 className="font-heading text-xl font-bold text-foreground mb-2">Học cùng gia đình!</h2>
            <p className="text-sm text-muted-foreground mb-6">Tạo nhóm gia đình hoặc tham gia bằng mã mời</p>

            <div className="space-y-3">
              <input value={familyName} onChange={e => setFamilyName(e.target.value)} placeholder="Tên gia đình (vd: Nhà Nguyễn)"
                className="w-full rounded-xl bg-muted px-4 py-3 text-sm font-medium text-foreground placeholder:text-muted-foreground" />
              <button onClick={createFamily} className="w-full btn-primary">
                <Plus size={18} /> Tạo gia đình mới
              </button>
            </div>

            <div className="flex items-center gap-3 my-5">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs font-bold text-muted-foreground">HOẶC</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="space-y-3">
              <input value={joinCode} onChange={e => setJoinCode(e.target.value)} placeholder="Nhập mã mời (6 ký tự)"
                className="w-full rounded-xl bg-muted px-4 py-3 text-sm font-medium text-foreground placeholder:text-muted-foreground text-center tracking-widest uppercase" maxLength={6} />
              <button onClick={joinFamily} disabled={joinCode.length < 4} className="w-full btn-secondary disabled:opacity-30">
                <Users size={18} /> Tham gia gia đình
              </button>
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
            <div>
              <h1 className="text-lg font-heading font-bold text-foreground">{familyName || 'Gia đình'}</h1>
              <button onClick={copyCode} className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground hover:text-primary">
                Mã: {familyCode} {copied ? <Check size={10} /> : <Copy size={10} />}
              </button>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-muted-foreground">{members.length} thành viên</p>
          </div>
        </div>

        {/* Section tabs */}
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
            {/* Member grid */}
            <div className="grid grid-cols-2 gap-3">
              {sortedMembers.map((m, i) => {
                const studied = m.profile?.last_active_date === today;
                const isTop = topMember?.user_id === m.user_id && (m.profile?.weekly_xp || 0) > 0;
                const isMe = m.user_id === user.id;
                return (
                  <div key={m.user_id} className={`rounded-2xl bg-card shadow-card p-4 relative card-hover ${isMe ? 'ring-2 ring-primary/30' : ''}`}>
                    {isTop && <span className="absolute -top-2 -right-2 text-xl animate-float">🏆</span>}
                    {!studied && <span className="absolute -top-1 -left-1 text-sm animate-pulse">📣</span>}
                    <div className="flex flex-col items-center">
                      <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-1.5 shadow-card"
                        style={{ background: m.color || MEMBER_COLORS[i % MEMBER_COLORS.length] }}>
                        {m.profile?.emoji || '😊'}
                      </div>
                      <p className="font-heading font-bold text-sm text-foreground truncate w-full text-center">{m.profile?.name || 'Thành viên'}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-bold text-primary">🔥{m.profile?.streak || 0}</span>
                        <span className="text-[10px] font-bold text-secondary">⭐{m.profile?.weekly_xp || 0}</span>
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
                {sortedMembers.map((m, i) => {
                  const maxXP = Math.max(...sortedMembers.map(s => s.profile?.weekly_xp || 1), 1);
                  const pct = ((m.profile?.weekly_xp || 0) / maxXP) * 100;
                  return (
                    <div key={m.user_id} className="flex items-center gap-2">
                      <span className="text-sm w-6 text-center">{m.profile?.emoji}</span>
                      <div className="flex-1 h-5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: m.color || MEMBER_COLORS[i % MEMBER_COLORS.length] }} />
                      </div>
                      <span className="text-xs font-bold text-foreground w-10 text-right">{m.profile?.weekly_xp || 0}</span>
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
                <button onClick={() => speak(todayPhrase.spanish)} className="btn-icon bg-muted text-primary w-10 h-10 min-h-0">
                  <Volume2 size={16} />
                </button>
                <button onClick={checkInPhrase} disabled={phraseLog.includes(today)}
                  className={`flex-1 rounded-xl py-2 text-sm font-bold transition-all ${phraseLog.includes(today) ? 'bg-success/15 text-success' : 'gradient-primary text-primary-foreground shadow-card'}`}>
                  {phraseLog.includes(today) ? '✅ Đã dùng!' : '✅ Tôi đã dùng! (+15 XP)'}
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
                <p className="text-sm font-bold text-foreground mb-2">⚔️ Chọn đối thủ để thách đấu!</p>
                {members.filter(m => m.user_id !== user.id).map(m => (
                  <button key={m.user_id} onClick={() => startDuel(m)} className="w-full rounded-2xl bg-card shadow-card p-4 text-left card-hover">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{m.profile?.emoji}</span>
                      <div className="flex-1">
                        <p className="font-heading font-bold text-foreground">{m.profile?.name}</p>
                        <p className="text-xs text-muted-foreground">🔥{m.profile?.streak} · ⭐{m.profile?.weekly_xp} XP</p>
                      </div>
                      <span className="text-primary font-bold text-sm">⚔️ Đấu</span>
                    </div>
                  </button>
                ))}
                {members.filter(m => m.user_id !== user.id).length === 0 && (
                  <div className="text-center py-10 text-muted-foreground">
                    <p className="text-4xl mb-3">👥</p>
                    <p className="text-sm">Mời thêm thành viên để thách đấu!</p>
                  </div>
                )}
              </div>
            ) : duelDone ? (
              <div className="text-center animate-bounce-in">
                <div className="rounded-2xl bg-card shadow-elevated p-8">
                  {duelScore >= 6 ? (
                    <>
                      <span className="text-7xl block mb-3">🏆</span>
                      <p className="font-heading text-2xl font-bold text-foreground">Chiến thắng!</p>
                      <p className="text-sm text-muted-foreground mt-1">+50 XP 🎉</p>
                    </>
                  ) : (
                    <>
                      <span className="text-7xl block mb-3">💪</span>
                      <p className="font-heading text-2xl font-bold text-foreground">Thử lại ngày mai!</p>
                      <p className="text-sm text-muted-foreground mt-1">Cố gắng lên nào!</p>
                    </>
                  )}
                  <p className="text-3xl font-heading font-bold text-primary mt-4">{duelScore}/10</p>
                  <button onClick={() => { setDuelTarget(null); setDuelDone(false); }}
                    className="btn-primary mt-6 w-full">Đấu tiếp ⚔️</button>
                </div>
              </div>
            ) : (
              <div>
                {/* Progress */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-muted-foreground">vs {duelTarget.profile?.name} {duelTarget.profile?.emoji}</span>
                  <span className="text-xs font-bold text-primary">{duelStep + 1}/10 · ✅ {duelScore}</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-5">
                  <div className="h-full gradient-primary rounded-full transition-all duration-300" style={{ width: `${((duelStep + 1) / 10) * 100}%` }} />
                </div>

                <div className="rounded-2xl bg-card shadow-elevated p-5 mb-4">
                  <p className="font-heading font-bold text-lg text-foreground text-center mb-1">{duelQuestions[duelStep].spanish}</p>
                  <button onClick={() => speak(duelQuestions[duelStep].spanish)} className="mx-auto flex items-center gap-1 text-[10px] text-primary font-bold">
                    <Volume2 size={10} /> Nghe
                  </button>
                </div>

                <div className="space-y-2">
                  {duelQuestions[duelStep].options.map((opt, i) => {
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
                    style={{ width: `${Math.min((questProgress / quest.target) * 100, 100)}%` }}>
                    {questProgress > quest.target * 0.2 && <span className="text-[9px] font-bold text-success-foreground">{questProgress}/{quest.target}</span>}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1.5">{questProgress}/{quest.target} hoàn thành</p>
              </div>

              {questProgress >= quest.target ? (
                <div className="mt-4 animate-bounce-in">
                  <span className="text-4xl">🎉</span>
                  <p className="font-heading font-bold text-success">Hoàn thành! Bonus unlocked!</p>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground mt-3">Mỗi hoạt động học của thành viên sẽ cộng vào tiến độ chung!</p>
              )}
            </div>

            <div className="rounded-2xl bg-card shadow-card p-4">
              <p className="font-heading font-bold text-sm text-foreground mb-3">🏅 Đóng góp</p>
              {sortedMembers.map(m => (
                <div key={m.user_id} className="flex items-center gap-2 py-1.5">
                  <span className="text-lg">{m.profile?.emoji}</span>
                  <span className="text-sm font-medium text-foreground flex-1">{m.profile?.name}</span>
                  <span className="text-xs font-bold text-primary">{m.profile?.words_learned || 0} từ</span>
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
                <span className="text-5xl block mb-2">{cheerTarget.profile?.emoji}</span>
                <p className="font-heading font-bold text-lg text-foreground">{cheerTarget.profile?.name}</p>
                <p className="text-sm text-muted-foreground mb-5">Gửi cổ vũ!</p>
                <div className="grid grid-cols-2 gap-3">
                  {CHEER_OPTIONS.map(c => (
                    <button key={c.emoji} onClick={() => sendCheer(c.emoji)}
                      className="rounded-2xl bg-muted p-4 card-hover text-center">
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
                {members.filter(m => m.user_id !== user.id).map(m => (
                  <button key={m.user_id} onClick={() => setCheerTarget(m)} className="w-full rounded-2xl bg-card shadow-card p-4 text-left card-hover">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{m.profile?.emoji}</span>
                      <div className="flex-1">
                        <p className="font-heading font-bold text-foreground">{m.profile?.name}</p>
                        <p className="text-xs text-muted-foreground">🔥{m.profile?.streak} · {m.profile?.words_learned} từ</p>
                      </div>
                      <span className="text-2xl">🎁</span>
                    </div>
                  </button>
                ))}
                {members.filter(m => m.user_id !== user.id).length === 0 && (
                  <div className="text-center py-10 text-muted-foreground">
                    <p className="text-4xl mb-3">👥</p>
                    <p className="text-sm">Mời thêm thành viên!</p>
                    <p className="text-xs mt-2">Mã mời: <span className="font-bold text-primary">{familyCode}</span></p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ========== VOICE BOARD ========== */}
        {section === 'voice' && (
          <div className="animate-fade-in space-y-3">
            <div className="rounded-2xl bg-card shadow-card p-4">
              <p className="text-xs font-bold text-muted-foreground uppercase mb-2">🎤 Nói câu tiếng TBN</p>
              <div className="flex gap-2">
                <input value={voiceText} onChange={e => setVoiceText(e.target.value)}
                  placeholder="Viết câu tiếng TBN..."
                  className="flex-1 rounded-xl bg-muted px-3 py-2.5 text-sm font-medium text-foreground placeholder:text-muted-foreground" />
                <button onClick={postVoice} disabled={!voiceText.trim()} className="btn-icon gradient-primary text-primary-foreground w-10 h-10 min-h-0 shadow-card disabled:opacity-30">
                  <Send size={16} />
                </button>
              </div>
            </div>

            {voicePosts.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">
                <span className="text-4xl block mb-2">🎤</span>
                <p className="text-sm">Chưa có bài đăng. Hãy là người đầu tiên!</p>
              </div>
            ) : (
              voicePosts.map(post => (
                <div key={post.id} className="rounded-2xl bg-card shadow-card p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{getMemberEmoji(post.user_id)}</span>
                    <span className="text-sm font-bold text-foreground">{getMemberName(post.user_id)}</span>
                    <span className="text-[10px] text-muted-foreground">{new Date(post.created_at).toLocaleDateString('vi')}</span>
                  </div>
                  <p className="text-sm font-medium text-foreground mb-2">{post.text}</p>
                  <div className="flex gap-2">
                    <button onClick={() => speak(post.text)} className="text-xs font-bold text-primary flex items-center gap-1 bg-primary/10 rounded-lg px-2 py-1">
                      <Volume2 size={12} /> Nghe
                    </button>
                    <button className="text-xs font-bold text-secondary flex items-center gap-1 bg-secondary/10 rounded-lg px-2 py-1">❤️</button>
                    <button className="text-xs font-bold text-muted-foreground flex items-center gap-1 bg-muted rounded-lg px-2 py-1">🔁 Tôi cũng nói được!</button>
                  </div>
                </div>
              ))
            )}
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
                {storySentences.map((s, i) => (
                  <div key={s.id} className="rounded-xl bg-muted/50 px-3 py-2">
                    <p className="text-sm font-medium text-foreground">{s.sentence}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-xs">{getMemberEmoji(s.user_id)}</span>
                      <span className="text-[10px] text-muted-foreground">{getMemberName(s.user_id)}</span>
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
                  <input value={newSentence} onChange={e => setNewSentence(e.target.value)}
                    placeholder="Thêm câu tiếp theo..."
                    className="flex-1 rounded-xl bg-muted px-3 py-2.5 text-sm font-medium text-foreground placeholder:text-muted-foreground" />
                  <button onClick={addSentence} disabled={!newSentence.trim()} className="btn-icon gradient-primary text-primary-foreground w-10 h-10 min-h-0 shadow-card disabled:opacity-30">
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========== CALENDAR ========== */}
        {section === 'calendar' && (
          <div className="animate-fade-in space-y-3">
            <div className="rounded-2xl bg-card shadow-card p-4 text-center">
              <p className="font-heading font-bold text-foreground mb-1">📅 Lịch sử câu hôm nay</p>
              <p className="text-xs text-muted-foreground mb-4">{phraseLog.length} ngày đã check-in</p>

              {/* Calendar grid - last 30 days */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {Array.from({ length: 30 }).map((_, i) => {
                  const d = new Date();
                  d.setDate(d.getDate() - (29 - i));
                  const dateStr = d.toISOString().split('T')[0];
                  const done = phraseLog.includes(dateStr);
                  const isToday = dateStr === today;
                  return (
                    <div key={i} className={`w-full aspect-square rounded-lg flex items-center justify-center text-[10px] font-bold transition-all ${done ? 'gradient-success text-success-foreground' : isToday ? 'ring-2 ring-primary bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                      {d.getDate()}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Phrase history */}
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
