import { Injectable }              from '@angular/core';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ApiService } from '../api.service';
import { SearchTypes } from './search.types';
import { ISearchResponse } from './search.interface';

@Injectable()
export class SearchService extends ApiService {

  private uri = 'search';

  search(query: string) {
    this.request<ISearchResponse>(this.uri, { params: { query } })
    .subscribe(response => this.ngRedux.dispatch({
        type: SearchTypes.SEARCH,
        payload: response,
      }),
      error => this.ngRedux.dispatch({
        type: SearchTypes.SEARCH,
        payload: error,
        error: true,
      }))
  }

  clear() {
    this.ngRedux.dispatch({ type: SearchTypes.CLEAR })
  }

}
