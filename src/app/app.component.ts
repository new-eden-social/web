import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar></app-navbar>
    <md-sidenav-container>

      <!-- sidenav content -->
      <md-sidenav #sidenav mode="side" opened="true">
        <app-sidenav></app-sidenav>
      </md-sidenav>

      <!-- main content -->
      <div id="content">
        <router-outlet></router-outlet>
      </div>

    </md-sidenav-container>
  `,
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
}
