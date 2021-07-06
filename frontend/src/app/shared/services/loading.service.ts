import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private readonly _isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public isLoading$(): Observable<boolean> {
    return this._isLoading$.pipe(
      // If the data arrives successfully earlier than in 300ms, no indicator should be shown
      switchMap(isLoading => isLoading ? of(true).pipe(delay(300)) : of(false))
    );
  }

  public set loading(isLoading: boolean) {
    this._isLoading$.next(isLoading);
  }
}
