import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable()
export class GlobalHttpErrorHandlerInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retry({
        count: 3,
        delay: 1000,
      }),
      catchError((err) => {
        return throwError(() => {
          console.log('ERROR: I am from GLobal HTTP error handler');
          return err;
        });
      })
    );
  }
}
