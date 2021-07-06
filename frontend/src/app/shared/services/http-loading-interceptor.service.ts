import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class HttpLoadingInterceptor implements HttpInterceptor {

  constructor(private loader: LoadingService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loader.loading = true;
    return next.handle(req).pipe(
      finalize(
        () => this.loader.loading = false
      )
    );
  }
}
