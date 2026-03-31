import { useState } from 'react';
import { Bot, X } from 'lucide-react';
import { callAI, AI_PROMPTS } from '@/lib/ai-helpers';
import { AIResponseCard } from './AIResponseCard';

interface FlashcardAIHelperProps {
  word: string;
  meaning: string;
  onClose: () => void;
}

export function FlashcardAIHelper({ word, meaning, onClose }: FlashcardAIHelperProps) {
  const [content, setContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Auto-fetch on mount
  useState(() => {
    (async () => {
      const result = await callAI(
        [{ role: 'user', content: AI_PROMPTS.flashcardHelp(word, meaning) }],
        "You are a friendly Spanish tutor helping Vietnamese learners remember words."
      );
      if (result.error) setError(result.error);
      else setContent(result.reply);
      setIsLoading(false);
    })();
  });

  const retry = async () => {
    setIsLoading(true);
    setError(null);
    const result = await callAI(
      [{ role: 'user', content: AI_PROMPTS.flashcardHelp(word, meaning) }],
      "You are a friendly Spanish tutor helping Vietnamese learners remember words."
    );
    if (result.error) setError(result.error);
    else setContent(result.reply);
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end justify-center">
      <div className="w-full max-w-[430px] bg-card rounded-t-3xl shadow-xl p-5 pb-8 max-h-[60vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Bot size={20} className="text-primary" />
            <span className="font-heading font-bold text-foreground">Hỏi AI về "{word}"</span>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
            <X size={16} />
          </button>
        </div>
        <AIResponseCard content={content} isLoading={isLoading} error={error} onRetry={retry} />
      </div>
    </div>
  );
}
