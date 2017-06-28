import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ICharacter } from '../character/character.interface';
import { ApiService } from '../api.service';
import { ICorporation } from '../corporation/corporation.interface';
import { IAlliance } from '../alliance/alliance.interface';

@Injectable()
export class SearchService extends ApiService {

  private uri = 'search';

  search(query: string): Observable<{
    characters: ICharacter[],
    corporations: ICorporation[],
    alliances: IAlliance[]
  }> {
    return this.request(this.uri, { params: { query } })
  }

}
