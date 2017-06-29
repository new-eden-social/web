import { Reducer } from 'redux';
import { ISearchState } from './search.interface';
import { SearchTypes } from './search.types';

const INITIAL_STATE: ISearchState = {
  data: {
    characters: [],
    corporations: [],
    alliances: [],
  },
};

export const searchReducer: Reducer<ISearchState> = (state: ISearchState = INITIAL_STATE, action: any): ISearchState => {
  switch (action.type) {
    case SearchTypes.SEARCH:
      return Object.assign({}, state, {
        data: action.payload,
      });
    case SearchTypes.CLEAR:
      return Object.assign({}, state, {
        data: INITIAL_STATE.data,
      });
  }
  return state;
};
