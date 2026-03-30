import { useNavigate, useLocation } from 'react-router-dom';
import { Home, BookOpen, Brain, MessageCircle, Headphones } from 'lucide-react';

const NAV_ITEMS = [
  { path: '/dashboard', icon: Home, label: 'Trang chủ' },
  { path: '/scenarios', icon: BookOpen, label: 'Bài học' },
  { path: '/flashcards', icon: Brain, label: 'Flashcard' },
  { path: '/sentence-builder', icon: MessageCircle, label: 'Ngữ pháp' },
  { path: '/listening', icon: Headphones, label: 'Nghe' },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border shadow-elevated z-50">
      <div className="max-w-[430px] mx-auto flex">
        {NAV_ITEMS.map(({ path, icon: Icon, label }) => {
          const active = pathname === path || (path !== '/dashboard' && pathname.startsWith(path));
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex-1 flex flex-col items-center py-2.5 gap-0.5 transition-all ${active ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <div className={`p-1 rounded-xl transition-all ${active ? 'bg-primary/10' : ''}`}>
                <Icon size={20} />
              </div>
              <span className="text-[10px] font-bold">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
