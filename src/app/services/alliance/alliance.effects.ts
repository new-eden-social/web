import { Injectable } from '@angular/core';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ApiService } from '../api.service';
import { DAlliance } from './alliance.dto';
import { Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Rx';
import { AllianceActionTypes, Load, LoadSuccess } from './alliance.actions';
import { map, mergeMap } from 'rxjs/internal/operators';

@Injectable()
export class AllianceEffects extends ApiService {

  private uri = 'alliances';

  @Effect()
  load$: Observable<LoadSuccess> = this.actions$.pipe(
    ofType<Load>(AllianceActionTypes.LOAD),
    mergeMap(action =>
      this.request<DAlliance>('GET', `${this.uri}/${action.payload}`).pipe(
        map(data => new LoadSuccess(data)),
      ),
    ),
  );

}
