import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { ApiService } from '../api.service';
import { DCharacter } from './character.dto';
import { Effect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/internal/operators';
import { Observable } from 'rxjs/Rx';
import { CharacterActionTypes, Load, LoadSuccess } from './character.actions';

@Injectable()
export class CharacterEffects extends ApiService {

  private uri = 'characters';

  @Effect()
  load$: Observable<LoadSuccess> = this.actions$.pipe(
    ofType<Load>(CharacterActionTypes.LOAD),
    mergeMap(action =>
      this.request<DCharacter>('GET', `${this.uri}/${action.payload}`).pipe(
        map(data => new LoadSuccess(data)),
      ),
    ),
  );
}
