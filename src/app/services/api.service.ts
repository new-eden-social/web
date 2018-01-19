import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { IAppState } from '../store/store.interface';
import { AuthenticationTypes } from './authentication/authentication.types';
import {
  IAuthenticationResponse,
  IRefreshResponse,
} from './authentication/authentication.interface';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/first';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { ApiExceptionResponse } from './api.interface';

@Injectable()
export abstract class ApiService {

  @select(['authentication', 'data', 'accessToken'])
  accessToken$: Observable<string>;
  accessToken: string;

  @select(['authentication', 'data', 'refreshToken'])
  refreshToken$: Observable<string>;
  refreshToken: string;

  private apiUrl = 'http://localhost:3000/';

  constructor(
    protected http: HttpClient,
    protected ngRedux: NgRedux<IAppState>,
  ) {
    this.accessToken$
    .subscribe(accessToken => this.accessToken = accessToken);

    this.refreshToken$
    .subscribe(refreshToken => {
      this.refreshToken = refreshToken
    });
  }

  protected createAuthorizationHeader(
    token: string,
    headers: HttpHeaders = new HttpHeaders(),
  ): HttpHeaders {
    return headers.set('Authorization', 'Bearer ' + token);
  }

  protected request<T>(method: string, url: string, config: any = {}): Observable<T> {
    url = this.apiUrl + url;

    if (!config.headers || !config.headers.has('Authorization')) {
      config.headers = this.createAuthorizationHeader(this.accessToken, config.headers);
    }

    return this.http.request<T>(method, url, config)
    .retryWhen((errors: Observable<Response>): Observable<any> => {
      return errors
      .first()
      .filter((error) => error.status === 401)
      .map(() => {
        // If 401 happens, we try to refresh token. If it then fails again we stop
        // TODO: Dispatch UN_AUTHENTICATE on second error
        this.request('POST', `authentication/sso/refresh`, {
          body: { refresh_token: this.refreshToken },
        })
        .subscribe(
          (response: IRefreshResponse) => {
            // Format refresh response to authentication response
            const payload: IAuthenticationResponse = {
              accessToken : response.access_token,
              refreshToken: response.refresh_token,
              tokenType   : response.token_type,
              expiresIn   : response.expires_in,
            };
            return this.ngRedux.dispatch(
              {
                type: AuthenticationTypes.REFRESH_TOKEN,
                payload,
              })
          },
          error => this.ngRedux.dispatch(
            {
              type   : AuthenticationTypes.REFRESH_TOKEN,
              payload: error,
              error  : true,
            }),
        )
        // Token is not valid anymore, try to refresh it
      })
    })
    .catch(this.handleError);
  }

  /**
   * Handle API Error
   * @param response
   * @return {any}
   */
  private handleError(response: HttpResponse<ApiExceptionResponse> | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errorMessage: string;
    if (response instanceof HttpResponse) {
      errorMessage = `${response.status} - ${response.statusText}`;
      if (response.body.error) {
        errorMessage += response.body.error;
      } else if (response.body.errors && response.body.errors.length) {
        errorMessage += `[ ${response.body.errors.join(', ')} ]`;
      }
    } else {
      errorMessage = response.message ? response.message : response.toString();
    }
    console.error(errorMessage);
    return Observable.throw(errorMessage);
  }

}
