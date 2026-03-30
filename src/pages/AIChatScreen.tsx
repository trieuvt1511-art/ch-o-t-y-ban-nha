import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mic, MicOff, Send, Bot, User, Loader2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { supabase } from '@/integrations/supabase/client';
import BottomNav from '@/components/BottomNav';

type Msg = { role: 'user' | 'assistant'; content: string };

const SCENARIOS_PROMPTS = [
  { label: '🍽️ Nhà hàng', prompt: 'Hãy đóng vai phục vụ nhà hàng Tây Ban Nha. Trả lời bằng tiếng Tây Ban Nha, kèm bản dịch tiếng Việt trong ngoặc. Bắt đầu bằng cách chào khách.' },
  { label: '✈️ Hỏi đường', prompt: 'Hãy đóng vai người dân địa phương ở Madrid. Trả lời bằng tiếng Tây Ban Nha, kèm dịch tiếng Việt trong ngoặc. Bắt đầu hỏi tôi cần giúp gì.' },
  { label: '💼 Phỏng vấn', prompt: 'Hãy đóng vai nhà tuyển dụng ở công ty Tây Ban Nha. Trả lời bằng tiếng Tây Ban Nha, kèm dịch tiếng Việt. Bắt đầu phỏng vấn.' },
  { label: '👥 Kết bạn', prompt: 'Hãy đóng vai một người bạn mới tại buổi tiệc ở Barcelona. Trả lời bằng tiếng Tây Ban Nha, kèm dịch tiếng Việt. Bắt đầu làm quen.' },
];

export default function AIChatScreen() {
  const navigate = useNavigate();
  const { user } = useApp();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const startScenario = async (prompt: string) => {
    setSelectedScenario(prompt);
    setMessages([]);
    setIsLoading(true);

    const systemMsg = `Bạn là gia sư tiếng Tây Ban Nha cho người Việt. ${prompt} Sau mỗi câu trả lời, thêm 1 mẹo ngữ pháp ngắn bằng tiếng Việt (bắt đầu bằng 💡). Giữ câu ngắn, dễ hiểu. Nếu người dùng nói tiếng Việt, khuyến khích họ thử nói tiếng Tây Ban Nha.`;

    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: {
          messages: [{ role: 'user', content: 'Bắt đầu hội thoại' }],
          systemPrompt: systemMsg,
        },
      });

      if (error) throw error;
      setMessages([{ role: 'assistant', content: data.reply }]);
    } catch (e) {
      console.error(e);
      setMessages([{ role: 'assistant', content: '¡Hola! Xin lỗi, có lỗi kết nối. Hãy thử lại nhé! (Lỗi kết nối AI)' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg: Msg = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    scrollToBottom();

    const systemMsg = `Bạn là gia sư tiếng Tây Ban Nha cho người Việt. ${selectedScenario} Sau mỗi câu trả lời, thêm 1 mẹo ngữ pháp ngắn bằng tiếng Việt (bắt đầu bằng 💡). Giữ câu ngắn. Nếu người dùng mắc lỗi ngữ pháp, sửa nhẹ nhàng.`;

    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: {
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          systemPrompt: systemMsg,
        },
      });

      if (error) throw error;
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Xin lỗi, có lỗi xảy ra. Hãy thử lại!' }]);
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  };

  // Speech recognition
  const toggleListening = useCallback(() => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Trình duyệt không hỗ trợ nhận diện giọng nói. Hãy dùng Chrome.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((r: any) => r[0].transcript)
        .join('');
      setInput(transcript);
    };

    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.start();
    recognitionRef.current = recognition;
    setIsListening(true);
  }, [isListening]);

  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <div className="w-full max-w-[390px] flex flex-col h-screen">
        {/* Header */}
        <div className="px-4 pt-6 pb-3 flex items-center gap-3">
          <button onClick={() => navigate('/dashboard')} className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={22} />
          </button>
          <div>
            <h1 className="text-lg font-bold text-foreground">Luyện nói với AI 🤖</h1>
            <p className="text-xs text-muted-foreground">Thực hành hội thoại tiếng Tây Ban Nha</p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          {!selectedScenario ? (
            <div className="space-y-3 pt-4">
              <p className="text-sm text-muted-foreground text-center mb-4">Chọn tình huống để bắt đầu:</p>
              {SCENARIOS_PROMPTS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => startScenario(s.prompt)}
                  className="w-full rounded-lg bg-card shadow-card p-4 text-left font-semibold text-foreground hover:scale-[1.01] active:scale-[0.99] transition-all animate-scale-in"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-3 pt-2">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-scale-in`}>
                  <div className={`flex items-start gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-primary' : 'bg-secondary'}`}>
                      {msg.role === 'user' ? <User size={14} className="text-primary-foreground" /> : <Bot size={14} className="text-secondary-foreground" />}
                    </div>
                    <div className={`rounded-lg p-3 ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-card shadow-card text-foreground'}`}>
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-card shadow-card rounded-lg p-3 flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Đang suy nghĩ...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input */}
        {selectedScenario && (
          <div className="px-4 pb-4 pt-2 border-t border-border bg-background">
            <div className="flex gap-2">
              <button
                onClick={toggleListening}
                className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-all ${isListening ? 'bg-destructive text-destructive-foreground animate-pulse' : 'bg-muted text-muted-foreground hover:text-foreground'}`}
              >
                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              </button>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder={isListening ? 'Đang nghe...' : 'Nhập tiếng TBN hoặc VN...'}
                className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shrink-0 hover:opacity-90 transition-opacity disabled:opacity-40"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">
              🎤 Nhấn mic để nói tiếng Tây Ban Nha · Trình duyệt sẽ nhận diện giọng nói
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
