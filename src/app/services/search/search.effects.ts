import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { ApiService } from '../api.service';
import { Search, SearchActionTypes, SearchSuccess } from './search.actions';
import { DSearch } from './search.dto';
import { Effect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/internal/operators';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class SearchService extends ApiService {

  private uri = 'search';

  @Effect()
  search$: Observable<SearchSuccess> = this.actions$.pipe(
    ofType<Search>(SearchActionTypes.SEARCH),
    mergeMap(({ payload }) =>
      this.request<DSearch>('GET', this.uri, { params: { query: payload } })
      .pipe(
        map(data => new SearchSuccess(data)),
      ),
    ));

}
