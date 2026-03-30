import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { EMOJI_OPTIONS, PROFILE_GRADIENTS } from '@/lib/data';
import { Sparkles, ChevronRight } from 'lucide-react';
import heroFamily from '@/assets/hero-family.png';

const LEVELS = [
  { value: 'Beginner' as const, label: 'Người mới' },
  { value: 'Elementary' as const, label: 'Sơ cấp' },
  { value: 'Intermediate' as const, label: 'Trung cấp' },
];

export default function HomeScreen() {
  const { profile, updateDbProfile, logout, user } = useApp();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(!profile?.name);
  const [name, setName] = useState(profile?.name || '');
  const [emoji, setEmoji] = useState(profile?.emoji || '😊');
  const [level, setLevel] = useState(profile?.level || 'Beginner');

  const handleSave = async () => {
    if (!name.trim()) return;
    await updateDbProfile({ name: name.trim(), emoji, level });
    setEditing(false);
    navigate('/dashboard');
  };

  if (!user) {
    navigate('/auth');
    return null;
  }

  if (profile?.name && !editing) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center px-5 py-6">
        <div className="w-full max-w-[430px] page-enter">
          <div className="relative rounded-3xl gradient-hero overflow-hidden mb-6 p-6 pb-2">
            <div className="text-center mb-2">
              <h1 className="text-4xl font-heading font-bold text-foreground tracking-tight">
                Hola<span className="text-primary">Mind</span> 🇪🇸
              </h1>
              <p className="text-muted-foreground mt-1 text-sm font-medium">Học tiếng Tây Ban Nha cùng gia đình</p>
            </div>
            <img src={heroFamily} alt="Gia đình học tiếng Tây Ban Nha" className="w-64 h-auto mx-auto animate-float" width={800} height={600} />
          </div>

          <button
            onClick={() => navigate('/dashboard')}
            className="w-full rounded-2xl p-4 flex items-center gap-4 shadow-card card-hover"
            style={{ background: PROFILE_GRADIENTS[0] }}
          >
            <span className="text-4xl drop-shadow-sm">{profile.emoji}</span>
            <div className="text-left flex-1 min-w-0">
              <p className="font-bold text-lg text-primary-foreground truncate">{profile.name}</p>
              <p className="text-sm text-primary-foreground/80">
                {LEVELS.find(l => l.value === profile.level)?.label} · 🔥 {profile.streak} ngày
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-primary-foreground/90 bg-white/20 rounded-full px-2.5 py-1">
                <Sparkles size={14} />
                <span className="text-xs font-bold">{profile.weekly_xp} XP</span>
              </div>
              <ChevronRight size={18} className="text-primary-foreground/60" />
            </div>
          </button>

          <button
            onClick={() => setEditing(true)}
            className="w-full mt-3 text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
          >
            Chỉnh sửa hồ sơ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-5 py-6">
      <div className="w-full max-w-[430px] page-enter">
        <div className="text-center mb-6">
          <img src={heroFamily} alt="HolaMind" className="w-36 h-auto mx-auto mb-2" width={800} height={600} />
          <h1 className="text-2xl font-heading font-bold text-foreground">Thiết lập hồ sơ</h1>
          <p className="text-sm text-muted-foreground">Để bắt đầu hành trình học tiếng Tây Ban Nha</p>
        </div>

        <div className="rounded-2xl bg-card shadow-elevated p-6 space-y-5">
          <div>
            <label className="text-sm font-bold text-muted-foreground mb-1.5 block">Tên</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Nhập tên..."
              className="w-full rounded-2xl border border-input bg-background px-4 min-h-[48px] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring"
              maxLength={20}
            />
          </div>

          <div>
            <label className="text-sm font-bold text-muted-foreground mb-2 block">Chọn avatar</label>
            <div className="flex flex-wrap gap-2">
              {EMOJI_OPTIONS.map(e => (
                <button
                  key={e}
                  onClick={() => setEmoji(e)}
                  className={`text-2xl w-12 h-12 rounded-full flex items-center justify-center transition-all ${emoji === e ? 'bg-primary/10 ring-2 ring-primary scale-110 shadow-card' : 'hover:bg-accent'}`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-muted-foreground mb-2 block">Trình độ</label>
            <div className="flex gap-2">
              {LEVELS.map(l => (
                <button
                  key={l.value}
                  onClick={() => setLevel(l.value)}
                  className={`flex-1 rounded-full min-h-[48px] text-sm font-bold transition-all ${level === l.value ? 'gradient-primary text-primary-foreground shadow-card' : 'bg-muted text-muted-foreground hover:bg-accent'}`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={!name.trim()}
            className="w-full btn-primary disabled:opacity-40"
          >
            Bắt đầu học ✨
          </button>
        </div>
      </div>
    </div>
  );
}
