import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Rx';
import {
  Authenticate, AuthenticateFailed, AuthenticateSuccess,
  Connect, ConnectError, ConnectSuccess, ConnectTimeout, Disconnected, SocketError,
  WebsocketActionTypes,
} from './websocket.actions';
import { IAppState } from '../../store/store.reducer';
import { Store } from '@ngrx/store';
import { mergeMap, take, tap } from 'rxjs/internal/operators';
import { environment } from '../../../environments/environment';
import { WS_EVENT_AUTHENTICATION } from './websocket.constants';
import * as io from 'socket.io-client';
import { fromEvent, of, race } from 'rxjs/index';
import { DWebsocketAuthentication } from './websocket.dto';
import { IAuthenticationResponse } from './websocket.interface';

@Injectable()
export class WebsocketEffects {

  private socket: SocketIOClient.Socket;
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
      this.socket = io(environment.apiEndpoint);

      // Listen for status events
      fromEvent(this.socket, 'disconnect')
      .subscribe(event => this.store.dispatch(new Disconnected()));
      fromEvent<Error>(this.socket, 'error')
      .subscribe(event => this.store.dispatch(new SocketError(event)));

      // Listen for connect events
      return race(
        fromEvent<string>(this.socket, 'connect'),
        fromEvent<string>(this.socket, 'connect_timeout'),
        fromEvent<string>(this.socket, 'connect_error'),
      ).pipe(mergeMap(event => {
        if (!event) return of(new ConnectSuccess());
        // We stop socket (we don't wan't any auto retries...)
        this.socket.close();
        if (event === 'timeout') return of(new ConnectTimeout());
        return of(new ConnectError());
      }));
    }),
  );
  @Effect()
  authenticate$: Observable<AuthenticateSuccess> = this.actions$.pipe(
    ofType<Authenticate>(WebsocketActionTypes.AUTHENTICATE),
    mergeMap(action => {
      this.socket.emit(WS_EVENT_AUTHENTICATION, new DWebsocketAuthentication(action.payload));
      // Wait
      return fromEvent<IAuthenticationResponse>(this.socket, WS_EVENT_AUTHENTICATION).pipe(
        mergeMap(event => {
          if (event.success) return of(new AuthenticateSuccess());
          return of(new AuthenticateFailed());
        }));
    }),
  );

  constructor(
    protected actions$: Actions,
    protected store: Store<IAppState>,
  ) {
  }

}
