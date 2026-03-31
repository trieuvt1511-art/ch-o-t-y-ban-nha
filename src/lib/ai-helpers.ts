import { supabase } from '@/integrations/supabase/client';

export interface AIResponse {
  reply: string;
  error?: string;
}

export async function callAI(messages: { role: string; content: string }[], systemPrompt: string): Promise<AIResponse> {
  try {
    const { data, error } = await supabase.functions.invoke('ai-chat', {
      body: { messages, systemPrompt },
    });
    if (error) throw error;
    if (data?.error) throw new Error(data.error);
    return { reply: data.reply };
  } catch (e: any) {
    console.error('AI call failed:', e);
    return { reply: '', error: e.message || 'AI đang bận, thử lại nhé! 🔄' };
  }
}

// System prompts for each feature
export const AI_PROMPTS = {
  scenarioChat: "You are a friendly Spanish tutor. User is Vietnamese beginner. Reply in simple Spanish under 3 sentences. Add [Sửa lỗi:] if grammar mistake, or [Mẹo:] for useful tip. Add Vietnamese translation in parentheses after each Spanish sentence.",
  
  flashcardHelp: (word: string, meaning: string) => 
    `Explain Spanish word '${word}' (means '${meaning}' in Vietnamese) to a Vietnamese learner. Give: 1) 💡 One memory trick in Vietnamese, 2) 📝 Two example sentences with Vietnamese translation, 3) ⚠️ One common mistake Vietnamese speakers make. Be friendly and concise. Use emojis.`,
  
  sentenceCheck: (sentence: string) => 
    `Check this Spanish sentence by a Vietnamese beginner: '${sentence}'. Reply in this format:
1) ✅ Đúng rồi! or ❌ Cần sửa
2) Corrected version (if needed)
3) One-line explanation in Vietnamese
Be encouraging and friendly. Use emojis.`,
  
  storySuggestion: (story: string) => 
    `Continue this Spanish story with 3 simple options (A1 level, max 10 words each). Story so far: '${story}'. Number them 1-3. Add Vietnamese translation in parentheses. Keep it fun and simple.`,
};

// localStorage helpers for chat history
export function loadChatHistory(scenarioId: string): { role: string; content: string }[] {
  try {
    return JSON.parse(localStorage.getItem(`holamind_chat_${scenarioId}`) || '[]');
  } catch { return []; }
}

export function saveChatHistory(scenarioId: string, messages: { role: string; content: string }[]) {
  localStorage.setItem(`holamind_chat_${scenarioId}`, JSON.stringify(messages.slice(-50)));
}
