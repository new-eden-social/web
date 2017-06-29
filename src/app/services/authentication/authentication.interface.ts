import { ICharacter } from '../character/character.interface';

export interface IAuthenticationResponse {
  readonly accessToken: string;
  readonly tokenType: string;
  readonly expiresIn: string;
  readonly refreshToken: string;
}

export interface IRefreshResponse {
  readonly access_token: string;
  readonly token_type: string;
  readonly expires_in: string;
  readonly refresh_token: string;
}

export interface IAuthenticationState {
  character?: ICharacter,
  authenticated: boolean,
  data?: IAuthenticationResponse,
}
