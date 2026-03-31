import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { EMOJI_OPTIONS } from '@/lib/data';
import { getLevel } from '@/lib/xp-system';
import { Sparkles, ChevronRight, Trash2 } from 'lucide-react';

const LEVEL_OPTIONS = [
  { value: 'Beginner', label: 'Người mới' },
  { value: 'Elementary', label: 'Sơ cấp' },
  { value: 'Intermediate', label: 'Trung cấp' },
];

export default function HomeScreen() {
  const { profiles, activeProfile, setActiveProfileId, createProfile, deleteProfile, updateProfile } = useApp();
  const navigate = useNavigate();
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('😊');
  const [level, setLevel] = useState('Beginner');

  // If no member found locally but also no profiles, redirect to onboarding
  const [hasFamilySetup, setHasFamilySetup] = useState(true);

  useEffect(() => {
    try {
      setHasFamilySetup(!!window.localStorage?.getItem('holamind_member_id'));
    } catch {
      setHasFamilySetup(false);
    }
  }, []);

  if (!hasFamilySetup && profiles.length === 0) {
    return <Navigate to="/onboarding" replace />;
  }

  const handleCreate = () => {
    if (!name.trim() || profiles.length >= 8) return;
    createProfile(name.trim(), emoji, level);
    setCreating(false);
    setName('');
    navigate('/dashboard');
  };

  const handleSelect = (id: string) => {
    setActiveProfileId(id);
    navigate('/dashboard');
  };

  // If active profile exists, show hero
  if (activeProfile && !creating) {
    const lvl = getLevel(activeProfile.totalXP);
    return (
      <div className="min-h-screen bg-background flex flex-col items-center px-5 py-6">
        <div className="w-full max-w-[430px] page-enter">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-heading font-bold text-foreground tracking-tight">
              Hola<span className="text-primary">BoBo</span> 🇪🇸
            </h1>
            <p className="text-muted-foreground mt-1 text-sm font-medium">Học tiếng Tây Ban Nha cùng gia đình Bo Bơ</p>
          </div>

          {/* Active profile card */}
          <button onClick={() => navigate('/dashboard')}
            className="w-full rounded-2xl p-4 flex items-center gap-4 shadow-card card-hover gradient-primary mb-4">
            <span className="text-4xl drop-shadow-sm">{activeProfile.emoji}</span>
            <div className="text-left flex-1 min-w-0">
              <p className="font-bold text-lg text-primary-foreground truncate">{activeProfile.name} {lvl.badge}</p>
              <p className="text-sm text-primary-foreground/80">
                {lvl.label} · 🔥 {activeProfile.streak} ngày
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-primary-foreground/90 bg-white/20 rounded-full px-2.5 py-1">
                <Sparkles size={14} />
                <span className="text-xs font-bold">{activeProfile.totalXP} XP</span>
              </div>
              <ChevronRight size={18} className="text-primary-foreground/60" />
            </div>
          </button>

          {/* Other profiles */}
          {profiles.length > 1 && (
            <div className="mb-4">
              <p className="text-xs font-bold text-muted-foreground uppercase mb-2">Chuyển thành viên</p>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {profiles.filter(p => p.id !== activeProfile.id).map(p => {
                  const pl = getLevel(p.totalXP);
                  return (
                    <button key={p.id} onClick={() => handleSelect(p.id)}
                      className="shrink-0 rounded-2xl bg-card shadow-card p-3 text-center card-hover min-w-[90px]">
                      <span className="text-2xl block">{p.emoji}</span>
                      <p className="text-xs font-bold text-foreground truncate mt-1">{p.name}</p>
                      <p className="text-[9px] text-muted-foreground">{pl.badge} 🔥{p.streak}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {profiles.length < 8 && (
            <button onClick={() => setCreating(true)} className="w-full btn-secondary text-sm">+ Thêm thành viên</button>
          )}
        </div>
      </div>
    );
  }

  // Create / select profile
  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-5 py-6">
      <div className="w-full max-w-[430px] page-enter">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-heading font-bold text-foreground">
            Hola<span className="text-primary">Mind</span> 🇪🇸
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Chọn hoặc tạo hồ sơ</p>
        </div>

        {/* Existing profiles */}
        {profiles.length > 0 && !creating && (
          <div className="space-y-2 mb-5">
            {profiles.map(p => {
              const pl = getLevel(p.totalXP);
              return (
                <div key={p.id} className="rounded-2xl bg-card shadow-card p-4 flex items-center gap-3 card-hover">
                  <button onClick={() => handleSelect(p.id)} className="flex-1 flex items-center gap-3 text-left">
                    <span className="text-3xl">{p.emoji}</span>
                    <div>
                      <p className="font-heading font-bold text-foreground">{p.name} {pl.badge}</p>
                      <p className="text-xs text-muted-foreground">🔥{p.streak} · ⭐{p.totalXP} XP · {p.wordsLearned} từ</p>
                    </div>
                  </button>
                  <button onClick={() => deleteProfile(p.id)} className="text-muted-foreground hover:text-destructive p-2">
                    <Trash2 size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Create form */}
        {(creating || profiles.length === 0) && (
          <div className="rounded-2xl bg-card shadow-elevated p-6 space-y-5 animate-bounce-in">
            <h2 className="font-heading font-bold text-lg text-foreground text-center">Tạo hồ sơ mới</h2>
            <div>
              <label className="text-sm font-bold text-muted-foreground mb-1.5 block">Tên</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Nhập tên..."
                className="w-full rounded-2xl border border-input bg-background px-4 min-h-[48px] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring" maxLength={20} />
            </div>
            <div>
              <label className="text-sm font-bold text-muted-foreground mb-2 block">Avatar</label>
              <div className="flex flex-wrap gap-2">
                {EMOJI_OPTIONS.map(e => (
                  <button key={e} onClick={() => setEmoji(e)}
                    className={`text-2xl w-12 h-12 rounded-full flex items-center justify-center transition-all ${emoji === e ? 'bg-primary/10 ring-2 ring-primary scale-110 shadow-card' : 'hover:bg-accent'}`}>{e}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-bold text-muted-foreground mb-2 block">Trình độ</label>
              <div className="flex gap-2">
                {LEVEL_OPTIONS.map(l => (
                  <button key={l.value} onClick={() => setLevel(l.value)}
                    className={`flex-1 rounded-full min-h-[48px] text-sm font-bold transition-all ${level === l.value ? 'gradient-primary text-primary-foreground shadow-card' : 'bg-muted text-muted-foreground hover:bg-accent'}`}>{l.label}</button>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              {profiles.length > 0 && (
                <button onClick={() => setCreating(false)} className="flex-1 btn-secondary">Hủy</button>
              )}
              <button onClick={handleCreate} disabled={!name.trim()} className="flex-1 btn-primary disabled:opacity-40">Bắt đầu học ✨</button>
            </div>
          </div>
        )}

        {profiles.length > 0 && !creating && profiles.length < 8 && (
          <button onClick={() => setCreating(true)} className="w-full btn-primary mt-4">+ Tạo hồ sơ mới</button>
        )}
      </div>
    </div>
  );
}
