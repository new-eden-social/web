import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar></app-navbar>
    <div id="content">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
}
