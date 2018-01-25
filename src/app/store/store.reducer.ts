import { combineReducers } from 'redux';
import { composeReducers, defaultFormReducer } from '@angular-redux/form';
import { routerReducer } from '@angular-redux/router';
import { authenticationReducer } from '../services/authentication/authentication.reducer';
import { searchReducer } from '../services/search/search.reducer';
import { characterReducer } from '../services/character/character.reducer';
import { postReducer } from '../services/post/post.reducer';
import { corporationReducer } from '../services/corporation/corporation.reducer';
import { allianceReducer } from '../services/alliance/alliance.reducer';


// Define the global store shape by combining our application's
// reducers together into a given structure.
export const rootReducer = composeReducers(
  defaultFormReducer(),
  combineReducers({
    authentication: authenticationReducer,
    router: routerReducer,
    search: searchReducer,
    character: characterReducer,
    corporation: corporationReducer,
    alliance: allianceReducer,
    post: postReducer,
  }));
