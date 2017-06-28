import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ApiService } from '../api.service';

@Injectable()
export class AuthenticationService extends ApiService {
  static readonly AUTHENTICATED = 'AUTHENTICATED';
  static readonly REDIRECTED = 'REDIRECTED';

  private uri = 'authentication/sso';

  initialCheck(accessToken: string) {
    const headers = this.createAuthorizationHeader(accessToken);

    this.request(`${this.uri}/verify`, { headers })
    .subscribe(
      response => this.ngRedux.dispatch({
        type: AuthenticationService.AUTHENTICATED,
        payload: response,
      }),
      error => this.ngRedux.dispatch({
        type: AuthenticationService.AUTHENTICATED,
        payload: error,
        error: true,
      }),
    )
  }
}
