import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../store/store.reducer';
import { DCharacterShort } from '../services/character/character.dto';
import { UnAuthenticate } from '../services/authentication/authentication.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  authenticated$: Observable<boolean>;
  character$: Observable<DCharacterShort>;

  authenticationUrl = environment.apiEndpoint;

  constructor(
    private store: Store<IAppState>,
    private router: Router,
  ) {
    this.authenticated$ = this.store.pipe(select('authentication', 'authenticated'));
    this.character$ = this.store.pipe(select('authentication', 'character'));
  }

  ngOnInit() {
  }

  logout() {
    this.store.dispatch(new UnAuthenticate());
    this.router.navigate(['']);
  }

}
