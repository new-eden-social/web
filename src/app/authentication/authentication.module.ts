import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication.component';
import { MdProgressSpinnerModule } from '@angular/material';
import { AuthenticationService } from '../services/authentication/authentication.service';

@NgModule({
  imports: [
    CommonModule,
    MdProgressSpinnerModule,
  ],
  declarations: [AuthenticationComponent],
  providers: [AuthenticationService],
})
export class AuthenticationModule {
}
