import { IAuthenticationState } from '../services/authentication/authentication.interface';
import { ICharacterState } from '../services/character/character.interface';
import { ISearchState } from '../services/search/search.interface';
import { ICommentState } from '../services/comment/comment.interface';
import { IPostState } from '../services/post/post.interface';
import { ICorporationState } from '../services/corporation/corporation.interface';
import { IAllianceState } from '../services/alliance/alliance.interface';

export interface IAppState {
  authentication?: IAuthenticationState,
  search?: ISearchState,
  character?: ICharacterState,
  corporation?: ICorporationState,
  alliance?: IAllianceState,
  comment?: ICommentState,
  post?: IPostState,
}
