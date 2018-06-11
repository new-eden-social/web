import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarSearchComponent } from './navbar-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule
  ],
  declarations: [NavbarSearchComponent],
  exports: [NavbarSearchComponent],
})
export class NavbarSearchModule {
}
