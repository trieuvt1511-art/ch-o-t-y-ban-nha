export type Level = 'Beginner' | 'Elementary' | 'Intermediate';
export type Difficulty = 'Dễ' | 'Trung bình' | 'Khó';
export type Category = 'Ẩm thực' | 'Du lịch' | 'Mua sắm' | 'Công việc' | 'Xã hội';

export interface Profile {
  id: string;
  name: string;
  emoji: string;
  level: Level;
  wordsLearned: number;
  scenariosCompleted: number;
  streak: number;
  lastActiveDate: string;
  weeklyXP: number;
  learnedWords: string[]; // word IDs
  reviewCards: ReviewCard[];
}

export interface ReviewCard {
  wordId: string;
  scenarioId: string;
  easeFactor: number;
  interval: number;
  repetitions: number;
  nextReview: string; // ISO date
}

export interface VocabWord {
  id: string;
  spanish: string;
  vietnamese: string;
  phonetic: string;
  example: string;
  exampleVi: string;
}

export interface ChatMessage {
  role: 'user' | 'ai' | 'system';
  spanish: string;
  vietnamese?: string;
  tip?: string;
  suggestions?: string[];
}

export interface Scenario {
  id: string;
  category: Category;
  categoryEmoji: string;
  title: string;
  difficulty: Difficulty;
  xp: number;
  vocabulary: VocabWord[];
  conversation: ChatMessage[];
}
