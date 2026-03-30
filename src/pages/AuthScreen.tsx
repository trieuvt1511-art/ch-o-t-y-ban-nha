import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';
import heroFamily from '@/assets/hero-family.png';
import { useToast } from '@/hooks/use-toast';

export default function AuthScreen() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { name: name || email.split('@')[0] },
          },
        });
        if (error) throw error;
        toast({
          title: '🎉 Đăng ký thành công!',
          description: 'Kiểm tra email để xác nhận tài khoản nhé.',
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate('/dashboard');
      }
    } catch (err: any) {
      toast({
        title: 'Lỗi',
        description: err.message === 'Invalid login credentials'
          ? 'Email hoặc mật khẩu không đúng'
          : err.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-5 py-6">
      <div className="w-full max-w-[430px] page-enter">
        {/* Hero */}
        <div className="text-center mb-6">
          <img src={heroFamily} alt="HolaMind" className="w-36 h-auto mx-auto mb-3 animate-float" width={800} height={600} />
          <h1 className="text-3xl font-heading font-bold text-foreground">
            Hola<span className="text-primary">Mind</span> 🇪🇸
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Học tiếng Tây Ban Nha cùng gia đình</p>
        </div>

        {/* Tabs */}
        <div className="flex bg-muted rounded-full p-1 mb-6">
          {(['login', 'signup'] as const).map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 rounded-full min-h-[44px] text-sm font-bold transition-all ${mode === m ? 'bg-card text-foreground shadow-card' : 'text-muted-foreground'}`}
            >
              {m === 'login' ? 'Đăng nhập' : 'Đăng ký'}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div className="relative">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Tên của bạn"
                className="w-full rounded-2xl border border-input bg-card pl-11 pr-4 min-h-[48px] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          )}

          <div className="relative">
            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full rounded-2xl border border-input bg-card pl-11 pr-4 min-h-[48px] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="relative">
            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Mật khẩu (tối thiểu 6 ký tự)"
              required
              minLength={6}
              className="w-full rounded-2xl border border-input bg-card pl-11 pr-11 min-h-[48px] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : (
              <>
                {mode === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'}
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-6">
          {mode === 'login' ? 'Chưa có tài khoản? ' : 'Đã có tài khoản? '}
          <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="text-primary font-bold">
            {mode === 'login' ? 'Đăng ký ngay' : 'Đăng nhập'}
          </button>
        </p>
      </div>
    </div>
  );
}
