import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Character } from './character.interface';
import { ApiService } from './api.service';
import { Corporation } from './corporation.interface';
import { Alliance } from './alliance.interface';

@Injectable()
export class CharacterService extends ApiService {
  private uri = 'characters';  // URL to web API

  get(id: number): Observable<Character> {
    return this.request(`${this.uri}/${id}`)
    .map(this.extractData)
    .catch(this.handleError);
  }
}
