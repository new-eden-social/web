import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { SearchService } from '../services/search/search.service';
import {
  MdButtonModule, MdCardModule, MdIconModule, MdInputModule,
  MdListModule,
} from '@angular/material';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  providers: [SearchService, AuthenticationService],
  declarations: [],
})
export class DebugModule {
}
