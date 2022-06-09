import { HttpErrorResponse } from "@angular/common/http";

export interface LoggerConfig {
  appName: string;
  bufferTime?: number;
  target: targetType[]
}

export type LogType = 'Error' | 'Warning' | 'Information';
export type targetType = 'console' | 'localStorage';

export interface Log {
  headers?: Headers
  lazyUpdate?: any
  normalizedNames?: NormalizedNames
  creationDate?: string
  error?: Error | HttpErrorResponse | TypeError
  message?: string
  name?: string
  ok?: boolean
  status?: number
  statusText?: string
  url?: string
}

export interface Headers {
  normalizedNames: NormalizedNames
  lazyUpdate: any
}

export interface NormalizedNames { }
