import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import {
  MdButtonModule, MdIconModule, MdInputModule, MdMenuModule,
  MdToolbarModule,
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MdToolbarModule,
    MdButtonModule,
    MdIconModule,
    RouterModule,
    MdMenuModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
})
export class NavbarModule {
}
