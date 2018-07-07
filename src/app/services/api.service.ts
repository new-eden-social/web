import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/filter';
import { environment } from '../../environments/environment';
import { Actions } from '@ngrx/effects';
import { IAppState } from '../app.store';
import { map } from 'rxjs/internal/operators';
import { HttpResponse } from '@angular/common/http/src/response';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class ApiService {

  protected apiUrl = environment.apiEndpoint;

  constructor(
    protected http: HttpClient,
    protected actions$: Actions,
    protected store: Store<IAppState>,
    protected router: Router,
    protected snackBar: MatSnackBar,
  ) {
  }

  public request<T = any>(
    method: string,
    url: string,
    config: any = {},
  ): Observable<T> {
    url = this.apiUrl + url;

    return this.http.request<T>(method, url, {
      ...config,
      responseType: 'json',
      observe: 'response',
    })
    .pipe(
      map(response => (<HttpResponse<T>>response).body),
    );
  }
}
