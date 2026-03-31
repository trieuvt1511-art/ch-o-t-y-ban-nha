import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Smartphone, Share, MoreVertical, Plus, Check } from 'lucide-react';
import installIos from '@/assets/install-ios.jpg';
import installAndroid from '@/assets/install-android.jpg';

export default function InstallScreen() {
  const navigate = useNavigate();
  const [platform, setPlatform] = useState<'ios' | 'android'>('ios');

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <div className="w-full max-w-[430px] px-5 pt-6 pb-8 page-enter">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="btn-icon bg-muted text-muted-foreground hover:text-foreground hover:bg-accent">
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-heading font-bold text-foreground text-lg">Cài App HolaBoBo</h1>
        </div>

        {/* Hero */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 rounded-3xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-card">
            <Download size={36} className="text-primary-foreground" />
          </div>
          <h2 className="text-xl font-heading font-bold text-foreground mb-2">
            Cài lên điện thoại 📱
          </h2>
          <p className="text-sm text-muted-foreground">
            HolaBoBo hoạt động như app thật — mở nhanh, học offline, không cần App Store!
          </p>
        </div>

        {/* Platform selector */}
        <div className="flex bg-muted rounded-full p-1 mb-6">
          <button
            onClick={() => setPlatform('ios')}
            className={`flex-1 rounded-full min-h-[44px] text-sm font-bold transition-all flex items-center justify-center gap-2 ${platform === 'ios' ? 'bg-card text-foreground shadow-card' : 'text-muted-foreground'}`}
          >
            🍎 iPhone
          </button>
          <button
            onClick={() => setPlatform('android')}
            className={`flex-1 rounded-full min-h-[44px] text-sm font-bold transition-all flex items-center justify-center gap-2 ${platform === 'android' ? 'bg-card text-foreground shadow-card' : 'text-muted-foreground'}`}
          >
            🤖 Android
          </button>
        </div>

        {/* Steps */}
        {platform === 'ios' ? (
          <div className="space-y-4">
            <StepCard number={1} icon={<Share size={20} />} color="bg-primary/15 text-primary"
              title="Nhấn nút Chia sẻ"
              description="Mở HolaBoBo bằng Safari, nhấn biểu tượng chia sẻ (hình vuông có mũi tên lên) ở thanh dưới."
            />
            <StepCard number={2} icon={<Plus size={20} />} color="bg-secondary/15 text-secondary"
              title='Chọn "Thêm vào MH chính"'
              description="Cuộn xuống trong menu chia sẻ, tìm và nhấn 'Thêm vào Màn hình chính' (Add to Home Screen)."
            />
            <StepCard number={3} icon={<Check size={20} />} color="bg-success/15 text-success"
              title='Nhấn "Thêm"'
              description="Đặt tên app (mặc định là HolaBoBo) rồi nhấn 'Thêm' ở góc trên bên phải. Xong!"
            />

            {/* Illustration */}
            <div className="rounded-2xl overflow-hidden shadow-card">
              <img src={installIos} alt="Hướng dẫn cài trên iPhone" className="w-full h-auto" width={800} height={600} loading="lazy" />
            </div>

            <div className="rounded-2xl bg-secondary/10 p-4 text-center">
              <p className="text-xs font-bold text-secondary mb-1">⚠️ Lưu ý</p>
              <p className="text-xs text-muted-foreground">Phải dùng <strong>Safari</strong> (không phải Chrome) trên iPhone để cài được app!</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <StepCard number={1} icon={<MoreVertical size={20} />} color="bg-primary/15 text-primary"
              title="Nhấn menu ⋮"
              description="Mở HolaBoBo bằng Chrome, nhấn biểu tượng ba chấm dọc (⋮) ở góc trên bên phải."
            />
            <StepCard number={2} icon={<Download size={20} />} color="bg-secondary/15 text-secondary"
              title='"Cài ứng dụng" hoặc "Thêm vào MH chính"'
              description='Chrome có thể hiện "Cài ứng dụng" (Install app) hoặc "Thêm vào Màn hình chính" (Add to Home Screen).'
            />
            <StepCard number={3} icon={<Check size={20} />} color="bg-success/15 text-success"
              title='Nhấn "Cài đặt"'
              description="Xác nhận cài đặt. App sẽ xuất hiện trên màn hình chính như app thật!"
            />

            {/* Illustration */}
            <div className="rounded-2xl overflow-hidden shadow-card">
              <img src={installAndroid} alt="Hướng dẫn cài trên Android" className="w-full h-auto" width={800} height={600} loading="lazy" />
            </div>

            <div className="rounded-2xl bg-success/10 p-4 text-center">
              <p className="text-xs font-bold text-success mb-1">💡 Mẹo</p>
              <p className="text-xs text-muted-foreground">Trên một số điện thoại Android, Chrome sẽ tự hiện banner gợi ý cài app!</p>
            </div>
          </div>
        )}

        {/* Benefits */}
        <div className="mt-6 rounded-2xl bg-card shadow-card p-5">
          <p className="font-heading font-bold text-foreground mb-3 text-center">✨ Lợi ích khi cài app</p>
          <div className="space-y-3">
            <BenefitItem emoji="⚡" text="Mở nhanh từ màn hình chính" />
            <BenefitItem emoji="📶" text="Học offline không cần Internet" />
            <BenefitItem emoji="📱" text="Giao diện toàn màn hình như app thật" />
            <BenefitItem emoji="🔄" text="Tự động cập nhật khi có phiên bản mới" />
            <BenefitItem emoji="💾" text="Không chiếm bộ nhớ điện thoại" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StepCard({ number, icon, color, title, description }: {
  number: number; icon: React.ReactNode; color: string; title: string; description: string;
}) {
  return (
    <div className="rounded-2xl bg-card shadow-card p-4 flex gap-4 items-start">
      <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center shrink-0`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground font-bold mb-0.5">Bước {number}</p>
        <p className="font-heading font-bold text-foreground text-sm">{title}</p>
        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function BenefitItem({ emoji, text }: { emoji: string; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-lg">{emoji}</span>
      <span className="text-sm text-foreground">{text}</span>
    </div>
  );
}
