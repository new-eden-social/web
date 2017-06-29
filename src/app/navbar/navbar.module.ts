import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { MdButtonModule, MdIconModule, MdMenuModule, MdToolbarModule } from '@angular/material';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MdToolbarModule,
    MdButtonModule,
    MdIconModule,
    RouterModule,
    MdMenuModule,
  ],
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
})
export class NavbarModule {
}
