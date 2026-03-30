import { useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, RotateCcw, Trophy } from 'lucide-react';

const NAV_ITEMS = [
  { path: '/scenarios', icon: BookOpen, label: 'Học' },
  { path: '/review', icon: RotateCcw, label: 'Ôn tập' },
  { path: '/leaderboard', icon: Trophy, label: 'Bảng xếp hạng' },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-elevated">
      <div className="max-w-[390px] mx-auto flex">
        {NAV_ITEMS.map(({ path, icon: Icon, label }) => {
          const active = pathname.startsWith(path);
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex-1 flex flex-col items-center py-3 gap-1 transition-colors ${active ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <Icon size={20} />
              <span className="text-xs font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
