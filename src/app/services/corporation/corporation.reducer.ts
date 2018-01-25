import { Reducer } from 'redux';
import { ICorporationState } from './corporation.interface';
import { CorporationTypes } from './corporaiton.types';

const INITIAL_STATE: ICorporationState = {};

export const corporationReducer: Reducer<ICorporationState> = (
  state: ICorporationState = INITIAL_STATE,
  action: any,
): ICorporationState => {
  switch (action.type) {
    case CorporationTypes.LOAD:
      return Object.assign({}, state, {
        data: action.payload,
      });
  }
  return state;
};
