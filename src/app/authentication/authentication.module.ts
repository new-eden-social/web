import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication.component';
import { AuthenticationEffects } from '../services/authentication/authentication.effects';
import { MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
  ],
  declarations: [AuthenticationComponent],
  providers: [AuthenticationEffects],
})
export class AuthenticationModule {
}
