import { ICharacterState } from './character.interface';
import { CharacterActionsUnion, CharacterActionTypes } from './character.actions';

const INITIAL_STATE: ICharacterState = {
  single: {}
};

export function characterReducer(
  state = INITIAL_STATE,
  action: CharacterActionsUnion,
): ICharacterState {
  switch (action.type) {
    case CharacterActionTypes.LOAD_SUCCESS: {
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
