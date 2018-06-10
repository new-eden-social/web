import { Action } from '@ngrx/store';
import { DCharacter } from './character.dto';

export enum CharacterActionTypes {
  LOAD = '[Character] Load single character initiated',
  LOAD_SUCCESS = '[Character] Load single character success',
}

export class Load implements Action {
  readonly type = CharacterActionTypes.LOAD;
  constructor(public payload: string) {
  }
}

export class LoadSuccess implements Action {
  readonly type = CharacterActionTypes.LOAD_SUCCESS;
  constructor(public payload: DCharacter) {
  }
}

export type CharacterActionsUnion = Load | LoadSuccess;
