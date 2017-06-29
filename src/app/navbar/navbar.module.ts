import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import {
  MdButtonModule, MdIconModule, MdInputModule, MdMenuModule,
  MdToolbarModule,
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { NavbarSearchModule } from './navbar-search/navbar-search.module';

@NgModule({
  imports: [
    CommonModule,
    MdToolbarModule,
    MdButtonModule,
    MdIconModule,
    RouterModule,
    MdMenuModule,
    NavbarSearchModule,
  ],
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
})
export class NavbarModule {
}
