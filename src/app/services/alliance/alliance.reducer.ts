import { Reducer } from 'redux';
import { IAllianceState } from './alliance.interface';
import { AllianceTypes } from './alliance.types';

const INITIAL_STATE: IAllianceState = {};

export const allianceReducer: Reducer<IAllianceState> = (
  state: IAllianceState = INITIAL_STATE,
  action: any,
): IAllianceState => {
  switch (action.type) {
    case AllianceTypes.LOAD:
      return Object.assign({}, state, {
        data: action.payload,
      });
  }
  return state;
};
