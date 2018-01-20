import { Injectable } from '@angular/core';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ApiService } from '../api.service';
import { CharacterTypes } from './character.types';
import { DCharacter } from './character.dto';

@Injectable()
export class CharacterService extends ApiService {

  private uri = 'characters';

  get(id: number) {
    this.request<DCharacter>('GET', `${this.uri}/${id}`)
    .subscribe(
      response => this.ngRedux.dispatch(
        {
          type   : CharacterTypes.LOAD,
          payload: response,
        }),
      error => this.ngRedux.dispatch(
        {
          type   : CharacterTypes.LOAD,
          payload: error,
          error  : true,
        }),
    )
  }
}
