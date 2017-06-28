import { Http, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { IAppState } from '../store/store.interface';

@Injectable()
export abstract class ApiService {

  @select(['authentication', 'token'])
  token$: Observable<string>;

  private apiUrl = 'http://localhost:3000/';

  constructor(protected http: Http,
              protected ngRedux: NgRedux<IAppState>) {
  }

  protected createAuthorizationHeader(token: string, headers: Headers = new Headers()): Headers {
    headers.set('Authorization', 'Bearer ' + token);
    return headers
  }

  protected request<T>(url: string, config: RequestOptionsArgs = {}): Observable<T> {
    url = this.apiUrl + url;

    // TODO: provide real token
    if (!config.headers || !config.headers.has('Authorization')) {
      config.headers = this.createAuthorizationHeader('', config.headers);
    }

    return this.http.request(url, config)
    .map(this.extractData)
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
