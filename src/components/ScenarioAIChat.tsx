import { useState, useCallback } from 'react';
import { Bot, Send, X } from 'lucide-react';
import { callAI, AI_PROMPTS, loadChatHistory, saveChatHistory } from '@/lib/ai-helpers';
import { AIResponseCard } from './AIResponseCard';

interface ScenarioAIChatProps {
  scenarioId: string;
  scenarioTitle: string;
}

type Msg = { role: 'user' | 'assistant'; content: string };

export function ScenarioAIChat({ scenarioId, scenarioTitle }: ScenarioAIChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(() => loadChatHistory(scenarioId) as Msg[]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || isLoading) return;
    const userMsg: Msg = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    const result = await callAI(
      newMessages.map(m => ({ role: m.role, content: m.content })),
      AI_PROMPTS.scenarioChat + ` Context: scenario about "${scenarioTitle}".`
    );

    const aiMsg: Msg = { role: 'assistant', content: result.error || result.reply };
    const updated = [...newMessages, aiMsg];
    setMessages(updated);
    saveChatHistory(scenarioId, updated);
    setIsLoading(false);
  }, [input, messages, isLoading, scenarioId, scenarioTitle]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 w-14 h-14 rounded-full gradient-primary shadow-lg flex items-center justify-center z-50 animate-bounce"
      >
        <Bot size={24} className="text-primary-foreground" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end justify-center">
      <div className="w-full max-w-[430px] h-[70vh] bg-card rounded-t-3xl shadow-xl flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot size={20} className="text-primary" />
            <span className="font-heading font-bold text-foreground text-sm">Chat AI - {scenarioTitle}</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
            <X size={16} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground text-sm py-8">
              <span className="text-3xl block mb-2">🤖</span>
              Viết tiếng Tây Ban Nha, AI sẽ trả lời!
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl p-3 text-sm ${
                msg.role === 'user'
                  ? 'gradient-primary text-primary-foreground'
                  : 'bg-[hsl(213,100%,97%)] text-foreground'
              }`}>
                {msg.role === 'assistant' && <span className="text-xs">🤖 </span>}
                <span className="whitespace-pre-wrap">{msg.content}</span>
              </div>
            </div>
          ))}
          {isLoading && <AIResponseCard content={null} isLoading error={null} />}
        </div>

        {/* Input */}
        <div className="p-3 border-t border-border flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Viết tiếng TBN..."
            className="flex-1 rounded-xl border border-input bg-background px-3 min-h-[44px] text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="w-11 h-11 rounded-full gradient-primary text-primary-foreground flex items-center justify-center disabled:opacity-40"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
