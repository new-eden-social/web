import { IAllianceState } from './alliance.interface';
import { AllianceActionsUnion, AllianceActionTypes } from './alliance.actions';

const INITIAL_STATE: IAllianceState = {};

export function allianceReducer(
  state: IAllianceState = INITIAL_STATE,
  action: AllianceActionsUnion,
): IAllianceState {
  switch (action.type) {
    case AllianceActionTypes.LOAD: {
      return Object.assign({}, state, {
        data: action.payload,
      });
    }

    default: {
      return state;
    }
  }
}
