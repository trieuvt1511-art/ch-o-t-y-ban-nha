import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { getLevel, getUnlockedBadges, ACHIEVEMENTS } from '@/lib/xp-system';
import { Flame, BookOpen, Brain, Headphones, Swords, Users, Volume2, Check, LogOut, ArrowRight, Settings } from 'lucide-react';
import BottomNav from '@/components/BottomNav';

const DAILY_PHRASES = [
  { spanish: '¿Cómo te llamas?', vietnamese: 'Bạn tên gì?', phonetic: 'cô-mô tê gia-mát' },
  { spanish: '¡Mucho gusto!', vietnamese: 'Rất vui được gặp bạn!', phonetic: 'mu-chô gút-tô' },
  { spanish: '¿Dónde está el baño?', vietnamese: 'Nhà vệ sinh ở đâu?', phonetic: 'đôn-đê ét-ta el ba-nhô' },
  { spanish: '¡Qué bonito!', vietnamese: 'Đẹp quá!', phonetic: 'kê bô-ni-tô' },
  { spanish: 'Me gustaría un café, por favor.', vietnamese: 'Tôi muốn một ly cà phê, làm ơn.', phonetic: 'mê gút-ta-ri-a un ca-phê por pha-bor' },
  { spanish: '¿Cuánto cuesta esto?', vietnamese: 'Cái này giá bao nhiêu?', phonetic: 'coan-tô cue-ta ét-tô' },
  { spanish: 'No entiendo, ¿puede repetir?', vietnamese: 'Tôi không hiểu, bạn lặp lại được không?', phonetic: 'nô en-tien-đô pue-đê re-pe-tir' },
];

const SPANISH_DAYS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const SPANISH_MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

function getTodaySpanish() {
  const d = new Date();
  return `${SPANISH_DAYS[d.getDay()]}, ${d.getDate()} de ${SPANISH_MONTHS[d.getMonth()]}`;
}

