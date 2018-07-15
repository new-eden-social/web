import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class HomeWelcomeComponent implements OnInit {

  authenticationUrl = (<any>environment).apiEndpoint;

  constructor() {
  }

  ngOnInit() {
  }


}
