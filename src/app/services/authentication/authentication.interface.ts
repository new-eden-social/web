import { DCharacterShort } from '../character/character.dto';

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
  character?: DCharacterShort,
  authenticated: boolean,
  data?: IAuthenticationResponse,
}
