import { ICharacter } from '../character/character.interface';
export interface IAuthenticationResponse {
  readonly accessToken: string;
  readonly tokenType: string;
  readonly expiresIn: string;
  readonly refreshToken: string;
}

export interface IAuthenticationState {
  character?: ICharacter,
  authenticated: boolean,
  data?: IAuthenticationResponse,
}
