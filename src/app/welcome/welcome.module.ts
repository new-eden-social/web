import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome.component';
import { MatButtonModule, MatCardModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
  ],
  declarations: [WelcomeComponent],
})
export class WelcomeModule {
}
