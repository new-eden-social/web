import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../store/store.interface';
import { AuthenticationService } from 'app/services/authentication/authentication.service';
import { Observable } from 'rxjs';
import { AuthenticationTypes } from '../services/authentication/authentication.types';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-authentication',
  template: `
    <div class="align-center">
      <h1>Please wait while we are processing authentication request</h1>
      <mat-progress-spinner
        color="primary"
        mode="indeterminate">
      </mat-progress-spinner>
    </div>
  `,
  styles: [`
    .align-center {
      display: flex;
      flex-direction: column;
    }

    .align-center h1 {
      font-weight: 300;
    }

    .align-center * {
      align-self: center;
    }
  `],
})
export class AuthenticationComponent implements OnInit {

  @select(['authentication', 'authenticated'])
  authenticated$: Observable<boolean>;

  constructor(private activatedRoute: ActivatedRoute,
              private ngRedux: NgRedux<IAppState>,
              private router: Router,
              private authenticationService: AuthenticationService) {

    // When authenticated, redirect to welcome
    this.authenticated$
    .filter(authenticated => authenticated)
    .subscribe(() => this.router.navigate(['welcome']))
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const accessToken = params['access_token'];
      const refreshToken = params['refresh_token'];
      const expiresIn = params['expires_in'];
      const tokenType = params['token_type'];

      this.ngRedux.dispatch({
        type: AuthenticationTypes.REDIRECTED, payload: {
          accessToken,
          refreshToken,
          expiresIn,
          tokenType,
        },
      });

      this.authenticationService.initialCheck(accessToken)
    });
  }

}
