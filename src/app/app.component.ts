import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar></app-navbar>
    <mat-sidenav-container>

      <!-- sidenav content -->
      <mat-sidenav #sidenav mode="side" opened="true">
        <app-sidenav></app-sidenav>
      </mat-sidenav>

      <!-- main content -->
      <div id="content">
        <router-outlet></router-outlet>
      </div>

    </mat-sidenav-container>
  `,
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
}
