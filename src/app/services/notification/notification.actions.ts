import { Action } from '@ngrx/store';
import { DNotification, DNotificationList } from './notification.dto';

export enum NotificationsActionTypes {
  SEEN_NOTIFICATION = '[Notification] Mark notification seen',
  SEEN_NOTIFICATION_SUCCESS = '[Notification] Mark notification seen success',
  LOAD = '[Notification] Load notifications',
  LOAD_SUCCESS = '[Notification] Load notifications success',
  NEW = '[Notification] New notification (websocket)',
}

export class Load implements Action {
  readonly type = NotificationsActionTypes.LOAD;

  constructor(public payload: { page: number, limit: number }) {
  }
}

export class LoadSuccess implements Action {
  readonly type = NotificationsActionTypes.LOAD_SUCCESS;

  constructor(public payload: DNotificationList) {
  }
}

export class SeenNotification implements Action {
  readonly type = NotificationsActionTypes.SEEN_NOTIFICATION;

  constructor(public payload: string) {
  }
}

export class SeenNotificationSuccess implements Action {
  readonly type = NotificationsActionTypes.SEEN_NOTIFICATION_SUCCESS;

  constructor(public payload: DNotification) {
  }
}


export class NewNotification implements Action {
  readonly type = NotificationsActionTypes.NEW;

  constructor(public payload: DNotification) {
  }
}

export type NotificationActionsUnion =
  Load
  | LoadSuccess
  | SeenNotification
  | SeenNotificationSuccess
  | NewNotification;
