import { useState } from 'react';
import { Bot, Lightbulb, Loader2 } from 'lucide-react';
import { callAI, AI_PROMPTS } from '@/lib/ai-helpers';
import { AIResponseCard } from './AIResponseCard';

interface StorySuggestionProps {
  currentStory: string;
  onSelect: (sentence: string) => void;
}

export function StorySuggestion({ currentStory, onSelect }: StorySuggestionProps) {
  const [suggestions, setSuggestions] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getSuggestions = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null);
    setSuggestions(null);

    const res = await callAI(
      [{ role: 'user', content: AI_PROMPTS.storySuggestion(currentStory || 'No story yet. Start a new one.') }],
      "You are a creative Spanish story helper for Vietnamese family learners. A1 level only."
    );

    if (res.error) setError(res.error);
    else setSuggestions(res.reply);
    setIsLoading(false);
  };

  // Parse numbered suggestions from AI response
  const parseSuggestions = (text: string): string[] => {
    const lines = text.split('\n').filter(l => /^\d+[\.\)]/.test(l.trim()));
    return lines.map(l => l.replace(/^\d+[\.\)]\s*/, '').trim());
  };

  const parsed = suggestions ? parseSuggestions(suggestions) : [];

  return (
    <div className="space-y-2">
      <button
        onClick={getSuggestions}
        disabled={isLoading}
        className="w-full min-h-[44px] rounded-full bg-muted text-foreground font-bold text-sm flex items-center justify-center gap-2 hover:bg-accent disabled:opacity-40"
      >
        {isLoading ? <><Loader2 size={16} className="animate-spin" /> Đang suy nghĩ...</> : <><Lightbulb size={16} /> Gợi ý câu tiếp theo 💡</>}
      </button>

      {error && <AIResponseCard content={null} isLoading={false} error={error} onRetry={getSuggestions} />}

      {parsed.length > 0 ? (
        <div className="space-y-2">
          {parsed.map((s, i) => (
            <button
              key={i}
              onClick={() => onSelect(s.split('(')[0].trim())}
              className="w-full rounded-xl bg-[hsl(213,100%,97%)] p-3 text-left text-sm text-foreground hover:bg-primary/10 transition-colors"
            >
              <span className="font-bold text-primary">{i + 1}.</span> {s}
            </button>
          ))}
        </div>
      ) : suggestions ? (
        <AIResponseCard content={suggestions} isLoading={false} error={null} />
      ) : null}
    </div>
  );
}
