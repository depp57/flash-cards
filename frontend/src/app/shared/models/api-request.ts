export interface CreateCard {
  readonly card_theme: number;
  readonly question_text?: string;
  readonly question_image?: File;
  readonly answer_text?: string;
  readonly answer_image?: File;
}

export interface ModifyCard {
  readonly card_theme?: number;
  readonly card_score?: number;
  readonly question_text?: string;
  readonly question_image?: string;
  readonly answer_text?: string;
  readonly answer_image?: string;
}

export interface CreateTheme {
  readonly theme_name?: string;
  readonly theme_image?: File;
}

export interface ModifyTheme {
  readonly theme_name?: string;
  readonly theme_image?: File;
}
