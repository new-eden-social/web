import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {
  MdButtonModule, MdCardModule, MdIconModule,
  MdInputModule, MdListModule,
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchService } from '../services/search/search.service';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    MdCardModule,
    MdButtonModule,
    MdIconModule,
    MdInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MdListModule,
  ],
  providers: [SearchService],
  declarations: [HomeComponent],
  exports: [HomeComponent],
})
export class HomeModule {
}
