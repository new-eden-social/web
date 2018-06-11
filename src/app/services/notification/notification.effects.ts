import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material';
import { Actions, } from '@ngrx/effects';
import { IAppState } from '../../app.store';
import { fromEvent } from 'rxjs/index';
import { NOTIFICATION_MESSAGES, WS_NOTIFICATION_EVENT } from './notification.constant';
import { INotificationResponse } from './notification.interface';
import { NewNotification } from './notification.actions';
import { filter } from 'rxjs/internal/operators';
import { WebsocketEffects } from '../websocket/websocket.effects';

@Injectable()
export class NotificationEffects {

  constructor(
    private actions$: Actions,
    private store: Store<IAppState>,
    private snackBar: MatSnackBar,
    private websocketEffects: WebsocketEffects,
  ) {
    this.listenForNotifications();
  }

  private listenForNotifications() {
    // Wait until we are authenticated to subscribe on notifications events
    this.store.pipe(
      select('websocket', 'authenticated'),
      filter(authenticated => authenticated),
    )
    .subscribe(authenticated => {
      fromEvent<INotificationResponse>(this.websocketEffects.socket, WS_NOTIFICATION_EVENT)
      .subscribe(notification => {
        this.showSnackBar(NOTIFICATION_MESSAGES[notification.type](notification.id));
        this.store.dispatch(new NewNotification(notification));
      });
    });
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, null, { duration: 2500 });
  }

}
