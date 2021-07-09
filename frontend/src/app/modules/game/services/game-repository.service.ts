import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResult, Card, Theme } from '../../../shared/models/api-response';
import { API_ENDPOINT } from '../../../shared/constants';
import { ModifyCard } from '../../../shared/models/api-request';

@Injectable({
  providedIn: 'root'
})
export class GameRepositoryService {

  constructor(private http: HttpClient) {}

  getThemes(): Observable<Theme[]> {
    return this.http.get<Theme[]>(API_ENDPOINT + 'themes');
  }

  getCards(theme: Theme, count: number): Observable<Card[]> {
    return this.http.get<Card[]>(`${API_ENDPOINT}cards/${theme.id}/${count}`);
  }
  
  modifyCard(card: Card, modification: ModifyCard): Observable<ApiResult> {
    return this.http.post<ApiResult>(`${API_ENDPOINT}cards/${card.id}`, modification);
  }
}
