import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import { MdButtonModule } from '@angular/material';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MdButtonModule,
    RouterModule,
  ],
  declarations: [SidenavComponent],
  exports: [SidenavComponent],
})
export class SidenavModule {
}
