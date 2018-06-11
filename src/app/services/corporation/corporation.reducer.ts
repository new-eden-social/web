import { ICorporationState } from './corporation.interface';
import { CorporaitonActionsUnion, CorporationActionTypes } from './corporaiton.actions';

const INITIAL_STATE: ICorporationState = {};

export function corporationReducer(
  state: ICorporationState = INITIAL_STATE,
  action: CorporaitonActionsUnion,
): ICorporationState {
  switch (action.type) {
    case CorporationActionTypes.LOAD_SUCCESS: {
      return {
        ...state,
        data: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