export default function Dashboard() {
  const { activeProfile, updateProfile, addXP, setActiveProfileId } = useApp();
  const navigate = useNavigate();
  const [phraseUsed, setPhraseUsed] = useState(false);

  if (!activeProfile) { navigate('/'); return null; }

  const profile = activeProfile;
  const lvl = getLevel(profile.totalXP);
  const todayPhrase = DAILY_PHRASES[new Date().getDate() % DAILY_PHRASES.length];
  const activitiesToday = Math.min(5, Math.floor((profile.weeklyXP % 100) / 20));
  const goalPercent = (activitiesToday / 5) * 100;

  const stats = {
    scenariosCompleted: profile.scenariosCompleted,
    wordsLearned: profile.wordsLearned,
    streak: profile.streak,
    duelsWon: profile.duelsWon,
    familyAllActive: false,
    voiceNotes: profile.voiceNotes,
  };
  const badges = getUnlockedBadges(stats);

  const speak = (text: string) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'es-ES';
    u.rate = 0.85;
    speechSynthesis.speak(u);
  };

  const handlePhraseUsed = () => {
    if (phraseUsed) return;
    setPhraseUsed(true);
    addXP(15);
  };

  const handleLogout = () => {
    setActiveProfileId('');
    navigate('/');
  };

  const quickActions = [
    { icon: BookOpen, label: 'Tiếp tục học', path: '/scenarios', gradient: 'gradient-food', emoji: '📚' },
    { icon: Brain, label: 'Flashcard hôm nay', path: '/flashcards', gradient: 'gradient-travel', emoji: '🗂️' },
    { icon: Swords, label: 'Ghép câu', path: '/sentence-builder', gradient: 'gradient-home', emoji: '💬' },
    { icon: Headphones, label: 'Luyện nghe', path: '/listening', gradient: 'gradient-shopping', emoji: '🎧' },
    { icon: Users, label: 'Gia đình', path: '/leaderboard', gradient: 'gradient-social', emoji: '👨‍👩‍👧' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <div className="w-full max-w-[430px] px-5 pt-6 pb-24 page-enter">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-xl font-heading font-bold text-foreground">¡Hola, {profile.name}! 👋</h1>
            <p className="text-xs text-muted-foreground capitalize">{getTodaySpanish()}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold">{lvl.badge}</span>
            <button onClick={() => navigate('/settings')} className="btn-icon bg-muted text-muted-foreground w-10 h-10 min-h-0">
              <Settings size={16} />
            </button>
            <button onClick={handleLogout} className="btn-icon bg-muted text-muted-foreground w-10 h-10 min-h-0">
              <LogOut size={16} />
            </button>
          </div>
        </div>

        {/* Streak + XP */}
        <div className="flex gap-3 mb-5">
          <div className="flex-1 rounded-2xl bg-card shadow-card p-3 text-center">
            <p className="text-2xl font-heading font-bold text-primary">🔥 {profile.streak}</p>
            <p className="text-[10px] font-bold text-muted-foreground">Ngày streak</p>
          </div>
          <div className="flex-1 rounded-2xl bg-card shadow-card p-3 text-center">
            <p className="text-2xl font-heading font-bold text-secondary">⭐ {profile.totalXP}</p>
            <p className="text-[10px] font-bold text-muted-foreground">Tổng XP</p>
          </div>
          <div className="flex-1 rounded-2xl bg-card shadow-card p-3 text-center">
            <p className="text-2xl font-heading font-bold text-success">📚 {profile.wordsLearned}</p>
            <p className="text-[10px] font-bold text-muted-foreground">Từ đã học</p>
          </div>
        </div>

        {/* Daily goal ring */}
        <div className="rounded-2xl bg-card shadow-card p-5 mb-5 flex items-center gap-5">
          <div className="relative w-20 h-20 shrink-0">
            <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="34" fill="none" stroke="hsl(var(--muted))" strokeWidth="6" />
              <circle cx="40" cy="40" r="34" fill="none" stroke="hsl(var(--primary))" strokeWidth="6"
                strokeDasharray={`${goalPercent * 2.14} 214`} strokeLinecap="round" className="transition-all duration-700" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-heading font-bold text-foreground">{activitiesToday}/5</span>
            </div>
          </div>
          <div>
            <p className="font-heading font-bold text-foreground">Mục tiêu hôm nay</p>
            <p className="text-xs text-muted-foreground">Hoàn thành 5 hoạt động</p>
          </div>
        </div>

        {/* Daily phrase */}
        <div className="rounded-2xl bg-card shadow-card p-4 mb-5">
          <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">📅 Câu hôm nay</p>
          <p className="text-lg font-heading font-bold text-foreground">{todayPhrase.spanish}</p>
          <p className="text-sm text-muted-foreground mb-1">{todayPhrase.vietnamese}</p>
          <p className="text-[10px] text-muted-foreground mb-3">[{todayPhrase.phonetic}]</p>
          <div className="flex gap-2">
            <button onClick={() => speak(todayPhrase.spanish)} className="btn-icon bg-muted text-primary w-12 h-12">
              <Volume2 size={18} />
            </button>
            <button onClick={handlePhraseUsed} disabled={phraseUsed}
              className={`flex-1 rounded-full min-h-[48px] text-sm font-bold transition-all ${phraseUsed ? 'bg-success/15 text-success' : 'gradient-primary text-primary-foreground shadow-card'}`}>
              {phraseUsed ? '✅ Đã dùng!' : '✅ Tôi đã dùng câu này! (+15 XP)'}
            </button>
          </div>
        </div>

        {/* Quick actions */}
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 mb-5">
          {quickActions.map(a => (
            <button key={a.path} onClick={() => navigate(a.path)}
              className={`shrink-0 rounded-2xl ${a.gradient} p-4 w-32 text-left card-hover`}>
              <span className="text-2xl block mb-1">{a.emoji}</span>
              <p className="text-xs font-bold text-foreground">{a.label}</p>
            </button>
          ))}
        </div>

        {/* Badges */}
        <div className="rounded-2xl bg-card shadow-card p-4">
          <p className="font-heading font-bold text-foreground mb-3">🏆 Huy hiệu ({badges.length}/{ACHIEVEMENTS.length})</p>
          <div className="flex flex-wrap gap-2">
            {ACHIEVEMENTS.map(a => {
              const unlocked = badges.some(b => b.id === a.id);
              return (
                <span key={a.id} className={`rounded-full px-3 py-1.5 text-xs font-bold ${unlocked ? 'bg-primary/15 text-primary' : 'bg-muted text-muted-foreground/40'}`}>
                  {a.emoji} {a.name}
                </span>
              );
            })}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
