import { Action } from '@ngrx/store';
import { DAlliance } from './alliance.dto';

export enum AllianceActionTypes {
  LOAD = '[Alliance] Load initiated',
  LOAD_SUCCESS = '[Alliance] Load success',
}

export class Load implements Action {
  readonly type = AllianceActionTypes.LOAD;
  constructor(public payload: string) {
  }
}

export class LoadSuccess implements Action {
  readonly type = AllianceActionTypes.LOAD_SUCCESS;
  constructor(public payload: DAlliance) {
  }
}
export type AllianceActionsUnion = Load | LoadSuccess;
