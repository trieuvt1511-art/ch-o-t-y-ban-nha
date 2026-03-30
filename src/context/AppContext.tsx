import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';

interface DbProfile {
  id: string;
  name: string;
  emoji: string;
  level: string;
  words_learned: number;
  scenarios_completed: number;
  streak: number;
  last_active_date: string;
  weekly_xp: number;
}

interface AppContextType {
  user: User | null;
  profile: DbProfile | null;
  learnedWords: string[];
  loading: boolean;
  updateDbProfile: (data: Partial<DbProfile>) => Promise<void>;
  addLearnedWord: (wordId: string) => Promise<void>;
  removeLearnedWord: (wordId: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<DbProfile | null>(null);
  const [learnedWords, setLearnedWords] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Listen to auth state
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        setProfile(null);
        setLearnedWords([]);
        setLoading(false);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load profile + learned words when user changes
  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      setLoading(true);
      const [profileRes, wordsRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('learned_words').select('word_id').eq('user_id', user.id),
      ]);

      if (profileRes.data) {
        const p = profileRes.data as any;
        // Update streak
        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        if (p.last_active_date !== today) {
          const newStreak = p.last_active_date === yesterday ? p.streak + 1 : 1;
          await supabase.from('profiles').update({ streak: newStreak, last_active_date: today }).eq('id', user.id);
          p.streak = newStreak;
          p.last_active_date = today;
        }
        setProfile(p);
      }

      if (wordsRes.data) {
        setLearnedWords(wordsRes.data.map((w: any) => w.word_id));
      }
      setLoading(false);
    };

    loadData();
  }, [user]);

  const updateDbProfile = useCallback(async (data: Partial<DbProfile>) => {
    if (!user) return;
    const { data: updated, error } = await supabase
      .from('profiles')
      .update(data as any)
      .eq('id', user.id)
      .select()
      .single();
    if (!error && updated) setProfile(updated as any);
  }, [user]);

  const addLearnedWord = useCallback(async (wordId: string) => {
    if (!user) return;
    await supabase.from('learned_words').upsert({ user_id: user.id, word_id: wordId });
    setLearnedWords(prev => prev.includes(wordId) ? prev : [...prev, wordId]);
    // Update count
    const newCount = (profile?.words_learned ?? 0) + 1;
    await updateDbProfile({ words_learned: newCount });
  }, [user, profile, updateDbProfile]);

  const removeLearnedWord = useCallback(async (wordId: string) => {
    if (!user) return;
    await supabase.from('learned_words').delete().eq('user_id', user.id).eq('word_id', wordId);
    setLearnedWords(prev => prev.filter(id => id !== wordId));
    const newCount = Math.max(0, (profile?.words_learned ?? 0) - 1);
    await updateDbProfile({ words_learned: newCount });
  }, [user, profile, updateDbProfile]);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setLearnedWords([]);
  }, []);

  return (
    <AppContext.Provider value={{ user, profile, learnedWords, loading, updateDbProfile, addLearnedWord, removeLearnedWord, logout }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
