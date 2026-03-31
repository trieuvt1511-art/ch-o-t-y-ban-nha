import { useNavigate, useLocation } from 'react-router-dom';
import { Home, BookOpen, Brain, Type, Headphones, Users } from 'lucide-react';

const NAV_ITEMS = [
  { path: '/dashboard', icon: Home, label: 'Home' },
  { path: '/scenarios', icon: BookOpen, label: 'Learn' },
  { path: '/flashcards', icon: Brain, label: 'Cards' },
  { path: '/sentence-builder', icon: Type, label: 'Câu Dài' },
  { path: '/listening', icon: Headphones, label: 'Listen' },
  { path: '/leaderboard', icon: Users, label: 'Family' },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-xl border-t border-border z-50">
      <div className="max-w-[430px] mx-auto flex">
        {NAV_ITEMS.map(({ path, icon: Icon, label }) => {
          const active = pathname === path || (path !== '/dashboard' && pathname.startsWith(path));
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="flex-1 flex flex-col items-center pt-2 pb-2.5 gap-0.5 transition-all relative"
            >
              {/* Active underline indicator */}
              {active && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[3px] rounded-full bg-primary" />
              )}
              <div className={`p-1.5 rounded-full transition-all ${active ? 'text-primary' : 'text-muted-foreground'}`}>
                <Icon size={22} strokeWidth={active ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] font-extrabold transition-colors ${active ? 'text-primary' : 'text-muted-foreground'}`}>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
