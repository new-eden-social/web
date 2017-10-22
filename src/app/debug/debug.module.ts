import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { SearchService } from '../services/search/search.service';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule, MatCardModule, MatIconModule, MatInputModule,
  MatListModule,
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MatListModule,
  ],
  providers: [SearchService, AuthenticationService],
  declarations: [],
})
export class DebugModule {
}
