import { ICorporationState } from './corporation.interface';
import { CorporaitonActionsUnion, CorporationActionTypes } from './corporaiton.actions';

const INITIAL_STATE: ICorporationState = {
  single: {}
};

export function corporationReducer(
  state: ICorporationState = INITIAL_STATE,
  action: CorporaitonActionsUnion,
): ICorporationState {
  switch (action.type) {
    case CorporationActionTypes.LOAD_SUCCESS: {
      return {
        ...state,
        single: {
          ...state.single,
          [action.payload.id]: action.payload,
        },
      };
    }

    default: {
      return state;
    }
  }
}
