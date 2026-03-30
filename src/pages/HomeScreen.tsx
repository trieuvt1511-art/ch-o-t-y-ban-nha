import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { EMOJI_OPTIONS, PROFILE_GRADIENTS } from '@/lib/data';
import { Level } from '@/lib/types';
import { Plus, Sparkles, ChevronRight } from 'lucide-react';
import heroFamily from '@/assets/hero-family.png';

const LEVELS: { value: Level; label: string; desc: string }[] = [
  { value: 'Beginner', label: 'Người mới', desc: 'Chưa biết gì' },
  { value: 'Elementary', label: 'Sơ cấp', desc: 'Biết cơ bản' },
  { value: 'Intermediate', label: 'Trung cấp', desc: 'Giao tiếp được' },
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
    <div className="min-h-screen bg-background flex flex-col items-center px-4 py-6">
      <div className="w-full max-w-[430px]">
        {/* Hero Section */}
        <div className="relative rounded-3xl gradient-hero overflow-hidden mb-6 p-6 pb-2 animate-fade-in">
          <div className="text-center mb-2">
            <h1 className="text-4xl font-heading font-bold text-foreground tracking-tight">
              Hola<span className="text-primary">Mind</span> 🇪🇸
            </h1>
            <p className="text-muted-foreground mt-1 text-sm font-medium">
              Học tiếng Tây Ban Nha cùng gia đình
            </p>
          </div>
          <img
            src={heroFamily}
            alt="Gia đình học tiếng Tây Ban Nha"
            className="w-64 h-auto mx-auto animate-float"
            width={800}
            height={600}
          />
          {/* Decorative dots */}
          <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary/20" />
          <div className="absolute bottom-12 left-4 w-5 h-5 rounded-full bg-primary/15" />
        </div>

        {/* Profile Cards */}
        {profiles.length > 0 && (
          <div className="mb-4">
            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">
              Chọn người học
            </h2>
            <div className="space-y-3">
              {profiles.map((profile, i) => (
                <button
                  key={profile.id}
                  onClick={() => handleSelect(profile.id)}
                  className="w-full rounded-2xl p-4 flex items-center gap-4 shadow-card card-hover animate-scale-in"
                  style={{ background: PROFILE_GRADIENTS[i % PROFILE_GRADIENTS.length], animationDelay: `${i * 0.08}s` }}
                >
                  <span className="text-4xl drop-shadow-sm">{profile.emoji}</span>
                  <div className="text-left flex-1 min-w-0">
                    <p className="font-bold text-lg text-primary-foreground truncate">{profile.name}</p>
                    <p className="text-sm text-primary-foreground/80">
                      {LEVELS.find(l => l.value === profile.level)?.label} · 🔥 {profile.streak} ngày
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-primary-foreground/90 bg-white/20 rounded-lg px-2.5 py-1">
                      <Sparkles size={14} />
                      <span className="text-xs font-bold">{profile.weeklyXP} XP</span>
                    </div>
                    <ChevronRight size={18} className="text-primary-foreground/60" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Add Profile Button */}
        {profiles.length < 5 && !showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="w-full rounded-2xl border-2 border-dashed border-border p-4 flex items-center justify-center gap-2 text-muted-foreground hover:border-primary hover:text-primary transition-all hover:bg-primary/5"
          >
            <Plus size={20} />
            <span className="font-semibold">Thêm thành viên</span>
          </button>
        )}

        {/* Add Profile Form */}
        {showForm && (
          <div className="rounded-2xl bg-card shadow-elevated p-6 space-y-5 animate-slide-up">
            <h2 className="font-heading font-bold text-xl text-foreground">Thêm thành viên mới</h2>

            <div>
              <label className="text-sm font-semibold text-muted-foreground mb-1.5 block">Tên</label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Nhập tên..."
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                maxLength={20}
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-muted-foreground mb-2 block">Chọn avatar</label>
              <div className="flex flex-wrap gap-2">
                {EMOJI_OPTIONS.map(e => (
                  <button
                    key={e}
                    onClick={() => setEmoji(e)}
                    className={`text-2xl w-11 h-11 rounded-xl flex items-center justify-center transition-all ${emoji === e ? 'bg-primary/10 ring-2 ring-primary scale-110 shadow-card' : 'hover:bg-accent'}`}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-muted-foreground mb-2 block">Trình độ</label>
              <div className="flex gap-2">
                {LEVELS.map(l => (
                  <button
                    key={l.value}
                    onClick={() => setLevel(l.value)}
                    className={`flex-1 rounded-xl py-2.5 text-sm font-bold transition-all ${level === l.value ? 'gradient-primary text-primary-foreground shadow-card' : 'bg-muted text-muted-foreground hover:bg-accent'}`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-1">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 rounded-xl py-3 text-sm font-bold bg-muted text-muted-foreground hover:bg-accent transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleAdd}
                disabled={!name.trim()}
                className="flex-1 rounded-xl py-3 text-sm font-bold gradient-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-40 shadow-card"
              >
                Thêm ✨
              </button>
            </div>
          </div>
        )}

        {profiles.length === 0 && !showForm && (
          <p className="text-center text-muted-foreground text-sm mt-6 font-medium">
            Tạo hồ sơ đầu tiên để bắt đầu học! 🎉
          </p>
        )}
      </div>
    </div>
  );
}
