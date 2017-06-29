import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {

  @select(['authentication', 'authenticated'])
  authenticated$: Observable<boolean>;
  authenticated: boolean;

  constructor() {
    this.authenticated$
    .subscribe(authenticated => this.authenticated = authenticated)
  }

  ngOnInit() {
  }

}
