import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Rx';
import {
  AuthenticateFailed, AuthenticateSuccess,
  Connect, ConnectError, ConnectSuccess, ConnectTimeout, Disconnected, SocketError, SubscribeFail,
  SubscribeSuccess,
  SubscribeToLatestWall,
  WebsocketActionTypes,
} from './websocket.actions';
import { IAppState } from '../../app.store';
import { select, Store } from '@ngrx/store';
import { concatMap, filter, map, mergeMap } from 'rxjs/internal/operators';
import { environment } from '../../../environments/environment';
import {
  WS_EVENT_AUTHENTICATION, WS_EVENT_SUBSCRIPTION, WS_NEW_SUBSCRIPTION_EVENT, WS_SUBSCRIBE_EVENTS,
  WS_SUBSCRIPTIONS,
} from './websocket.constants';
import * as io from 'socket.io-client';
import { fromEvent, race } from 'rxjs/index';
import {
  DWebsocketAuthentication,
  DWebsocketSubscribeToLatestWall,
} from './websocket.dto';
import {
  DWsNewSubscriptionEvent,
  IAuthenticationResponse, ISubscriptionResponse,
  IWebsocketException,
} from './websocket.interface';
import { MatSnackBar } from '@angular/material';
import { DPost } from '../post/post.dto';
import { NewPost } from '../post/post.actions';

@Injectable()
export class WebsocketEffects {

  public socket: SocketIOClient.Socket;
  @Effect()
  connect$: Observable<ConnectSuccess | ConnectTimeout | ConnectError> = this.actions$.pipe(
    ofType<Connect>(WebsocketActionTypes.CONNECT),
    mergeMap(action => {
      // If previous connection exists, clean it
      if (this.socket) {
        this.socket.removeAllListeners();
        this.socket.disconnect();
      }
      // If socket doesn't exist yet, create new one
      // and add some utility listeners
      this.socket = io((<any>environment).apiEndpoint);

      // Listen for status events
      fromEvent(this.socket, 'disconnect')
      .subscribe(event => this.store.dispatch(new Disconnected()));
      fromEvent<Error>(this.socket, 'error')
      .subscribe(event => this.store.dispatch(new SocketError(event)));

      fromEvent<IWebsocketException>(this.socket, 'exception')
      .subscribe(event => this.showSnackBar(event.status + ' - ' + event.message));

      // Listen for connect events
      return race(
        fromEvent<string>(this.socket, 'connect'),
        fromEvent<string>(this.socket, 'connect_timeout'),
        fromEvent<string>(this.socket, 'connect_error'),
      ).pipe(map(event => {
        if (!event) {
          this.showSnackBar('Websocket connected');
          return new ConnectSuccess();
        }
        if (event === 'timeout') return new ConnectTimeout();
        return new ConnectError();
      }));
    }),
  );

  @Effect()
  authenticate$: Observable<AuthenticateSuccess | AuthenticateFailed> = this.actions$.pipe(
    ofType<ConnectSuccess>(WebsocketActionTypes.CONNECT_SUCCESS),
    mergeMap(action => this.store.pipe(
      select('authentication', 'data', 'accessToken'),
      mergeMap(accessToken => {
        this.socket.emit(WS_EVENT_AUTHENTICATION, new DWebsocketAuthentication(accessToken));
        // Wait for response
        return fromEvent<IAuthenticationResponse>(this.socket, WS_EVENT_AUTHENTICATION).pipe(
          map(event => {
            if (event.success) {
              this.showSnackBar('Websocket Authentication Success');
              return new AuthenticateSuccess();
            }
            this.showSnackBar('Websocket Authentication Failed');
            return new AuthenticateFailed();
          }));
      }),
    )),
  );

  @Effect()
  subscribeToLatestWall$: Observable<SubscribeSuccess | SubscribeFail> = this.actions$.pipe(
    ofType<SubscribeToLatestWall>(WebsocketActionTypes.SUBSCRIBE_TO_LATEST_WALL),
    concatMap(action => {
      this.socket.emit(
        WS_SUBSCRIBE_EVENTS.TO_LATEST_WALL,
        new DWebsocketSubscribeToLatestWall());
      // Wait for response
      return fromEvent<ISubscriptionResponse>(this.socket, WS_EVENT_SUBSCRIPTION).pipe(
        map(event => {
          if (event.success) {
            this.showSnackBar('Subscription Success');

            fromEvent<DWsNewSubscriptionEvent<DPost>>(this.socket, WS_NEW_SUBSCRIPTION_EVENT)
            .pipe(
              filter(event => event.subscription === WS_SUBSCRIPTIONS.TO_LATEST_WALL),
            ).subscribe(event => {
              this.store.dispatch(new NewPost({ post: event.payload, key: 'latest' }));
            });

            return new SubscribeSuccess();
          }
          this.showSnackBar('Subscription Failed: ' + event.message);
          return new SubscribeFail();
        }));
    }),
  );

  constructor(
    private actions$: Actions,
    private store: Store<IAppState>,
    private snackBar: MatSnackBar,
  ) {
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, null, { duration: 2500 });
  }

}
