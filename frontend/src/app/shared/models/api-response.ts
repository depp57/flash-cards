export interface Theme {
  readonly id: number;
  readonly name: string;
  readonly image: string | null;
}

export interface Card {
  readonly id: number;
  readonly score: number;
  readonly question: Question;
}

export interface Question {
  readonly text: string | null;
  readonly image: string | null;
  readonly answer: Answer;
}

export interface Answer {
  readonly text: string | null;
  readonly image: string | null;
}

export interface CardModification {
  readonly card_theme?: number;
  readonly card_score?: number;
  readonly question_text?: string;
  readonly question_image?: string;
  readonly answer_text?: string;
  readonly answer_image?: string;
}

export interface ApiResult {
  readonly success: boolean;
  readonly cause: string | null;
}
