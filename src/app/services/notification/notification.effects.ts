import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material';
import { Actions, Effect, ofType, } from '@ngrx/effects';
import { IAppState } from '../../app.store';
import { fromEvent } from 'rxjs/index';
import { NOTIFICATION_MESSAGES, WS_NOTIFICATION_EVENT } from './notification.constant';
import {
  Load, LoadSuccess, NewNotification,
  NotificationsActionTypes, SeenNotification, SeenNotificationSuccess,
} from './notification.actions';
import { filter, map, mergeMap } from 'rxjs/internal/operators';
import { WebsocketEffects } from '../websocket/websocket.effects';
import { Observable } from 'rxjs/Rx';
import { DNotification, DNotificationList } from './notification.dto';
import { ApiService } from '../api.service';

@Injectable()
export class NotificationEffects {

  private uri = 'notifications';

  @Effect()
  load$: Observable<LoadSuccess> = this.actions$.pipe(
    ofType<Load>(NotificationsActionTypes.LOAD),
    mergeMap(({ payload }) =>
      this.apiService.request<DNotificationList>(
        'GET',
        `${this.uri}/latest?page=${payload.page}&limit=${payload.limit}`).pipe(
        map(data => new LoadSuccess(data)),
      ),
    ),
  );

  @Effect()
  seenNotification$: Observable<SeenNotificationSuccess> = this.actions$.pipe(
    ofType<SeenNotification>(NotificationsActionTypes.SEEN_NOTIFICATION),
    mergeMap(({ payload }) =>
      this.apiService.request<DNotification>(
        'POST',
        `${this.uri}/${payload}/seen`).pipe(
        map(data => new SeenNotificationSuccess(data)),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private store: Store<IAppState>,
    private snackBar: MatSnackBar,
    private websocketEffects: WebsocketEffects,
    private apiService: ApiService,
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
      fromEvent<DNotification>(this.websocketEffects.socket, WS_NOTIFICATION_EVENT)
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
