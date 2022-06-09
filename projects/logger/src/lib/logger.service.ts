import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector, Optional, InjectionToken, Inject } from '@angular/core';
import { switchMap } from 'rxjs';
import { bufferTime } from 'rxjs';
import { Log, LoggerConfig } from './interface/Logger.interface';
import { isDevMode } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export const LOGGER_CONFIG = new InjectionToken<LoggerConfig>('Logger')
export enum Flush {
  Flush = 1
}

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  constructor(
    public injector: Injector,
    @Optional() @Inject(LOGGER_CONFIG)
    public config: LoggerConfig) {
    this.initLogs(config)
  }

  public initLogs(config: LoggerConfig) {
    if (!isDevMode()) {
      this.logs$.pipe(
        switchMap(val => val),
        bufferTime(config.bufferTime)).subscribe(logs => {
          if (!!logs) {
            if (this.config.target.includes('console')) {
              this.getServerErrorMessage(logs);
            }
            if (this.config.target.includes('localStorage')) {
              this.saveToStorage(logs)
            }
            this.flushLogs()
          }
        });
    }
  }

  public message: string = '';
  public logs: Log[] = []
  public logs$: BehaviorSubject<Log[]> = new BehaviorSubject<Log[]>([]);

  public flushQueue() {
    this.logs$.next([])
  }


  getClientErrorMessage(error: Error) {

    this.saveNoneHttpError(error.message)
    this.message = error.message ?
      error.message :
      error.toString();
    console.log(this.message);
  }

  getServerErrorMessage(logs: Log[]): void {
    console.log(logs);
    // console.trace()
  }

  public handleError(error, msg: string) {
    let date = new Date().toISOString().slice(11, 22);

    if (error instanceof HttpErrorResponse) {

      const logQueue = [...this.logs$.value];
      console.log({ logQueue, date });

      logQueue.push({ error, message: msg })
      this.logs$.next(logQueue)

    }
    else if (error instanceof Error) {
      this.getClientErrorMessage(error);
    } else if (error as any instanceof TypeError) {
      console.error(date, 'There was a general error.', error);
    }

  }

  public saveNoneHttpError(msg) {
    JSON.stringify(localStorage.setItem('error', msg))
  }


  public saveToStorage(log: Log | Log[]) {
    localStorage.setItem('log', JSON.stringify(
      {
        log: log,
        creationDate: new Date().toISOString()
      }
    ))

    const parsedData = JSON.parse(JSON.stringify(localStorage.getItem('log')))
    this.logs.push(JSON.parse(parsedData))
    this.logs$.next(parsedData)

    this.saveToStorageHandler(this.logs)

  }

  public flushLogs() {
    this.logs$.next([])
  }

  public saveToStorageHandler(log: Log[]) {
    localStorage.setItem('log', JSON.stringify(log))
  }


}

