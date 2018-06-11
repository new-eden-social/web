import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { ApiService } from '../api.service';
import { DCorporation } from './corporation.dto';
import { Effect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/internal/operators';
import { Observable } from 'rxjs/Rx';
import { CorporationActionTypes, Load, LoadSuccess } from './corporaiton.actions';

@Injectable()
export class CorporationEffects extends ApiService {

  private uri = 'corporations';

  @Effect()
  load$: Observable<LoadSuccess> = this.actions$.pipe(
    ofType<Load>(CorporationActionTypes.LOAD),
    mergeMap(action =>
      this.request<DCorporation>('GET', `${this.uri}/${action.payload}`).pipe(
        map(data => new LoadSuccess(data)),
      ),
    ),
  );
}
