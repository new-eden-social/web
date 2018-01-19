import { Reducer } from 'redux';
import { SearchTypes } from './search.types';
import { DSearch } from './search.dto';
import { ISearchState } from './search.interface';

const INITIAL_STATE: ISearchState = {
  data: {
    characters  : [],
    corporations: [],
    alliances   : [],
  },
};

export const searchReducer: Reducer<ISearchState> = (
  state: ISearchState = INITIAL_STATE,
  action: any,
): ISearchState => {
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
