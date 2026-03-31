import { useState } from 'react';
import { Bot, Check, Loader2 } from 'lucide-react';
import { callAI, AI_PROMPTS } from '@/lib/ai-helpers';
import { AIResponseCard } from './AIResponseCard';

export function SentenceChecker() {
  const [sentence, setSentence] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkSentence = async () => {
    if (!sentence.trim() || isLoading) return;
    setIsLoading(true);
    setError(null);
    setResult(null);

    const res = await callAI(
      [{ role: 'user', content: AI_PROMPTS.sentenceCheck(sentence.trim()) }],
      "You are a Spanish grammar checker for Vietnamese learners. Be encouraging."
    );

    if (res.error) setError(res.error);
    else setResult(res.reply);
    setIsLoading(false);
  };

  return (
    <div className="rounded-2xl bg-card shadow-card p-4 space-y-3">
      <p className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1">
        <Bot size={14} /> Kiểm tra AI
      </p>
      <input
        value={sentence}
        onChange={e => setSentence(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && checkSentence()}
        placeholder="Viết câu tiếng Tây Ban Nha của bạn..."
        className="w-full rounded-xl border border-input bg-background px-4 min-h-[48px] text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
      <button
        onClick={checkSentence}
        disabled={!sentence.trim() || isLoading}
        className="w-full min-h-[44px] rounded-full gradient-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-40"
      >
        {isLoading ? <><Loader2 size={16} className="animate-spin" /> Đang kiểm tra...</> : <><Check size={16} /> Kiểm tra AI ✅</>}
      </button>
      <AIResponseCard content={result} isLoading={false} error={error} onRetry={checkSentence} />
    </div>
  );
}
