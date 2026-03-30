export type Level = 'Beginner' | 'Elementary' | 'Intermediate';
export type Difficulty = 'Dễ' | 'Trung bình' | 'Khó';
export type Category = 'Mua sắm' | 'Ẩm thực' | 'Gia đình' | 'Di chuyển' | 'Công việc' | 'Sức khỏe' | 'Xã hội' | 'Công nghệ';

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
  learnedWords: string[];
  reviewCards: ReviewCard[];
}

export interface ReviewCard {
  wordId: string;
  scenarioId: string;
  easeFactor: number;
  interval: number;
  repetitions: number;
  nextReview: string;
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
  culturalTip?: string;
  vocabulary: VocabWord[];
  conversation: ChatMessage[];
}
