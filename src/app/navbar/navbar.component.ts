import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { IAppState } from 'app/store/store.interface';
import { Router } from '@angular/router';
import { AuthenticationTypes } from '../services/authentication/authentication.actions';
import { FormControl } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  @select(['authentication', 'authenticated'])
  authenticated$: Observable<boolean>;
  authenticated: boolean;

  @select(['authentication', 'character'])
  character$: Observable<boolean>;

  authenticationUrl = environment.apiEndpoint;

  constructor(private ngRedux: NgRedux<IAppState>, private router: Router) {
    this.authenticated$
    .subscribe(authenticated => this.authenticated = authenticated);
  }

  ngOnInit() {
  }

  logout() {
    this.ngRedux.dispatch({ type: AuthenticationTypes.UN_AUTHENTICATE });
    this.router.navigate(['']);
  }

}
