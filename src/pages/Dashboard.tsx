import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Flame, BookOpen, Brain, Headphones, Swords, Users, Volume2, Check, LogOut, ArrowRight } from 'lucide-react';
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
  const { profile, logout, user, updateDbProfile } = useApp();
  const navigate = useNavigate();
  const [phraseUsed, setPhraseUsed] = useState(false);

  if (!user || !profile) {
    navigate('/auth');
    return null;
  }

  const todayPhrase = DAILY_PHRASES[new Date().getDate() % DAILY_PHRASES.length];
  const activitiesToday = Math.min(5, Math.floor((profile.weekly_xp % 100) / 20));
  const goalPercent = (activitiesToday / 5) * 100;

  const speak = (text: string) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'es-ES';
    u.rate = 0.85;
    speechSynthesis.speak(u);
  };

  const handlePhraseUsed = async () => {
    if (phraseUsed) return;
    setPhraseUsed(true);
    await updateDbProfile({ weekly_xp: (profile.weekly_xp ?? 0) + 15 });
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
        <div className="flex items-center justify-between mb-1">
          <div>
            <h1 className="text-2xl font-heading font-bold text-foreground">
              ¡Hola, {profile.name}! 👋
            </h1>
            <p className="text-sm text-muted-foreground font-medium capitalize">{getTodaySpanish()}</p>
          </div>
          <button onClick={async () => { await logout(); navigate('/auth'); }}
            className="btn-icon bg-muted text-muted-foreground hover:text-foreground hover:bg-accent">
            <LogOut size={20} />
          </button>
        </div>

        {/* Streak + XP row */}
        <div className="flex gap-3 my-4">
          <div className="flex-1 rounded-2xl bg-card shadow-card p-3.5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full gradient-secondary flex items-center justify-center shadow-card">
              <Flame size={22} className="text-secondary-foreground" />
            </div>
            <div>
              <p className="text-2xl font-heading font-bold text-foreground leading-none">{profile.streak}</p>
              <p className="text-[10px] text-muted-foreground font-bold mt-0.5">ngày streak 🔥</p>
            </div>
          </div>
          <div className="flex-1 rounded-2xl bg-card shadow-card p-3.5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center shadow-card">
              <span className="text-primary-foreground font-heading font-bold text-sm">XP</span>
            </div>
            <div>
              <p className="text-2xl font-heading font-bold text-foreground leading-none">{profile.weekly_xp}</p>
              <p className="text-[10px] text-muted-foreground font-bold mt-0.5">điểm tuần này ⚡</p>
            </div>
          </div>
        </div>

        {/* Daily goal ring */}
        <div className="rounded-2xl bg-card shadow-card p-5 mb-4">
          <div className="flex items-center gap-5">
            <div className="relative w-[76px] h-[76px] shrink-0">
              <svg className="w-[76px] h-[76px] -rotate-90" viewBox="0 0 76 76">
                <circle cx="38" cy="38" r="32" fill="none" stroke="hsl(var(--muted))" strokeWidth="7" />
                <circle cx="38" cy="38" r="32" fill="none" stroke="hsl(var(--success))" strokeWidth="7"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 32}`}
                  strokeDashoffset={`${2 * Math.PI * 32 * (1 - goalPercent / 100)}`}
                  className="transition-all duration-700"
                />
              </svg>
              <span className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-heading font-bold text-foreground leading-none">{activitiesToday}/5</span>
              </span>
            </div>
            <div className="flex-1">
              <p className="font-heading font-bold text-foreground text-base">Mục tiêu hôm nay</p>
              <p className="text-xs text-muted-foreground mt-0.5">Hoàn thành 5 hoạt động để giữ streak!</p>
              {activitiesToday >= 5 && (
                <span className="inline-block mt-1.5 bg-success/15 text-success rounded-full px-2.5 py-0.5 text-[10px] font-bold">🎉 Hoàn thành!</span>
              )}
            </div>
          </div>
        </div>

        {/* Câu hôm nay */}
        <div className="rounded-2xl bg-card shadow-elevated p-5 mb-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-secondary/10 -translate-y-8 translate-x-8" />
          <p className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-2">📖 Câu hôm nay</p>
          <p className="text-xl font-heading font-bold text-foreground mb-1">{todayPhrase.spanish}</p>
          <p className="text-sm text-muted-foreground mb-0.5">{todayPhrase.vietnamese}</p>
          <p className="text-xs text-muted-foreground/70 mb-4">[{todayPhrase.phonetic}]</p>

          <div className="flex gap-2">
            <button onClick={() => speak(todayPhrase.spanish)}
              className="btn-icon gradient-primary text-primary-foreground shadow-card">
              <Volume2 size={20} />
            </button>
            <button onClick={handlePhraseUsed} disabled={phraseUsed}
              className={`flex-1 rounded-full min-h-[48px] font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                phraseUsed
                  ? 'bg-success/15 text-success'
                  : 'bg-muted text-foreground hover:bg-accent active:scale-[0.97]'
              }`}>
              <Check size={16} />
              {phraseUsed ? 'Đã dùng! +15 XP' : 'Tôi đã dùng câu này!'}
            </button>
          </div>
        </div>

        {/* Quick actions horizontal scroll */}
        <h2 className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest mb-2.5 px-1">Bắt đầu học</h2>
        <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide mb-2">
          {quickActions.map(({ icon: Icon, label, path, gradient, emoji }) => (
            <button key={path} onClick={() => navigate(path)}
              className={`${gradient} rounded-2xl p-4 min-w-[130px] shrink-0 text-left card-hover shadow-card`}>
              <span className="text-2xl mb-2 block">{emoji}</span>
              <p className="font-heading font-bold text-foreground text-sm leading-tight">{label}</p>
              <div className="flex items-center gap-1 mt-2 text-primary">
                <ArrowRight size={14} />
              </div>
            </button>
          ))}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mt-2">
          {[
            { label: 'Từ đã học', value: profile.words_learned, color: 'text-primary' },
            { label: 'Bài xong', value: profile.scenarios_completed, color: 'text-secondary' },
            { label: 'Tổng XP', value: profile.weekly_xp, color: 'text-success' },
          ].map(({ label, value, color }) => (
            <div key={label} className="rounded-2xl bg-card shadow-card p-3 text-center">
              <p className={`text-xl font-heading font-bold ${color}`}>{value}</p>
              <p className="text-[10px] text-muted-foreground font-bold">{label}</p>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
