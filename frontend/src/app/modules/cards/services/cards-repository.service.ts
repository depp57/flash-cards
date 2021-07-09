import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiImageResult, ApiResult, CardWithTheme, Theme } from '../../../shared/models/api-response';
import { API_ENDPOINT } from '../../../shared/constants';
import { CreateCard, ModifyTheme } from '../../../shared/models/api-request';
import { mergeMap } from 'rxjs/operators';
import { CardRow } from '../components/cards.component';

@Injectable({
  providedIn: 'root'
})
export class CardsRepositoryService {

  constructor(private http: HttpClient) {}

  getCards(): Observable<CardWithTheme[]> {
    return this.http.get<CardWithTheme[]>(API_ENDPOINT + 'cards', {
      params: {
        theme_name: true
      }
    });
  }

  async createCard(card: CreateCard): Promise<ApiResult> {
    const questionImage = card.question_image ?
      await this.uploadImage(card.question_image).toPromise() :
      null;

    const answerImage = card.answer_image ?
      await this.uploadImage(card.answer_image).toPromise() :
      null;

    return this.http.post<ApiResult>(API_ENDPOINT + 'cards', {
      card_theme: card.card_theme,
      question_text: card.question_text,
      question_image: questionImage?.path,
      answer_text: card.answer_text,
      answer_image: answerImage?.path
    }).toPromise();
  }

  deleteCard(id: number): Observable<ApiResult> {
    return this.http.delete<ApiResult>(API_ENDPOINT + 'cards/' + id);
  }

  async modifyCard(id: number, card: CreateCard): Promise<ApiResult> {
    const questionImage = card.question_image ?
      await this.uploadImage(card.question_image).toPromise() :
      null;

    const answerImage = card.answer_image ?
      await this.uploadImage(card.answer_image).toPromise() :
      null;

    return this.http.post<ApiResult>(API_ENDPOINT + 'cards/' + id, {
      card_theme: card.card_theme,
      question_text: card.question_text,
      question_image: questionImage?.path,
      answer_text: card.answer_text,
      answer_image: answerImage?.path
    }).toPromise();
  }

  private uploadImage(image: File): Observable<ApiImageResult> {
    const formData = new FormData();
    formData.append('image', image, image.name);

    return this.http.post<ApiImageResult>(API_ENDPOINT + 'images', formData);
  }
}
