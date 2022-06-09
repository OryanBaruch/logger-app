import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule, ErrorHandler } from '@angular/core';
import { GlobalErrorHandler } from './GlobarErrorHandler.service';
import { LoggerConfig } from './interface/Logger.interface';
import { LoggerInterceptor } from './logger.interceptor';
import { LOGGER_CONFIG } from './logger.service';



@NgModule({
  declarations: [
  ],
  imports: [
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: LoggerInterceptor, multi: true },
  ],
  exports: [
  ],

})
export class LoggerModule {

  static init(config: LoggerConfig): ModuleWithProviders<any> {
    return {
      ngModule: LoggerModule,
      providers: [
        { provide: LOGGER_CONFIG, useValue: config },
      ]
    }
  }
}
