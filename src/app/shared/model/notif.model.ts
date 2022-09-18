import { InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface NotifConfig {
  type: MessageType;
  duration: number;
}
export const NOTIF_DATA = new InjectionToken<{
  message: string;
  type: MessageType;
}>('NOTIF_DATA');
export const LANGUAGE = new InjectionToken<BehaviorSubject<string>>('LANGUAGE');
export type MessageType = 'success' | 'info' | 'error' | 'warning';

export interface NotifData extends NotifConfig {
  message: string;
}
