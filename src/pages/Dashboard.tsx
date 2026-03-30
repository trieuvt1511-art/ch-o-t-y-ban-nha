import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Flame, BookOpen, Trophy, GraduationCap, LogOut, Brain, Headphones, MessageCircle } from 'lucide-react';
import BottomNav from '@/components/BottomNav';

export default function Dashboard() {
  const { profile, logout, user } = useApp();
  const navigate = useNavigate();

  if (!user || !profile) {
    navigate('/auth');
    return null;
  }

  const progressPercent = Math.min(100, (profile.words_learned / 50) * 100);

  const quickActions = [
    { icon: BookOpen, label: 'Bài học', desc: 'Tình huống thực tế', path: '/scenarios', gradient: 'gradient-food' },
    { icon: Brain, label: 'Flashcard', desc: '3000 từ vựng', path: '/flashcards', gradient: 'gradient-travel' },
    { icon: MessageCircle, label: 'Ghép câu', desc: 'Luyện cấu trúc', path: '/sentence-builder', gradient: 'gradient-home' },
    { icon: Headphones, label: 'Luyện nghe', desc: 'Phim & Video', path: '/listening', gradient: 'gradient-shopping' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <div className="w-full max-w-[430px] px-4 pt-6 pb-24">
        <div className="flex items-center justify-between mb-6 animate-fade-in">
          <div>
            <h1 className="text-2xl font-heading font-bold text-foreground">
              Xin chào, {profile.name}! 🌟
            </h1>
            <p className="text-sm text-muted-foreground font-medium">Hôm nay bạn muốn học gì?</p>
          </div>
          <button onClick={async () => { await logout(); navigate('/auth'); }} className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-xl hover:bg-muted">
            <LogOut size={20} />
          </button>
        </div>

        <div className="rounded-2xl bg-card shadow-card p-4 flex items-center gap-4 mb-4 animate-slide-up">
          <div className="w-14 h-14 rounded-2xl gradient-secondary flex items-center justify-center shadow-card">
            <Flame size={28} className="text-secondary-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-3xl font-heading font-bold text-foreground">{profile.streak}</p>
            <p className="text-sm text-muted-foreground font-medium">ngày liên tiếp 🔥</p>
          </div>
        </div>

        <div className="rounded-2xl bg-card shadow-card p-5 mb-5 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-5">
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="34" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                <circle cx="40" cy="40" r="34" fill="none" stroke="hsl(var(--primary))" strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 34}`}
                  strokeDashoffset={`${2 * Math.PI * 34 * (1 - progressPercent / 100)}`}
                  className="transition-all duration-700"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-lg font-heading font-bold text-foreground">
                {profile.words_learned}
              </span>
            </div>
            <div>
              <p className="font-heading font-bold text-foreground text-lg">Từ vựng đã học</p>
              <p className="text-sm text-muted-foreground">Mục tiêu: 50 từ tuần này</p>
            </div>
          </div>
        </div>

        <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">Bắt đầu học</h2>
        <div className="grid grid-cols-2 gap-3 mb-5 animate-slide-up" style={{ animationDelay: '0.15s' }}>
          {quickActions.map(({ icon: Icon, label, desc, path, gradient }) => (
            <button key={path} onClick={() => navigate(path)} className={`${gradient} rounded-2xl p-4 text-left card-hover shadow-card`}>
              <div className="w-10 h-10 rounded-xl bg-white/60 flex items-center justify-center mb-3">
                <Icon size={22} className="text-foreground" />
              </div>
              <p className="font-heading font-bold text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          {[
            { icon: BookOpen, label: 'Từ đã học', value: profile.words_learned },
            { icon: GraduationCap, label: 'Bài xong', value: profile.scenarios_completed },
            { icon: Trophy, label: 'XP tuần', value: profile.weekly_xp },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-2xl bg-card shadow-card p-3 text-center">
              <Icon size={20} className="mx-auto text-primary mb-1" />
              <p className="text-xl font-heading font-bold text-foreground">{value}</p>
              <p className="text-xs text-muted-foreground font-medium">{label}</p>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
