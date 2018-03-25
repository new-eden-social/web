import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar id="header"></app-navbar>

    <!-- main content -->
    <div id="content">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
}
