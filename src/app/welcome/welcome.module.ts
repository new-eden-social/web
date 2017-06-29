import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome.component';
import { MdButtonModule, MdCardModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdCardModule,
    MdButtonModule,
  ],
  declarations: [WelcomeComponent],
})
export class WelcomeModule {
}
