import { Action } from '@ngrx/store';
import { DCharacterShort } from '../character/character.dto';
import { IAuthenticationResponse } from './authentication.interface';

export enum AuthenticationActionTypes {
  AUTHENTICATE = '[Authentication] Authenticating User',
  UN_AUTHENTICATE = '[Authentication] UnAuthenticating User',
  AUTHENTICATE_SUCCESS = '[Authentication] User successfully authenticated',
  AUTHENTICATE_CALLBACK = '[Authentication] Callback from authentication request',
  AUTHENTICATE_CHECK = '[Authentication] Check if user is still authenticated',
}

export class Authenticate implements Action {
  readonly type = AuthenticationActionTypes.AUTHENTICATE;
}

export class AuthenticateSuccess implements Action {
  readonly type = AuthenticationActionTypes.AUTHENTICATE_SUCCESS;

  constructor(public payload: DCharacterShort) {
  }
}

export class AuthenticateCallback implements Action {
  readonly type = AuthenticationActionTypes.AUTHENTICATE_CALLBACK;

  constructor(public payload: IAuthenticationResponse) {
  }
}

export class UnAuthenticate implements Action {
  readonly type = AuthenticationActionTypes.UN_AUTHENTICATE;
}

export class AuthenticateCheck implements Action {
  readonly type = AuthenticationActionTypes.AUTHENTICATE_CHECK;
}

export type AuthenticationActionsUnion =
  Authenticate |
  AuthenticateSuccess |
  UnAuthenticate |
  AuthenticateCheck |
  AuthenticateCallback;
