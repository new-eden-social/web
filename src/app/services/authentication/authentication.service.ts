import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ApiService } from '../api.service';
import { AuthenticationTypes } from './authentication.types';

@Injectable()
export class AuthenticationService extends ApiService {

  private uri = 'authentication/sso';

  initialCheck(accessToken: string) {
    const headers = this.createAuthorizationHeader(accessToken);

    this.request('GET', `${this.uri}/verify`, { headers })
    .subscribe(
      response => this.ngRedux.dispatch(
        {
          type   : AuthenticationTypes.AUTHENTICATED,
          payload: response,
        }),
      error => this.ngRedux.dispatch(
        {
          type   : AuthenticationTypes.AUTHENTICATED,
          payload: error,
          error  : true,
        }),
    )
  }

}
