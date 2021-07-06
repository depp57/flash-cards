import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpCacheInterceptor implements HttpInterceptor {

  private cache = new Map<string, HttpResponse<unknown>>();

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Other requests than GET change the data in the server => invalidate cache
    if (req.method !== 'GET') {
      this.cache.clear();
      return next.handle(req);
    }

    const cachedData = this.cache.get(req.url);

    // Cache the data if it's not already cached
    return cachedData ? of(cachedData) : next.handle(req).pipe(
      tap(stateEvent => {
        if (stateEvent instanceof HttpResponse) {
          this.cache.set(req.url, stateEvent);
        }
      })
    );
  }
}
