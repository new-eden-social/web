import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ICharacter } from './character.interface';
import { ApiService } from '../api.service';
import { ICorporation } from '../corporation/corporation.interface';
import { IAlliance } from '../alliance/alliance.interface';

@Injectable()
export class CharacterService extends ApiService {

  private uri = 'characters';

  get(id: number): Observable<ICharacter> {
    return this.request(`${this.uri}/${id}`)
  }
}
