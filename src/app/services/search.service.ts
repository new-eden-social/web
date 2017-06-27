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
export class SearchService extends ApiService {
  private uri = 'search';  // URL to web API

  search(query: string): Observable<{
    characters: Character[],
    corporations: Corporation[],
    alliances: Alliance[]
  }> {
    return this.request(this.uri, { params: { query } })
    .map(this.extractData)
    .catch(this.handleError);
  }

}
