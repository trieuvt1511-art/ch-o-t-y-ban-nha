import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { EMOJI_OPTIONS, PROFILE_GRADIENTS } from '@/lib/data';
import { Level } from '@/lib/types';
import { Plus, Sparkles } from 'lucide-react';

const LEVELS: { value: Level; label: string }[] = [
  { value: 'Beginner', label: 'Người mới' },
  { value: 'Elementary', label: 'Sơ cấp' },
  { value: 'Intermediate', label: 'Trung cấp' },
];

export default function HomeScreen() {
  const { profiles, addProfile, selectProfile } = useApp();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('😊');
  const [level, setLevel] = useState<Level>('Beginner');

  const handleSelect = (id: string) => {
    selectProfile(id);
    navigate('/dashboard');
  };

  const handleAdd = () => {
    if (!name.trim()) return;
    addProfile(name.trim(), emoji, level);
    setName('');
    setEmoji('😊');
    setLevel('Beginner');
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-[390px]">
        {/* Header */}
        <div className="text-center mb-8 animate-slide-up">
          <div className="text-5xl mb-3">🇪🇸</div>
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight">HolaMind</h1>
          <p className="text-muted-foreground mt-1 text-sm">Học tiếng Tây Ban Nha cùng gia đình</p>
        </div>

        {/* Profile Cards */}
        <div className="space-y-3 mb-6">
          {profiles.map((profile, i) => (
            <button
              key={profile.id}
              onClick={() => handleSelect(profile.id)}
              className="w-full rounded-lg p-4 flex items-center gap-4 shadow-card transition-all hover:scale-[1.02] active:scale-[0.98] animate-scale-in"
              style={{ background: PROFILE_GRADIENTS[i % PROFILE_GRADIENTS.length], animationDelay: `${i * 0.08}s` }}
            >
              <span className="text-4xl">{profile.emoji}</span>
              <div className="text-left flex-1 min-w-0">
                <p className="font-bold text-lg text-primary-foreground truncate">{profile.name}</p>
                <p className="text-sm text-primary-foreground/80">
                  {LEVELS.find(l => l.value === profile.level)?.label} · 🔥 {profile.streak} ngày
                </p>
              </div>
              <div className="flex items-center gap-1 text-primary-foreground/90">
                <Sparkles size={16} />
                <span className="text-sm font-semibold">{profile.weeklyXP} XP</span>
              </div>
            </button>
          ))}
        </div>

        {/* Add Profile */}
        {profiles.length < 5 && !showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="w-full rounded-lg border-2 border-dashed border-border p-4 flex items-center justify-center gap-2 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
          >
            <Plus size={20} />
            <span className="font-medium">Thêm thành viên</span>
          </button>
        )}

        {/* Add Profile Form */}
        {showForm && (
          <div className="rounded-lg bg-card shadow-elevated p-5 space-y-4 animate-slide-up">
            <h2 className="font-bold text-lg text-foreground">Thêm thành viên mới</h2>

            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1 block">Tên</label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Nhập tên..."
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                maxLength={20}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Chọn avatar</label>
              <div className="flex flex-wrap gap-2">
                {EMOJI_OPTIONS.map(e => (
                  <button
                    key={e}
                    onClick={() => setEmoji(e)}
                    className={`text-2xl w-10 h-10 rounded-md flex items-center justify-center transition-all ${emoji === e ? 'bg-primary/10 ring-2 ring-primary scale-110' : 'hover:bg-accent'}`}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Trình độ</label>
              <div className="flex gap-2">
                {LEVELS.map(l => (
                  <button
                    key={l.value}
                    onClick={() => setLevel(l.value)}
                    className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${level === l.value ? 'bg-primary text-primary-foreground shadow-card' : 'bg-muted text-muted-foreground hover:bg-accent'}`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 rounded-md py-2.5 text-sm font-medium bg-muted text-muted-foreground hover:bg-accent transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleAdd}
                disabled={!name.trim()}
                className="flex-1 rounded-md py-2.5 text-sm font-bold bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-40"
              >
                Thêm
              </button>
            </div>
          </div>
        )}

        {profiles.length === 0 && !showForm && (
          <p className="text-center text-muted-foreground text-sm mt-6">
            Tạo hồ sơ đầu tiên để bắt đầu học! 🎉
          </p>
        )}
      </div>
    </div>
  );
}
