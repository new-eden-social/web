import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication.component';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
  ],
  declarations: [AuthenticationComponent],
  providers: [AuthenticationService],
})
export class AuthenticationModule {
}
