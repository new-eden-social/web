import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Rx';
import {
  Authenticate, AuthenticateFailed, AuthenticateSuccess,
  Connect, ConnectError, ConnectSuccess, ConnectTimeout, Disconnected, SocketError,
  WebsocketActionTypes,
} from './websocket.actions';
import { IAppState } from '../../app.store';
import { select, Store } from '@ngrx/store';
import { filter, map, mergeMap } from 'rxjs/internal/operators';
import { environment } from '../../../environments/environment';
import { WS_EVENT_AUTHENTICATION } from './websocket.constants';
import * as io from 'socket.io-client';
import { fromEvent, of, race } from 'rxjs/index';
import { DWebsocketAuthentication } from './websocket.dto';
import { IAuthenticationResponse, IWebsocketException } from './websocket.interface';
import { MatSnackBar } from '@angular/material';

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
