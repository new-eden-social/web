import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
  ],
  declarations: [SidenavComponent],
  exports: [SidenavComponent],
})
export class SidenavModule {
}
