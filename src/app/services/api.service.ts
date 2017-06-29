import { Http, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { IAppState } from '../store/store.interface';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationTypes } from './authentication/authentication.types';
import {
  IAuthenticationResponse,
  IRefreshResponse,
} from './authentication/authentication.interface';

@Injectable()
export abstract class ApiService {

  @select(['authentication', 'data', 'accessToken'])
  accessToken$: Observable<string>;
  accessToken: string;

  @select(['authentication', 'data', 'refreshToken'])
  refreshToken$: Observable<string>;
  refreshToken: string;

  private apiUrl = 'http://localhost:3000/';

  constructor(protected http: Http,
              protected ngRedux: NgRedux<IAppState>) {
    this.accessToken$
    .subscribe(accessToken => this.accessToken = accessToken);

    this.refreshToken$
    .subscribe(refreshToken => {
      console.log(refreshToken, 'change')
      this.refreshToken = refreshToken
    });
  }

  protected createAuthorizationHeader(token: string, headers: Headers = new Headers()): Headers {
    headers.set('Authorization', 'Bearer ' + token);
    return headers
  }

  protected request<T>(url: string, config: RequestOptionsArgs = {}): Observable<T> {
    url = this.apiUrl + url;

    if (!config.headers || !config.headers.has('Authorization')) {
      config.headers = this.createAuthorizationHeader(this.accessToken, config.headers);
    }

    return this.http.request(url, config)
    .map(this.extractData)
    .retryWhen((errors: Observable<Response>): Observable<any> => {
      return errors
      .first()
      .filter((error) => error.status === 401)
      .map(() => {
        // If 401 happens, we try to refresh token. If it then fails again we stop
        // TODO: Dispatch UN_AUTHENTICATE on second error
        this.request(`authentication/sso/refresh`, {
          method: 'POST',
          body: { refresh_token: this.refreshToken },
        })
        .subscribe(
          (response: IRefreshResponse) => {
            // Format refresh response to authentication response
            const payload: IAuthenticationResponse = {
              accessToken: response.access_token,
              refreshToken: response.refresh_token,
              tokenType: response.token_type,
              expiresIn: response.expires_in,
            };
            return this.ngRedux.dispatch({
              type: AuthenticationTypes.REFRESH_TOKEN,
              payload,
            })
          },
          error => this.ngRedux.dispatch({
            type: AuthenticationTypes.REFRESH_TOKEN,
            payload: error,
            error: true,
          }),
        )
        // Token is not valid anymore, try to refresh it
      })
    })
    .catch(this.handleError);
  }

  /**
   * Extract data from response
   * @param res
   * @return {any}
   */
  private extractData(res: Response) {
    return res.json();
  }

  /**
   * Handle API Error
   * @param error
   * @return {any}
   */
  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
