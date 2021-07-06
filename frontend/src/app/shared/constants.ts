export const API_ENDPOINT  = 'https://flash-cards.sachathommet.fr/api/';
export const API_IMAGE_SRC = `${API_ENDPOINT}uploaded_files/`;

// maximum card score : read API DOC at https://flash-cards.sachathommet.fr/api/doc/
export const MAX_CARD_SCORE = 6;

// number of cards to fetch per request
export const CARDS_PER_REQUEST = 10;

// number of cards remaining, before fetching new cards
export const CARDS_REMAINING_BEFORE_FETCH = 2;

// number of cards already played, before fetching new cards
export const CARDS_PLAYED_BEFORE_FETCH = CARDS_PER_REQUEST - CARDS_REMAINING_BEFORE_FETCH;
