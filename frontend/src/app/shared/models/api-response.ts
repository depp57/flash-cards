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

export interface CardWithTheme extends Card {
  readonly theme: Theme;
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

export interface ApiResult {
  readonly success: boolean;
  readonly cause: string | null;
}

export interface ApiImageResult {
  readonly success: boolean;
  readonly path: string | null;
  readonly cause: string | null;
}
