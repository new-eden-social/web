import { IAuthenticationState } from '../services/authentication/authentication.interface';
import { ISearchState } from '../services/search/search.interface';
import { ICharacterState } from '../services/character/character.interface';

export interface IAppState {
  authentication?: IAuthenticationState,
  search?: ISearchState,
  character?: ICharacterState,
}
