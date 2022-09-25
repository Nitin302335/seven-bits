import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router
    ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    });
    return next.handle(request)
      .pipe(
        retry(0),
        catchError((error: HttpErrorResponse) => {
          if (error && error.error && error.error.message === 'Unauthorized'
            && error.error.statusCode === 401) {
            this.authService.doLogout();
            this.router.navigate(['/', 'login']);
          }
          return throwError(() => error);
        }),
      );
  }
}
