export interface Question {
  id: number;
  category: string;
  difficulty: 1 | 2 | 3;
  question: string;
  choices: string[];
  answer: number; // 0-3のインデックス
  explanation: string;
}

export type GamePhase = 'start' | 'playing' | 'result';

export interface QuizState {
  phase: GamePhase;
  questions: Question[];
  currentIndex: number;
  score: number;
  selectedAnswer: number | null;
  showExplanation: boolean;
  answers: { questionId: number; correct: boolean }[];
}
