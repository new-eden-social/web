import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarSearchComponent } from './navbar-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgReduxModule } from '@angular-redux/store';
import { MdButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgReduxModule,
    MdButtonModule
  ],
  declarations: [NavbarSearchComponent],
  exports: [NavbarSearchComponent],
})
export class NavbarSearchModule {
}
