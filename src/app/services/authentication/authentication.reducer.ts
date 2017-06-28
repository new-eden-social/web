import { Reducer } from 'redux';
import { AuthenticationService } from './authentication.service';
import { IAuthenticationState } from './authentication.interface';

const INITIAL_STATE = {
  authenticated: false,
};

// Basic reducer logic.
export const authenticationReducer: Reducer<IAuthenticationState> = (state: IAuthenticationState = INITIAL_STATE, action: any): IAuthenticationState => {
  switch (action.type) {
    case AuthenticationService.AUTHENTICATED:
      return Object.assign({}, state, {
        character: action.payload,
        authenticated: true,
      });
    case AuthenticationService.REDIRECTED:
      return Object.assign({}, state, {
        data: action.payload,
      });
  }
  return state;
};
