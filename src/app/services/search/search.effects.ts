import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { ApiService } from '../api.service';
import { Search, SearchActionTypes, SearchSuccess } from './search.actions';
import { DSearch } from './search.dto';
import { Effect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap } from 'rxjs/internal/operators';
import { Observable } from 'rxjs/Rx';
import { Exception } from '../api.actions';
import { of } from 'rxjs/index';

@Injectable()
export class SearchEffects extends ApiService {

  private uri = 'search';

  @Effect()
  search$: Observable<SearchSuccess | Exception> = this.actions$.pipe(
    ofType<Search>(SearchActionTypes.SEARCH),
    switchMap(({ payload }) =>
      this.request<DSearch>('GET', this.uri, { params: { query: payload } })
      .pipe(
        map(data => new SearchSuccess(data)),
        catchError(error => of(new Exception(error))),
      ),
    ));

}
