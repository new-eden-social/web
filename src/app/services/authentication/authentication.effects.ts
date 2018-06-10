import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ApiService } from '../api.service';
import {
  Authenticate, AuthenticateCallback, AuthenticateCheck, AuthenticateSuccess,
  AuthenticationActionTypes,
  UnAuthenticate,
} from './authentication.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/internal/operators';
import { DCharacterShort } from '../character/character.dto';
import { of } from 'rxjs/index';
import { Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthenticationEffects extends ApiService {

  private uri = 'authentication/sso';

  @Effect()
  authenticateCallback$: Observable<AuthenticateCallback | AuthenticateCheck> = this.actions$.pipe(
    ofType<AuthenticateCallback>(AuthenticationActionTypes.AUTHENTICATE_CALLBACK),
    tap(()=> new AuthenticateCheck()),
  );

  @Effect()
  authenticate$: Observable<any> = this.actions$.pipe(
    ofType<Authenticate>(AuthenticationActionTypes.AUTHENTICATE),
    tap(() => {
      // Redirect to SSO Login page
      window.location.href = this.apiUrl + this.uri;
    }),
  );

  @Effect()
  checkAuthenticated$: Observable<AuthenticateSuccess | UnAuthenticate> = this.actions$.pipe(
    ofType<AuthenticateCheck>(AuthenticationActionTypes.AUTHENTICATE_CHECK),
    mergeMap(() => {
      return this.request<DCharacterShort>('GET', `${this.uri}/verify`).pipe(
        map(response => new AuthenticateSuccess(response)),
        catchError(() => of(new UnAuthenticate())),
      );
    }),
  );

}
