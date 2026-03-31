import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface LocalProfile {
  id: string;
  name: string;
  emoji: string;
  level: string;
  wordsLearned: number;
  scenariosCompleted: number;
  streak: number;
  lastActiveDate: string;
  weeklyXP: number;
  totalXP: number;
  learnedWords: string[];
  reviewCards: Record<string, { word_id: string; ease_factor: number; interval: number; repetitions: number; next_review: string }>;
  duelsWon: number;
  voiceNotes: number;
  phraseLog: string[];
}

interface FamilyGroup {
  name: string;
  questTitle: string;
  questTarget: number;
  questProgress: number;
  questWeek: string;
  cheers: { from: string; to: string; type: string; date: string }[];
  voicePosts: { id: string; userId: string; text: string; date: string }[];
  storySentences: { userId: string; sentence: string; week: string }[];
  duelResults: { challengerId: string; opponentId: string; challengerScore: number; opponentScore: number; date: string }[];
}

interface AppContextType {
  profiles: LocalProfile[];
  activeProfile: LocalProfile | null;
  family: FamilyGroup;
  setActiveProfileId: (id: string) => void;
  createProfile: (name: string, emoji: string, level: string) => LocalProfile;
  updateProfile: (data: Partial<LocalProfile>) => void;
  deleteProfile: (id: string) => void;
  addLearnedWord: (wordId: string) => void;
  removeLearnedWord: (wordId: string) => void;
  addXP: (amount: number) => void;
  updateFamily: (data: Partial<FamilyGroup>) => void;
}

const STORAGE_KEY = 'holamind_profiles';
const ACTIVE_KEY = 'holamind_active';
const FAMILY_KEY = 'holamind_family';

function loadProfiles(): LocalProfile[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}
function saveProfiles(p: LocalProfile[]) { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); }
function loadFamily(): FamilyGroup {
  try {
    return JSON.parse(localStorage.getItem(FAMILY_KEY) || 'null') || defaultFamily();
  } catch { return defaultFamily(); }
}
function saveFamily(f: FamilyGroup) { localStorage.setItem(FAMILY_KEY, JSON.stringify(f)); }
function defaultFamily(): FamilyGroup {
  return {
    name: 'Gia đình',
    questTitle: 'Cả nhà học 50 từ về đồ ăn 🍕',
    questTarget: 50,
    questProgress: 0,
    questWeek: new Date().toISOString().split('T')[0],
    cheers: [],
    voicePosts: [],
    storySentences: [],
    duelResults: [],
  };
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [profiles, setProfiles] = useState<LocalProfile[]>(loadProfiles);
  const [activeId, setActiveId] = useState<string | null>(() => localStorage.getItem(ACTIVE_KEY));
  const [family, setFamily] = useState<FamilyGroup>(loadFamily);

  const activeProfile = profiles.find(p => p.id === activeId) || null;

  // Persist
  useEffect(() => { saveProfiles(profiles); }, [profiles]);
  useEffect(() => { saveFamily(family); }, [family]);
  useEffect(() => {
    if (activeId) localStorage.setItem(ACTIVE_KEY, activeId);
    else localStorage.removeItem(ACTIVE_KEY);
  }, [activeId]);

  // Update streak on load
  useEffect(() => {
    if (!activeProfile) return;
    const today = new Date().toISOString().split('T')[0];
    if (activeProfile.lastActiveDate === today) return;
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    const newStreak = activeProfile.lastActiveDate === yesterday ? activeProfile.streak + 1 : 1;
    setProfiles(prev => prev.map(p => p.id === activeId ? { ...p, streak: newStreak, lastActiveDate: today } : p));
  }, [activeId]);

  const setActiveProfileId = useCallback((id: string) => setActiveId(id), []);

  const createProfile = useCallback((name: string, emoji: string, level: string): LocalProfile => {
    const p: LocalProfile = {
      id: crypto.randomUUID(),
      name, emoji, level,
      wordsLearned: 0, scenariosCompleted: 0, streak: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      weeklyXP: 0, totalXP: 0,
      learnedWords: [], reviewCards: {},
      duelsWon: 0, voiceNotes: 0, phraseLog: [],
    };
    setProfiles(prev => [...prev, p]);
    setActiveId(p.id);
    return p;
  }, []);

  const updateProfile = useCallback((data: Partial<LocalProfile>) => {
    setProfiles(prev => prev.map(p => p.id === activeId ? { ...p, ...data } : p));
  }, [activeId]);

  const deleteProfile = useCallback((id: string) => {
    setProfiles(prev => prev.filter(p => p.id !== id));
    if (activeId === id) setActiveId(null);
  }, [activeId]);

  const addLearnedWord = useCallback((wordId: string) => {
    setProfiles(prev => prev.map(p => {
      if (p.id !== activeId || p.learnedWords.includes(wordId)) return p;
      return { ...p, learnedWords: [...p.learnedWords, wordId], wordsLearned: p.wordsLearned + 1 };
    }));
  }, [activeId]);

  const removeLearnedWord = useCallback((wordId: string) => {
    setProfiles(prev => prev.map(p => {
      if (p.id !== activeId) return p;
      return { ...p, learnedWords: p.learnedWords.filter(w => w !== wordId), wordsLearned: Math.max(0, p.wordsLearned - 1) };
    }));
  }, [activeId]);

  const addXP = useCallback((amount: number) => {
    setProfiles(prev => prev.map(p => {
      if (p.id !== activeId) return p;
      return { ...p, weeklyXP: p.weeklyXP + amount, totalXP: p.totalXP + amount };
    }));
  }, [activeId]);

  const updateFamily = useCallback((data: Partial<FamilyGroup>) => {
    setFamily(prev => ({ ...prev, ...data }));
  }, []);

  return (
    <AppContext.Provider value={{
      profiles, activeProfile, family,
      setActiveProfileId, createProfile, updateProfile, deleteProfile,
      addLearnedWord, removeLearnedWord, addXP, updateFamily,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
