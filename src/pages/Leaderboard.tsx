import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, Flame, Star, MessageCircle, Swords } from 'lucide-react';
import { PROFILE_GRADIENTS } from '@/lib/data';
import BottomNav from '@/components/BottomNav';

const BADGES = [
  { icon: Flame, label: 'Streak', condition: (p: any) => p.streak >= 3 },
  { icon: Star, label: 'Words Master', condition: (p: any) => p.wordsLearned >= 10 },
  { icon: MessageCircle, label: 'Conversation Pro', condition: (p: any) => p.scenariosCompleted >= 2 },
];

export default function Leaderboard() {
  const { profiles } = useApp();
  const navigate = useNavigate();

  const sorted = [...profiles].sort((a, b) => b.weeklyXP - a.weeklyXP);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <div className="w-full max-w-[390px] px-4 pt-6 pb-24">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate('/dashboard')} className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-xl font-bold text-foreground">Bảng xếp hạng gia đình</h1>
        </div>

        {sorted.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <p>Chưa có thành viên nào.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sorted.map((profile, i) => (
              <div
                key={profile.id}
                className="rounded-lg bg-card shadow-card p-4 flex items-center gap-4 animate-scale-in"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl shrink-0"
                  style={{ background: PROFILE_GRADIENTS[i % PROFILE_GRADIENTS.length] }}
                >
                  {profile.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground">{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}</span>
                    <span className="font-semibold text-foreground truncate">{profile.name}</span>
                  </div>
                  <div className="flex gap-1 mt-1">
                    {BADGES.filter(b => b.condition(profile)).map(b => (
                      <span key={b.label} className="text-xs bg-secondary/15 text-secondary px-1.5 py-0.5 rounded-md font-medium">
                        {b.label}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-foreground">{profile.weeklyXP}</p>
                  <p className="text-xs text-muted-foreground">XP</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Challenge Button */}
        {sorted.length >= 2 && (
          <button className="w-full mt-6 rounded-lg border-2 border-primary bg-primary/5 text-primary py-3 font-bold flex items-center justify-center gap-2 hover:bg-primary/10 transition-colors">
            <Swords size={18} />
            Thách đấu
          </button>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
