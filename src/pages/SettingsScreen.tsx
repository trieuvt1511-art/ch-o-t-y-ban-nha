import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Save, AlertTriangle } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { getLevel } from '@/lib/xp-system';
import { useToast } from '@/hooks/use-toast';
import BottomNav from '@/components/BottomNav';

const AVATARS = ['😊', '🦊', '🐯', '🌸', '🐠', '🎵', '⚡', '🌈', '🍀', '🦋', '🌺', '🐝'];

export default function SettingsScreen() {
  const navigate = useNavigate();
  const { activeProfile, updateProfile, deleteProfile, profiles } = useApp();
  const { toast } = useToast();

  const [name, setName] = useState(activeProfile?.name || '');
  const [emoji, setEmoji] = useState(activeProfile?.emoji || '😊');
  const [showDelete, setShowDelete] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState('');

  if (!activeProfile) return <Navigate to="/" replace />;

  const level = getLevel(activeProfile.totalXP);
  const hasChanges = name !== activeProfile.name || emoji !== activeProfile.emoji;

  const handleSave = () => {
    if (!name.trim()) {
      toast({ title: '⚠️ Tên không được để trống', variant: 'destructive' });
      return;
    }
    updateProfile({ name: name.trim(), emoji });
    toast({ title: '✅ Đã lưu thay đổi!' });
  };

  const handleDelete = () => {
    if (deleteConfirm !== activeProfile.name) {
      toast({ title: '⚠️ Nhập đúng tên để xác nhận', variant: 'destructive' });
      return;
    }
    deleteProfile(activeProfile.id);
    toast({ title: '🗑️ Đã xoá hồ sơ' });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <div className="w-full max-w-[430px] pb-24">
        {/* Header */}
        <div className="px-5 pt-6 pb-4 flex items-center gap-3">
          <button onClick={() => navigate('/dashboard')} className="w-10 h-10 rounded-full bg-card shadow-card flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-heading font-bold text-foreground">Cài đặt ⚙️</h1>
        </div>

        {/* Profile Card */}
        <div className="px-5 mb-4">
          <div className="bg-card rounded-2xl shadow-card p-5">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-3xl">
                {emoji}
              </div>
              <div>
                <p className="font-heading font-bold text-foreground text-lg">{activeProfile.name}</p>
                <p className="text-sm text-muted-foreground">{level.badge} {level.label} · {activeProfile.totalXP} XP</p>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Name */}
        <div className="px-5 mb-4">
          <div className="bg-card rounded-2xl shadow-card p-5">
            <label className="text-sm font-bold text-foreground mb-2 block">Tên hiển thị</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              maxLength={20}
              className="w-full rounded-xl border border-input bg-background px-4 min-h-[48px] text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        {/* Avatar Picker */}
        <div className="px-5 mb-4">
          <div className="bg-card rounded-2xl shadow-card p-5">
            <label className="text-sm font-bold text-foreground mb-3 block">Avatar</label>
            <div className="grid grid-cols-6 gap-2">
              {AVATARS.map(a => (
                <button
                  key={a}
                  onClick={() => setEmoji(a)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all ${
                    emoji === a ? 'bg-primary/20 ring-2 ring-primary scale-110' : 'bg-muted hover:bg-accent'
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Save Button */}
        {hasChanges && (
          <div className="px-5 mb-4 page-enter">
            <button
              onClick={handleSave}
              className="w-full min-h-[48px] rounded-full gradient-primary text-primary-foreground font-bold shadow-card flex items-center justify-center gap-2"
            >
              <Save size={18} /> Lưu thay đổi
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="px-5 mb-4">
          <div className="bg-card rounded-2xl shadow-card p-5">
            <h3 className="text-sm font-bold text-foreground mb-3">📊 Thống kê</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-muted rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-primary">{activeProfile.totalXP}</p>
                <p className="text-muted-foreground">Tổng XP</p>
              </div>
              <div className="bg-muted rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-destructive">🔥 {activeProfile.streak}</p>
                <p className="text-muted-foreground">Streak</p>
              </div>
              <div className="bg-muted rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-accent-foreground">{activeProfile.wordsLearned}</p>
                <p className="text-muted-foreground">Từ đã học</p>
              </div>
              <div className="bg-muted rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-accent-foreground">{activeProfile.scenariosCompleted}</p>
                <p className="text-muted-foreground">Bài hoàn thành</p>
              </div>
            </div>
          </div>
        </div>

        {/* Delete Section */}
        <div className="px-5 mb-4">
          <div className="bg-card rounded-2xl shadow-card p-5 border border-destructive/20">
            <h3 className="text-sm font-bold text-destructive mb-2 flex items-center gap-2">
              <AlertTriangle size={16} /> Vùng nguy hiểm
            </h3>
            {!showDelete ? (
              <button
                onClick={() => setShowDelete(true)}
                className="w-full min-h-[48px] rounded-full border-2 border-destructive text-destructive font-bold flex items-center justify-center gap-2 hover:bg-destructive/10 transition-colors"
              >
                <Trash2 size={16} /> Xoá hồ sơ này
              </button>
            ) : (
              <div className="space-y-3 page-enter">
                <p className="text-sm text-muted-foreground">
                  Nhập <span className="font-bold text-foreground">"{activeProfile.name}"</span> để xác nhận xoá. Hành động này không thể hoàn tác!
                </p>
                <input
                  value={deleteConfirm}
                  onChange={e => setDeleteConfirm(e.target.value)}
                  placeholder={`Nhập "${activeProfile.name}"`}
                  className="w-full rounded-xl border border-destructive/50 bg-background px-4 min-h-[48px] text-sm focus:outline-none focus:ring-2 focus:ring-destructive"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => { setShowDelete(false); setDeleteConfirm(''); }}
                    className="flex-1 min-h-[48px] rounded-full bg-muted text-foreground font-bold"
                  >
                    Huỷ
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={deleteConfirm !== activeProfile.name}
                    className="flex-1 min-h-[48px] rounded-full bg-destructive text-destructive-foreground font-bold disabled:opacity-40"
                  >
                    Xoá vĩnh viễn
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
