import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { authenticationReducer } from '../services/authentication/authentication.reducer';
import { searchReducer } from '../services/search/search.reducer';
import { characterReducer } from '../services/character/character.reducer';
import { postReducer } from '../services/post/post.reducer';
import { corporationReducer } from '../services/corporation/corporation.reducer';
import { allianceReducer } from '../services/alliance/alliance.reducer';
import { commentReducer } from '../services/comment/comment.reducer';
import { IAuthenticationState } from '../services/authentication/authentication.interface';
import { ICommentState } from '../services/comment/comment.interface';
import { IPostState } from '../services/post/post.interface';
import { ICorporationState } from '../services/corporation/corporation.interface';
import { ISearchState } from '../services/search/search.interface';
import { ICharacterState } from '../services/character/character.interface';
import { IAllianceState } from '../services/alliance/alliance.interface';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { localStorageSync } from 'ngrx-store-localstorage';

export interface IAppState {
  authentication?: IAuthenticationState,
  search?: ISearchState,
  character?: ICharacterState,
  corporation?: ICorporationState,
  alliance?: IAllianceState,
  comment?: ICommentState,
  post?: IPostState,
  router?: RouterReducerState,
}

export const metaReducers: Array<MetaReducer<any, any>> = [
  (reducer: ActionReducer<any>): ActionReducer<any> => {
    return localStorageSync({
      // Only store authentication and router
      keys: ['authentication', 'router'],
    })(reducer);
  },
];

// Define the global store shape by combining our application's
// reducers together into a given structure.
export const reducers: ActionReducerMap<IAppState> = {
  authentication: authenticationReducer,
  router: routerReducer,
  search: searchReducer,
  character: characterReducer,
  corporation: corporationReducer,
  alliance: allianceReducer,
  post: postReducer,
  comment: commentReducer,
};
