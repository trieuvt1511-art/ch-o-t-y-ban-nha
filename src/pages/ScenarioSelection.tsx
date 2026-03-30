import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SCENARIOS, CATEGORIES } from '@/lib/data';
import { Category } from '@/lib/types';
import { ArrowLeft, Star } from 'lucide-react';
import BottomNav from '@/components/BottomNav';

const DIFF_COLORS: Record<string, string> = {
  'Dễ': 'bg-success/15 text-success',
  'Trung bình': 'bg-secondary/15 text-secondary',
  'Khó': 'bg-primary/15 text-primary',
};

export default function ScenarioSelection() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<Category | 'all'>('all');

  const filtered = filter === 'all' ? SCENARIOS : SCENARIOS.filter(s => s.category === filter);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <div className="w-full max-w-[390px] px-4 pt-6 pb-24">
        <div className="flex items-center gap-3 mb-5">
          <button onClick={() => navigate('/dashboard')} className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-xl font-bold text-foreground">Chọn chủ đề</h1>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
          <button
            onClick={() => setFilter('all')}
            className={`shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${filter === 'all' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
          >
            Tất cả
          </button>
          {CATEGORIES.map(c => (
            <button
              key={c.name}
              onClick={() => setFilter(c.name)}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${filter === c.name ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
            >
              {c.emoji} {c.name}
            </button>
          ))}
        </div>

        {/* Scenario Grid */}
        <div className="space-y-3">
          {filtered.map((scenario, i) => {
            const hasContent = scenario.vocabulary.length > 0;
            return (
              <button
                key={scenario.id}
                onClick={() => hasContent && navigate(`/lesson/${scenario.id}`)}
                disabled={!hasContent}
                className={`w-full rounded-lg bg-card shadow-card p-4 text-left transition-all animate-scale-in ${hasContent ? 'hover:scale-[1.01] active:scale-[0.99]' : 'opacity-50'}`}
                style={{ animationDelay: `${i * 0.03}s` }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{scenario.categoryEmoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground truncate">{scenario.title}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${DIFF_COLORS[scenario.difficulty]}`}>
                        {scenario.difficulty}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star size={12} /> {scenario.xp} XP
                      </span>
                    </div>
                  </div>
                  {!hasContent && (
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">Sắp ra mắt</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
