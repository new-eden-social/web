import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @select(['authentication', 'authenticated'])
  authenticated$: Observable<boolean>;
  authenticated: boolean;

  constructor() {
    // When authenticated, redirect to welcome
    this.authenticated$
    .subscribe(authenticated => this.authenticated = authenticated)
  }

  ngOnInit() {
  }

}
