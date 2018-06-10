import { ICharacterState } from './character.interface';
import { CharacterActionsUnion, CharacterActionTypes } from './character.actions';

const INITIAL_STATE: ICharacterState = {};

export function characterReducer(
  state: ICharacterState = INITIAL_STATE,
  action: CharacterActionsUnion,
): ICharacterState {
  switch (action.type) {
    case CharacterActionTypes.LOAD_SUCCESS: {
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
