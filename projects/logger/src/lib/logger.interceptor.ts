import { Injectable, isDevMode } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoggerService } from './logger.service';

// Standalone

@Injectable()
export class LoggerInterceptor implements HttpInterceptor {
  constructor(
    public loggerService: LoggerService,
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        tap(null, (error: HttpErrorResponse) => {
          if (!isDevMode()) {
            this.loggerService.handleError(error, error.message)
          }
        }));
  }
}

// cd distinctmpm version npm login

