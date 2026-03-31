// XP Values
export const XP = {
  FLASHCARD_CORRECT: 10,
  SCENARIO_COMPLETE: 25,
  LISTENING_EXERCISE: 20,
  GRAMMAR_LESSON: 15,
  FAMILY_PHRASE: 15,
  DUEL_WIN: 50,
  QUEST_COMPLETE: 100,
} as const;

// Levels
export const LEVELS = [
  { key: 'principiante', badge: '🐣', label: 'Principiante', min: 0, max: 500 },
  { key: 'basico', badge: '🌱', label: 'Básico', min: 501, max: 1500 },
  { key: 'intermedio', badge: '🌿', label: 'Intermedio', min: 1501, max: 3000 },
  { key: 'avanzado', badge: '🌳', label: 'Avanzado', min: 3001, max: 6000 },
  { key: 'experto', badge: '⭐', label: 'Experto', min: 6001, max: Infinity },
] as const;

export function getLevel(totalXP: number) {
  return LEVELS.find(l => totalXP >= l.min && totalXP <= l.max) || LEVELS[0];
}

// Achievement Badges
export interface Achievement {
  id: string;
  emoji: string;
  name: string;
  description: string;
  check: (stats: ProfileStats) => boolean;
}

export interface ProfileStats {
  scenariosCompleted: number;
  wordsLearned: number;
  streak: number;
  duelsWon: number;
  familyAllActive: boolean;
  voiceNotes: number;
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first_lesson', emoji: '🎯', name: 'Cú Đầu Tiên', description: 'Hoàn thành bài học đầu tiên', check: s => s.scenariosCompleted >= 1 },
  { id: 'scholar', emoji: '📚', name: 'Học Giả', description: 'Học 100 từ', check: s => s.wordsLearned >= 100 },
  { id: 'persistent', emoji: '🔥', name: 'Bền Bỉ', description: 'Streak 7 ngày liên tục', check: s => s.streak >= 7 },
  { id: 'warrior', emoji: '⚔️', name: 'Chiến Binh', description: 'Thắng 5 trận đấu', check: s => s.duelsWon >= 5 },
  { id: 'family_first', emoji: '👨‍👩‍👧', name: 'Gia Đình Số 1', description: 'Cả nhà cùng học 1 tuần', check: s => s.familyAllActive },
  { id: 'singer', emoji: '🎤', name: 'Giọng Ca', description: 'Đăng 10 bài Voice', check: s => s.voiceNotes >= 10 },
];

export function getUnlockedBadges(stats: ProfileStats): Achievement[] {
  return ACHIEVEMENTS.filter(a => a.check(stats));
}
