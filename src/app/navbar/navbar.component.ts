import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../app.store';
import { DCharacterShort } from '../services/character/character.dto';
import { UnAuthenticate } from '../services/authentication/authentication.actions';
import { Authenticate, Connect } from '../services/websocket/websocket.actions';
import { filter } from 'rxjs/internal/operators';

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

  notifications() {
    console.log('ze button');
    this.store.dispatch(new Connect());
    this.store.pipe(
      select('websocket', 'connected'),
      filter(connected => connected),
    ).subscribe(() => {
      console.log('Heell yeah, connected!!!');
      return this.store.pipe(
        select('authentication', 'data', 'accessToken'),
      ).subscribe(token => {
        console.log('going to do authentication now');
        this.store.dispatch(new Authenticate(token));
      });
    });
  }
}
