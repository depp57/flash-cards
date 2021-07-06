import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResult, Card, CardModification, Theme } from '../../../shared/models/api-response';
import { API_ENDPOINT } from '../../../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class CardsRepositoryService {

  constructor(private http: HttpClient) {}

  getThemes(): Observable<Theme[]> {
    return this.http.get<Theme[]>(API_ENDPOINT + 'themes');
  }

  getCards(theme: Theme, count: number): Observable<Card[]> {
    return this.http.get<Card[]>(`${API_ENDPOINT}cards/${theme.id}/${count}`);
  }
  
  modifyCard(card: Card, modification: CardModification): Observable<ApiResult> {
    return this.http.post<ApiResult>(`${API_ENDPOINT}cards/${card.id}`, modification);
  }
}
