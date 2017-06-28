import { IAuthenticationState } from '../services/authentication/authentication.interface';

export interface IAppState {
  authentication?: IAuthenticationState
}
