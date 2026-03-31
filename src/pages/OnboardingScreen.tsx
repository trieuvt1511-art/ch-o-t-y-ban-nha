import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, Users, UserPlus, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const EMOJIS = ['😊', '🦊', '🐯', '🌸', '🐠', '🎵', '⚡', '🌈', '🍀', '🦋', '🌺', '🐝'];
const COLORS = ['#E84E3F', '#F5A623', '#4CAF50', '#2196F3', '#9C27B0', '#FF9800', '#00BCD4', '#E91E63'];

type Step = 'choice' | 'create-family' | 'join-family' | 'setup-member';

export default function OnboardingScreen() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { createProfile, setActiveProfileId } = useApp();

  const [step, setStep] = useState<Step>('choice');
  const [familyName, setFamilyName] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [familyId, setFamilyId] = useState<string | null>(null);
  const [memberName, setMemberName] = useState('');
  const [emoji, setEmoji] = useState('😊');
  const [color, setColor] = useState('#E84E3F');
  const [loading, setLoading] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);

  const handleCreateFamily = async () => {
    if (!familyName.trim()) {
      toast({ title: '⚠️ Nhập tên gia đình', variant: 'destructive' });
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('families')
        .insert({ name: familyName.trim() })
        .select()
        .single();

      if (error) throw error;
      setFamilyId(data.id);
      setInviteCode(data.invite_code);
      setStep('setup-member');
      toast({ title: '🎉 Đã tạo gia đình!' });
    } catch (e: any) {
      toast({ title: 'Lỗi: ' + e.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleJoinFamily = async () => {
    if (joinCode.trim().length !== 6) {
      toast({ title: '⚠️ Mã mời phải 6 ký tự', variant: 'destructive' });
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('families')
        .select('*')
        .eq('invite_code', joinCode.trim().toLowerCase())
        .single();

      if (error || !data) {
        toast({ title: '❌ Không tìm thấy gia đình. Kiểm tra lại mã!', variant: 'destructive' });
        setLoading(false);
        return;
      }
      setFamilyId(data.id);
      setFamilyName(data.name);
      setStep('setup-member');
      toast({ title: `🎉 Tìm thấy "${data.name}"!` });
    } catch (e: any) {
      toast({ title: 'Lỗi: ' + e.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveMember = async () => {
    if (!memberName.trim()) {
      toast({ title: '⚠️ Nhập tên của bạn', variant: 'destructive' });
      return;
    }
    if (!familyId) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('members')
        .insert({
          family_id: familyId,
          name: memberName.trim(),
          emoji,
          color,
        })
        .select()
        .single();

      if (error) throw error;

      // Store in localStorage for offline access
      localStorage.setItem('holamind_member_id', data.id);
      localStorage.setItem('holamind_family_id', familyId);

      // Also create local profile for offline use
      const profile = createProfile(memberName.trim(), emoji, 'Beginner');

      toast({ title: `¡Bienvenido, ${memberName}! 🎉` });
      navigate('/dashboard');
    } catch (e: any) {
      toast({ title: 'Lỗi: ' + e.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(inviteCode);
    setCodeCopied(true);
    toast({ title: '📋 Đã copy mã mời!' });
    setTimeout(() => setCodeCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-5">
      <div className="w-full max-w-[430px]">

        {/* ===== STEP: CHOICE ===== */}
        {step === 'choice' && (
          <div className="page-enter text-center">
            <div className="text-6xl mb-4">👨‍👩‍👧‍👦</div>
            <h1 className="text-2xl font-heading font-bold text-foreground mb-2">Chào mừng đến HolaBoBo!</h1>
            <p className="text-sm text-muted-foreground mb-8">Học tiếng Tây Ban Nha cùng gia đình</p>

            <div className="space-y-3">
              <button
                onClick={() => setStep('create-family')}
                className="w-full min-h-[64px] rounded-2xl bg-card shadow-card p-4 flex items-center gap-4 text-left card-hover"
              >
                <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
                  <Users size={24} className="text-primary-foreground" />
                </div>
                <div>
                  <p className="font-heading font-bold text-foreground">Tạo gia đình mới</p>
                  <p className="text-xs text-muted-foreground">Bắt đầu nhóm học & mời thành viên</p>
                </div>
              </button>

              <button
                onClick={() => setStep('join-family')}
                className="w-full min-h-[64px] rounded-2xl bg-card shadow-card p-4 flex items-center gap-4 text-left card-hover"
              >
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                  <UserPlus size={24} className="text-secondary-foreground" />
                </div>
                <div>
                  <p className="font-heading font-bold text-foreground">Tham gia gia đình</p>
                  <p className="text-xs text-muted-foreground">Nhập mã mời từ người thân</p>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* ===== STEP: CREATE FAMILY ===== */}
        {step === 'create-family' && (
          <div className="page-enter">
            <button onClick={() => setStep('choice')} className="w-10 h-10 rounded-full bg-card shadow-card flex items-center justify-center text-muted-foreground mb-6">
              <ArrowLeft size={20} />
            </button>
            <h2 className="text-xl font-heading font-bold text-foreground mb-1">Tạo gia đình mới 🏠</h2>
            <p className="text-sm text-muted-foreground mb-6">Đặt tên cho nhóm học của bạn</p>

            <label className="text-sm font-bold text-foreground mb-2 block">Tên gia đình</label>
            <input
              value={familyName}
              onChange={e => setFamilyName(e.target.value)}
              placeholder="VD: Nhà mình, Gia đình Nguyễn..."
              maxLength={30}
              className="w-full rounded-xl border border-input bg-background px-4 min-h-[48px] text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-ring"
            />

            <button
              onClick={handleCreateFamily}
              disabled={loading || !familyName.trim()}
              className="w-full min-h-[48px] rounded-full gradient-primary text-primary-foreground font-bold shadow-card disabled:opacity-40"
            >
              {loading ? 'Đang tạo...' : 'Tạo gia đình ✨'}
            </button>
          </div>
        )}

        {/* ===== STEP: JOIN FAMILY ===== */}
        {step === 'join-family' && (
          <div className="page-enter">
            <button onClick={() => setStep('choice')} className="w-10 h-10 rounded-full bg-card shadow-card flex items-center justify-center text-muted-foreground mb-6">
              <ArrowLeft size={20} />
            </button>
            <h2 className="text-xl font-heading font-bold text-foreground mb-1">Tham gia gia đình 🤝</h2>
            <p className="text-sm text-muted-foreground mb-6">Nhập mã mời 6 ký tự từ người thân</p>

            <label className="text-sm font-bold text-foreground mb-2 block">Mã mời</label>
            <input
              value={joinCode}
              onChange={e => setJoinCode(e.target.value.slice(0, 6))}
              placeholder="VD: a1b2c3"
              maxLength={6}
              className="w-full rounded-xl border border-input bg-background px-4 min-h-[48px] text-sm text-center tracking-[0.3em] font-mono text-lg mb-6 focus:outline-none focus:ring-2 focus:ring-ring uppercase"
            />

            <button
              onClick={handleJoinFamily}
              disabled={loading || joinCode.trim().length !== 6}
              className="w-full min-h-[48px] rounded-full gradient-primary text-primary-foreground font-bold shadow-card disabled:opacity-40"
            >
              {loading ? 'Đang tìm...' : 'Tham gia 🚀'}
            </button>
          </div>
        )}

        {/* ===== STEP: SETUP MEMBER ===== */}
        {step === 'setup-member' && (
          <div className="page-enter">
            <button onClick={() => setStep('choice')} className="w-10 h-10 rounded-full bg-card shadow-card flex items-center justify-center text-muted-foreground mb-6">
              <ArrowLeft size={20} />
            </button>

            {/* Show invite code if just created */}
            {inviteCode && (
              <div className="bg-card rounded-2xl shadow-card p-5 mb-6 text-center">
                <p className="text-xs font-bold text-muted-foreground uppercase mb-2">Mã mời gia đình</p>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-3xl font-mono font-bold tracking-[0.3em] text-primary">{inviteCode}</span>
                  <button onClick={copyCode} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    {codeCopied ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-muted-foreground" />}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">Gửi mã này cho người thân để cùng tham gia!</p>
              </div>
            )}

            <h2 className="text-xl font-heading font-bold text-foreground mb-1">
              {familyName ? `Gia đình "${familyName}" 🎉` : 'Thiết lập hồ sơ'}
            </h2>
            <p className="text-sm text-muted-foreground mb-5">Tạo hồ sơ của bạn</p>

            {/* Name */}
            <label className="text-sm font-bold text-foreground mb-2 block">Tên của bạn</label>
            <input
              value={memberName}
              onChange={e => setMemberName(e.target.value)}
              placeholder="VD: Minh, Mẹ, Bố..."
              maxLength={20}
              className="w-full rounded-xl border border-input bg-background px-4 min-h-[48px] text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-ring"
            />

            {/* Emoji */}
            <label className="text-sm font-bold text-foreground mb-2 block">Avatar</label>
            <div className="grid grid-cols-6 gap-2 mb-4">
              {EMOJIS.map(e => (
                <button
                  key={e}
                  onClick={() => setEmoji(e)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all ${
                    emoji === e ? 'ring-2 ring-primary scale-110 bg-primary/20' : 'bg-muted hover:bg-accent'
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>

            {/* Color */}
            <label className="text-sm font-bold text-foreground mb-2 block">Màu đại diện</label>
            <div className="flex gap-2 mb-6">
              {COLORS.map(c => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-10 h-10 rounded-full transition-all ${
                    color === c ? 'ring-2 ring-foreground scale-110' : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>

            {/* Preview */}
            <div className="bg-card rounded-2xl shadow-card p-4 mb-6 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl" style={{ backgroundColor: color + '30' }}>
                {emoji}
              </div>
              <div>
                <p className="font-bold text-foreground">{memberName || 'Tên của bạn'}</p>
                <p className="text-xs text-muted-foreground">🐣 Principiante · 0 XP</p>
              </div>
            </div>

            <button
              onClick={handleSaveMember}
              disabled={loading || !memberName.trim()}
              className="w-full min-h-[48px] rounded-full gradient-primary text-primary-foreground font-bold shadow-card disabled:opacity-40"
            >
              {loading ? 'Đang lưu...' : '¡Vamos! Bắt đầu học 🚀'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
