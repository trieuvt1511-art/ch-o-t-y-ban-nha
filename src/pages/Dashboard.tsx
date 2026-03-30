import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Flame, BookOpen, Trophy, GraduationCap, LogOut } from 'lucide-react';
import BottomNav from '@/components/BottomNav';

export default function Dashboard() {
  const { activeProfile, logout } = useApp();
  const navigate = useNavigate();

  if (!activeProfile) {
    navigate('/');
    return null;
  }

  const progressPercent = Math.min(100, (activeProfile.wordsLearned / 50) * 100);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <div className="w-full max-w-[390px] px-4 pt-6 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-foreground">
              Xin chào, {activeProfile.name}! 🌟
            </h1>
            <p className="text-sm text-muted-foreground">Hôm nay bạn muốn học gì?</p>
          </div>
          <button onClick={() => { logout(); navigate('/'); }} className="text-muted-foreground hover:text-foreground transition-colors p-2">
            <LogOut size={20} />
          </button>
        </div>

        {/* Streak */}
        <div className="rounded-lg bg-card shadow-card p-4 flex items-center gap-4 mb-4 animate-slide-up">
          <div className="w-14 h-14 rounded-lg bg-secondary/20 flex items-center justify-center">
            <Flame size={28} className="text-secondary" />
          </div>
          <div className="flex-1">
            <p className="text-2xl font-extrabold text-foreground">{activeProfile.streak}</p>
            <p className="text-sm text-muted-foreground">ngày liên tiếp 🔥</p>
          </div>
        </div>

        {/* Progress Ring */}
        <div className="rounded-lg bg-card shadow-card p-5 mb-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-5">
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="34" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                <circle
                  cx="40" cy="40" r="34" fill="none" stroke="hsl(var(--primary))" strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 34}`}
                  strokeDashoffset={`${2 * Math.PI * 34 * (1 - progressPercent / 100)}`}
                  className="transition-all duration-700"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-foreground">
                {activeProfile.wordsLearned}
              </span>
            </div>
            <div>
              <p className="font-bold text-foreground">Từ vựng đã học</p>
              <p className="text-sm text-muted-foreground">Mục tiêu: 50 từ tuần này</p>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={() => navigate('/scenarios')}
          className="w-full rounded-lg bg-primary text-primary-foreground py-4 font-bold text-lg shadow-card hover:opacity-90 transition-opacity mb-6 animate-slide-up"
          style={{ animationDelay: '0.15s' }}
        >
          Tiếp tục học →
        </button>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          {[
            { icon: BookOpen, label: 'Từ đã học', value: activeProfile.wordsLearned },
            { icon: GraduationCap, label: 'Bài hoàn thành', value: activeProfile.scenariosCompleted },
            { icon: Trophy, label: 'XP tuần', value: activeProfile.weeklyXP },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-lg bg-card shadow-card p-3 text-center">
              <Icon size={20} className="mx-auto text-primary mb-1" />
              <p className="text-lg font-bold text-foreground">{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
