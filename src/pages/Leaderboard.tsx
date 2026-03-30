import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, Trophy } from 'lucide-react';
import BottomNav from '@/components/BottomNav';

export default function Leaderboard() {
  const { profile, user } = useApp();
  const navigate = useNavigate();

  if (!user) { navigate('/auth'); return null; }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <div className="w-full max-w-[430px] px-5 pt-6 pb-24 page-enter">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate('/dashboard')} className="btn-icon bg-muted text-muted-foreground hover:text-foreground hover:bg-accent">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-heading font-bold text-foreground">Gia đình</h1>
        </div>

        {profile ? (
          <div className="space-y-4">
            <div className="rounded-2xl bg-card shadow-card p-5 text-center">
              <span className="text-5xl">{profile.emoji}</span>
              <p className="font-heading font-bold text-xl text-foreground mt-2">{profile.name}</p>
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div>
                  <p className="text-2xl font-heading font-bold text-primary">{profile.words_learned}</p>
                  <p className="text-[10px] text-muted-foreground font-bold">Từ đã học</p>
                </div>
                <div>
                  <p className="text-2xl font-heading font-bold text-secondary">{profile.streak}</p>
                  <p className="text-[10px] text-muted-foreground font-bold">Ngày streak</p>
                </div>
                <div>
                  <p className="text-2xl font-heading font-bold text-success">{profile.weekly_xp}</p>
                  <p className="text-[10px] text-muted-foreground font-bold">XP tuần</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-card shadow-card p-4">
              <p className="font-heading font-bold text-foreground mb-3">🏆 Huy hiệu</p>
              <div className="flex flex-wrap gap-2">
                {profile.streak >= 3 && <span className="bg-secondary/15 text-secondary rounded-full px-3 py-1.5 text-xs font-bold">🔥 Streak 3+</span>}
                {profile.words_learned >= 10 && <span className="bg-primary/15 text-primary rounded-full px-3 py-1.5 text-xs font-bold">⭐ 10 từ</span>}
                {profile.scenarios_completed >= 2 && <span className="bg-success/15 text-success rounded-full px-3 py-1.5 text-xs font-bold">💬 2 bài</span>}
                {profile.streak < 3 && profile.words_learned < 10 && profile.scenarios_completed < 2 && (
                  <p className="text-sm text-muted-foreground">Học thêm để mở khóa huy hiệu! 🎯</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <Trophy size={48} className="mx-auto mb-3 opacity-30" />
            <p>Chưa có dữ liệu</p>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
