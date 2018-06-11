import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/filter';
import { environment } from '../../environments/environment';
import { Actions } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../app.store';
import { map, tap } from 'rxjs/internal/operators';
import { HttpResponse } from '@angular/common/http/src/response';
import { Router } from '@angular/router';

@Injectable()
export abstract class ApiService {

  accessToken: string;
  refreshToken: string;

  protected apiUrl = environment.apiEndpoint;

  constructor(
    protected http: HttpClient,
    protected actions$: Actions,
    protected store: Store<IAppState>,
    protected router: Router,
  ) {
    this.store.pipe(
      select('authentication', 'data', 'accessToken'),
    ).subscribe(token => this.accessToken = token);
    this.store.pipe(
      select('authentication', 'data', 'refreshToken'),
    ).subscribe(token => this.refreshToken = token);
  }

  protected createAuthorizationHeader(
    token: string,
    headers: HttpHeaders = new HttpHeaders(),
  ): HttpHeaders {
    return headers.set('Authorization', 'Bearer ' + token);
  }

  protected request<T = any>(
    method: string,
    url: string,
    config: any = {},
  ): Observable<T> {
    url = this.apiUrl + url;

    if (!config.headers || !config.headers.has('Authorization')) {
      config.headers = this.createAuthorizationHeader(this.accessToken, config.headers);
    }

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
