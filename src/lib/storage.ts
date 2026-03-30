import { Profile, ReviewCard } from './types';

const PROFILES_KEY = 'holamind_profiles';
const ACTIVE_PROFILE_KEY = 'holamind_active_profile';

export function getProfiles(): Profile[] {
  const data = localStorage.getItem(PROFILES_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveProfiles(profiles: Profile[]): void {
  localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
}

export function getActiveProfileId(): string | null {
  return localStorage.getItem(ACTIVE_PROFILE_KEY);
}

export function setActiveProfileId(id: string | null): void {
  if (id) localStorage.setItem(ACTIVE_PROFILE_KEY, id);
  else localStorage.removeItem(ACTIVE_PROFILE_KEY);
}

export function createProfile(name: string, emoji: string, level: Profile['level']): Profile {
  return {
    id: crypto.randomUUID(),
    name,
    emoji,
    level,
    wordsLearned: 0,
    scenariosCompleted: 0,
    streak: 0,
    lastActiveDate: new Date().toISOString().split('T')[0],
    weeklyXP: 0,
    learnedWords: [],
    reviewCards: [],
  };
}

export function updateStreak(profile: Profile): Profile {
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  if (profile.lastActiveDate === today) return profile;
  if (profile.lastActiveDate === yesterday) {
    return { ...profile, streak: profile.streak + 1, lastActiveDate: today };
  }
  return { ...profile, streak: 1, lastActiveDate: today };
}

// SM-2 algorithm
export function calculateNextReview(card: ReviewCard, quality: number): ReviewCard {
  let { easeFactor, interval, repetitions } = card;

  if (quality < 3) {
    repetitions = 0;
    interval = 1;
  } else {
    if (repetitions === 0) interval = 1;
    else if (repetitions === 1) interval = 6;
    else interval = Math.round(interval * easeFactor);
    repetitions += 1;
  }

  easeFactor = Math.max(1.3, easeFactor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));

  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + interval);

  return {
    ...card,
    easeFactor,
    interval,
    repetitions,
    nextReview: nextDate.toISOString().split('T')[0],
  };
}
