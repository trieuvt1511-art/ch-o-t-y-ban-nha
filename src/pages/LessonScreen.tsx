import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SCENARIOS } from '@/lib/data';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, Volume2, Check } from 'lucide-react';

export default function LessonScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, learnedWords, addLearnedWord, removeLearnedWord } = useApp();
  const scenario = SCENARIOS.find(s => s.id === id);
  const [tab, setTab] = useState<'vocab' | 'practice'>('vocab');
  const [chatStep, setChatStep] = useState(0);

  if (!scenario || !user) {
    navigate('/scenarios');
    return null;
  }

  const learnedSet = new Set(learnedWords);

  const toggleLearned = async (wordId: string) => {
    if (learnedSet.has(wordId)) {
      await removeLearnedWord(wordId);
    } else {
      await addLearnedWord(wordId);
    }
  };

  const chatMessages = scenario.conversation;
  const visibleMessages = chatMessages.filter(m => m.role !== 'system').slice(0, chatStep + 2);
  const canAdvance = chatStep + 2 < chatMessages.filter(m => m.role !== 'system').length;
  const lastAi = [...visibleMessages].reverse().find(m => m.role === 'ai');

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <div className="w-full max-w-[430px] px-4 pt-6 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate('/scenarios')} className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={22} />
          </button>
          <div className="flex-1 min-w-0">
            <p className="font-heading font-bold text-foreground truncate">{scenario.categoryEmoji} {scenario.title}</p>
          </div>
        </div>

        <div className="flex bg-muted rounded-xl p-1 mb-5">
          {[
            { key: 'vocab' as const, label: 'Từ vựng' },
            { key: 'practice' as const, label: 'Luyện tập' },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 rounded-lg py-2 text-sm font-bold transition-all ${tab === t.key ? 'bg-card text-foreground shadow-card' : 'text-muted-foreground'}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'vocab' ? (
          <div className="space-y-3">
            {scenario.vocabulary.map((word, i) => (
              <div key={word.id} className="rounded-2xl bg-card shadow-card p-4 animate-scale-in" style={{ animationDelay: `${i * 0.04}s` }}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="text-lg font-heading font-bold text-foreground">{word.spanish}</p>
                    <p className="text-sm text-primary font-medium">{word.vietnamese}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">[{word.phonetic}]</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="text-muted-foreground hover:text-foreground transition-colors p-1">
                      <Volume2 size={18} />
                    </button>
                    <button
                      onClick={() => toggleLearned(word.id)}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${learnedSet.has(word.id) ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground hover:bg-accent'}`}
                    >
                      <Check size={14} />
                    </button>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-sm text-foreground italic">{word.example}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{word.exampleVi}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {chatMessages.find(m => m.role === 'system') && (
              <div className="text-center text-sm text-muted-foreground bg-muted rounded-xl p-3 mb-2">
                {chatMessages.find(m => m.role === 'system')?.spanish}
              </div>
            )}
            {visibleMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl p-3 animate-scale-in ${msg.role === 'user' ? 'gradient-primary text-primary-foreground' : 'bg-card shadow-card'}`}>
                  <p className={`text-sm font-medium ${msg.role === 'user' ? 'text-primary-foreground' : 'text-foreground'}`}>{msg.spanish}</p>
                  {msg.vietnamese && <p className={`text-xs mt-1 ${msg.role === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{msg.vietnamese}</p>}
                  {msg.tip && <div className="mt-2 bg-secondary/15 text-secondary rounded-lg p-2 text-xs font-bold">{msg.tip}</div>}
                </div>
              </div>
            ))}
            {lastAi?.suggestions && (
              <div className="space-y-2 pt-2">
                <p className="text-xs text-muted-foreground font-bold">💬 Gợi ý:</p>
                {lastAi.suggestions.map((s, i) => (
                  <button key={i} onClick={() => canAdvance && setChatStep(prev => prev + 2)}
                    className="w-full text-left rounded-xl border border-border bg-card p-3 text-sm text-foreground hover:border-primary transition-colors">
                    {s}
                  </button>
                ))}
              </div>
            )}
            {canAdvance && !lastAi?.suggestions && (
              <button onClick={() => setChatStep(prev => prev + 2)}
                className="w-full rounded-xl gradient-primary text-primary-foreground py-3 text-sm font-bold hover:opacity-90 transition-opacity">
                Tiếp tục hội thoại →
              </button>
            )}
            {!canAdvance && chatStep > 0 && (
              <div className="text-center text-sm text-success font-bold bg-success/10 rounded-xl p-4">
                🎉 Bạn đã hoàn thành bài hội thoại!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
