import { IAuthenticationState } from '../services/authentication/authentication.interface';
import { ICharacterState } from '../services/character/character.interface';
import { ISearchState } from '../services/search/search.interface';

export interface IAppState {
  authentication?: IAuthenticationState,
  search?: ISearchState,
  character?: ICharacterState,
}
