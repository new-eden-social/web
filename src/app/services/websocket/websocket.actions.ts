import { Action } from '@ngrx/store';

export enum WebsocketActionTypes {
  CONNECT = '[Websocket] Try to establish connection',
  CONNECT_SUCCESS = '[Websocket] Successfully connected',
  CONNECT_ERROR = '[Websocket] Connection failed',
  CONNECT_TIMEOUT = '[Websocket] Connection timeout',
  DISCONNECTED = '[Websocket] Connection disconnected',
  AUTHENTICATE = '[Websocket] Authenticate websocket connection',
  AUTHENTICATE_SUCCESS = '[Websocket] Authenticate websocket connection success',
  AUTHENTICATE_FAIL = '[Websocket] Authenticate websocket connection failed',
  ERROR = '[Websocket] Error happened'
}

export class Connect implements Action {
  readonly type = WebsocketActionTypes.CONNECT;
}

export class ConnectSuccess implements Action {
  readonly type = WebsocketActionTypes.CONNECT_SUCCESS;
}

export class ConnectTimeout implements Action {
  readonly type = WebsocketActionTypes.CONNECT_TIMEOUT;
}

export class ConnectError implements Action {
  readonly type = WebsocketActionTypes.CONNECT_ERROR;
}

export class Disconnected implements Action {
  readonly type = WebsocketActionTypes.DISCONNECTED;
}

export class Authenticate implements Action {
  readonly type = WebsocketActionTypes.AUTHENTICATE;

  constructor(public payload: string) {
  }
}

export class AuthenticateSuccess implements Action {
  readonly type = WebsocketActionTypes.AUTHENTICATE_SUCCESS;
}

export class AuthenticateFailed implements Action {
  readonly type = WebsocketActionTypes.AUTHENTICATE_FAIL;
}

export class SocketError implements Action {
  readonly type = WebsocketActionTypes.ERROR;

  constructor(public payload: Error) {
  }
}

export type WebsocketActionsUnion =
  Authenticate
  | AuthenticateSuccess
  | AuthenticateFailed
  | Connect
  | ConnectSuccess
  | ConnectError
  | ConnectTimeout
  | Disconnected
  | SocketError;
