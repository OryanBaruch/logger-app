import { ErrorHandler, Injectable, Injector, isDevMode } from '@angular/core';
import { LoggerService } from './logger.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) { }


  handleError(error: Error) {
    const logger = this.injector.get(LoggerService);
    if (error instanceof Error) {
      if (!isDevMode()) {
        logger.handleError(error, error.message);
      }
    }
  }

}
