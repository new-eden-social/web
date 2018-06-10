import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationEffects } from '../services/authentication/authentication.effects';
import { SearchService } from '../services/search/search.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule, MatCardModule, MatIconModule, MatInputModule,
  MatListModule,
} from '@angular/material';
import { DebugComponent } from './debug.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
  ],
  providers: [SearchService, AuthenticationEffects],
  declarations: [DebugComponent],
})
export class DebugModule {
}
