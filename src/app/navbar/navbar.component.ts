import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { IAppState } from 'app/store/store.interface';
import { Router } from '@angular/router';
import { AuthenticationTypes } from '../services/authentication/authentication.types';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  searchCtrl: FormControl;

  @select(['authentication', 'authenticated'])
  authenticated$: Observable<boolean>;
  authenticated: boolean;

  constructor(private ngRedux: NgRedux<IAppState>, private router: Router) {
    this.authenticated$
    .subscribe(authenticated => this.authenticated = authenticated)
  }

  ngOnInit() {
  }

  logout() {
    this.ngRedux.dispatch({ type: AuthenticationTypes.UN_AUTHENTICATE });
    this.router.navigate(['']);
  }

}
