
export interface Sentence {
  text: string;
  romaji: string;
  en: string;
}

export interface KanjiDef {
  id: string;
  character: string;
  onyomi: string[]; // Chinese reading
  kunyomi: string[]; // Japanese reading
  meaning: string[];
  strokes: number;
  level: string; // N5, N4, etc.
  example: string;
  category: string; // Acts as "Chapter"
  sentences: Sentence[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

export interface QuizQuestion {
  id: number;
  kanji: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

export enum ViewState {
  HOME = 'HOME',
  DETAIL = 'DETAIL',
  QUIZ = 'QUIZ',
  CHAT = 'CHAT',
  PAIRING = 'PAIRING'
}
