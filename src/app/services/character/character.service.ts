import { Injectable }              from '@angular/core';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ICharacter } from './character.interface';
import { ApiService } from '../api.service';
import { CharacterTypes } from './character.types';

@Injectable()
export class CharacterService extends ApiService {

  private uri = 'characters';

  get(id: number) {
    this.request<ICharacter>(`${this.uri}/${id}`)
    .subscribe(response => this.ngRedux.dispatch({
        type: CharacterTypes.LOAD,
        payload: response,
      }),
      error => this.ngRedux.dispatch({
        type: CharacterTypes.LOAD,
        payload: error,
        error: true,
      }))
  }
}
