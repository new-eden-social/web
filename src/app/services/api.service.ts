import { Http, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class ApiService {
  private apiUrl = 'http://localhost:3000/';

  constructor(private http: Http) {
  }

  protected request(url: string, config?: RequestOptionsArgs): Observable<Response> {
    url = this.apiUrl + url;
    return this.http.request(url, config)
  }

  protected extractData(res: Response) {
    return res.json();
  }

  protected handleError(error: Response | any) {
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
