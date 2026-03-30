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
      <div className="w-full max-w-[430px] px-5 pt-6 pb-24 page-enter">
        <div className="flex items-center gap-3 mb-5">
          <button onClick={() => navigate('/dashboard')} className="btn-icon bg-muted text-muted-foreground hover:text-foreground hover:bg-accent">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-heading font-bold text-foreground">Chọn chủ đề</h1>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
          <button
            onClick={() => setFilter('all')}
            className={`shrink-0 px-4 min-h-[36px] rounded-full text-xs font-bold transition-all ${filter === 'all' ? 'gradient-primary text-primary-foreground shadow-card' : 'bg-muted text-muted-foreground'}`}
          >
            Tất cả
          </button>
          {CATEGORIES.map(c => (
            <button
              key={c.name}
              onClick={() => setFilter(c.name)}
              className={`shrink-0 px-4 min-h-[36px] rounded-full text-xs font-bold transition-all ${filter === c.name ? 'gradient-primary text-primary-foreground shadow-card' : 'bg-muted text-muted-foreground'}`}
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
                className={`w-full rounded-2xl bg-card shadow-card p-4 text-left transition-all ${hasContent ? 'card-hover' : 'opacity-50'}`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{scenario.categoryEmoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-heading font-bold text-foreground truncate">{scenario.title}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${DIFF_COLORS[scenario.difficulty]}`}>
                        {scenario.difficulty}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star size={12} /> {scenario.xp} XP
                      </span>
                    </div>
                  </div>
                  {!hasContent && (
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full font-bold">Sắp ra mắt</span>
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
