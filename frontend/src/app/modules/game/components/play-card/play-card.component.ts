import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Card, Theme } from '../../../../shared/models/api-response';
import { BehaviorSubject } from 'rxjs';
import { CardsRepositoryService } from '../../services/cards-repository.service';
import {
  API_IMAGE_SRC,
  CARDS_PER_REQUEST,
  CARDS_PLAYED_BEFORE_FETCH, CARDS_REMAINING_BEFORE_FETCH, MAX_CARD_SCORE
} from '../../../../shared/constants';

@Component({
  selector: 'app-play-card',
  templateUrl: './play-card.component.html',
  styleUrls: ['./play-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayCardComponent implements OnInit {

  @Input() theme!: Theme;

  cards       = new BehaviorSubject<Card[]>([]);
  showAnswer  = false;
  activeIndex = 0;

  readonly API_IMAGE_SRC = API_IMAGE_SRC;

  constructor(private repository: CardsRepositoryService) {}

  ngOnInit(): void {
    // https://stackoverflow.com/questions/35042929/is-it-necessary-to-unsubscribe-from-observables-created-by-http-methods
    this.repository.getCards(this.theme, CARDS_PER_REQUEST).subscribe(
      cards => this.cards.next(cards)
    );
  }

  onToggleAnswer(): void {
    this.showAnswer = !this.showAnswer;
  }

  onSubmitCard(score: number): void {
    const card = this.cards.value[this.activeIndex];

    // update the active card's score
    const newScore = Math.max(0, Math.min(card.score + score, MAX_CARD_SCORE)); // clamp score between 0-score-MAX_SCORE
    this.repository.modifyCard(card, {card_score: newScore}).subscribe(
      result => { if (!result.success) alert(result.cause); }
    );

    // display the next card
    this.showAnswer = false;
    this.activeIndex++;

    // fetch new cards if necessary
    if (this.activeIndex === CARDS_PLAYED_BEFORE_FETCH) {
      this.repository.getCards(this.theme, CARDS_PLAYED_BEFORE_FETCH).subscribe(
        cardsFetched => {
          const remainingAndFetchedCards = this.cards.value.slice(-CARDS_REMAINING_BEFORE_FETCH).concat(cardsFetched);
          this.activeIndex               = 0;
          this.cards.next(remainingAndFetchedCards);
        }
      );
    }
  }
}
