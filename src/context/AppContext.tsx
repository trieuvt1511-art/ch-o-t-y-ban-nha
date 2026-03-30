import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Profile } from '@/lib/types';
import { getProfiles, saveProfiles, getActiveProfileId, setActiveProfileId, createProfile, updateStreak } from '@/lib/storage';

interface AppContextType {
  profiles: Profile[];
  activeProfile: Profile | null;
  addProfile: (name: string, emoji: string, level: Profile['level']) => void;
  selectProfile: (id: string) => void;
  logout: () => void;
  updateProfile: (profile: Profile) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [profiles, setProfiles] = useState<Profile[]>(getProfiles);
  const [activeId, setActiveId] = useState<string | null>(getActiveProfileId);

  useEffect(() => { saveProfiles(profiles); }, [profiles]);

  const activeProfile = profiles.find(p => p.id === activeId) ?? null;

  const addProfile = useCallback((name: string, emoji: string, level: Profile['level']) => {
    const p = createProfile(name, emoji, level);
    setProfiles(prev => [...prev, p]);
  }, []);

  const selectProfile = useCallback((id: string) => {
    setActiveId(id);
    setActiveProfileId(id);
    setProfiles(prev => prev.map(p => p.id === id ? updateStreak(p) : p));
  }, []);

  const logout = useCallback(() => {
    setActiveId(null);
    setActiveProfileId(null);
  }, []);

  const updateProfile = useCallback((updated: Profile) => {
    setProfiles(prev => prev.map(p => p.id === updated.id ? updated : p));
  }, []);

  return (
    <AppContext.Provider value={{ profiles, activeProfile, addProfile, selectProfile, logout, updateProfile }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
