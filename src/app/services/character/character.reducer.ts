import { Reducer } from 'redux';
import { ICharacterState } from './character.interface';
import { CharacterTypes } from './character.types';

const INITIAL_STATE: ICharacterState = {
};

export const characterReducer: Reducer<ICharacterState> = (state: ICharacterState = INITIAL_STATE, action: any): ICharacterState => {
  switch (action.type) {
    case CharacterTypes.LOAD:
      return Object.assign({}, state, {
        data: action.payload,
      });
  }
  return state;
};
