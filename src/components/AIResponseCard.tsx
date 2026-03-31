import { Loader2, RotateCcw, Bot } from 'lucide-react';

interface AIResponseCardProps {
  content: string | null;
  isLoading: boolean;
  error: string | null;
  onRetry?: () => void;
}

export function AILoadingIndicator() {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground py-3">
      <Loader2 size={16} className="animate-spin" />
      <span>🤖 Đang suy nghĩ<span className="animate-pulse">...</span></span>
    </div>
  );
}

export function AIResponseCard({ content, isLoading, error, onRetry }: AIResponseCardProps) {
  if (isLoading) return <AILoadingIndicator />;

  if (error) {
    return (
      <div className="rounded-2xl bg-destructive/10 p-4 text-sm">
        <p className="text-destructive mb-2">AI đang bận, thử lại nhé! 🔄</p>
        {onRetry && (
          <button onClick={onRetry} className="flex items-center gap-1 text-xs font-bold text-primary">
            <RotateCcw size={12} /> Thử lại
          </button>
        )}
      </div>
    );
  }

  if (!content) return null;

  return (
    <div className="rounded-2xl bg-[hsl(var(--ai-bg,213,100%,97%))] p-4 text-sm">
      <div className="flex items-start gap-2">
        <Bot size={16} className="text-primary mt-0.5 shrink-0" />
        <div className="whitespace-pre-wrap text-foreground leading-relaxed">{content}</div>
      </div>
    </div>
  );
}
