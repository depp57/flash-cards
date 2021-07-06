import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  public readonly titre$ = new BehaviorSubject<string>('Flashcards');
}
