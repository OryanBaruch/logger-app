import { HttpClientModule, } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoggerConfig } from 'projects/logger/src/lib/interface/Logger.interface';
import { LoggerModule } from 'projects/logger/src/public-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


// Better to type loggerInterFace
export const config: LoggerConfig = {
  appName: 'Oryan Loggers',
  bufferTime: 3000,
  target: ['console', 'localStorage']
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LoggerModule.init(config),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})

export class AppModule {

}
