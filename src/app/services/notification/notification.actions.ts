import { Action } from '@ngrx/store';
import { INotificationResponse } from './notification.interface';

export enum NotificationsActionTypes {
  SEEN_NOTIFICATION = '[Notification] Mark notification seen',
  LOAD = '[Notification] Load notifications',
  LOAD_SUCCESS = '[Notification] Load notifications success',
  NEW = '[Notification] New notification (websocket)',
}

export class Load implements Action {
  readonly type = NotificationsActionTypes.LOAD;
}

export class LoadSuccess implements Action {
  readonly type = NotificationsActionTypes.LOAD_SUCCESS;
}

export class SeenNotification implements Action {
  readonly type = NotificationsActionTypes.SEEN_NOTIFICATION;

  constructor(public payload: string) {
  }
}

export class NewNotification implements Action {
  readonly type = NotificationsActionTypes.NEW;

  constructor(public payload: INotificationResponse) {
  }
}

export type NotificationActionsUnion =
  Load
  | LoadSuccess
  | SeenNotification
  | NewNotification;
