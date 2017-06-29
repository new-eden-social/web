import { Reducer } from 'redux';
import { AuthenticationTypes } from './authentication.types';
import { IAuthenticationState } from './authentication.interface';

const INITIAL_STATE = {
  authenticated: false,
};

// Basic reducer logic.
export const authenticationReducer: Reducer<IAuthenticationState> = (state: IAuthenticationState = INITIAL_STATE, action: any): IAuthenticationState => {
  switch (action.type) {
    case AuthenticationTypes.AUTHENTICATED:
      return Object.assign({}, state, {
        character: action.payload,
        authenticated: true,
      });
    case AuthenticationTypes.REDIRECTED:
      return Object.assign({}, state, {
        data: action.payload,
      });
    case AuthenticationTypes.UN_AUTHENTICATE:
      return Object.assign({}, state, {
        data: undefined,
        character: undefined,
        authenticated: false,
      });
    case AuthenticationTypes.REFRESH_TOKEN:
      return Object.assign({}, state, {
        data: action.payload,
      });
  }
  return state;
};
