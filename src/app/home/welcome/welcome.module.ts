import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeWelcomeComponent } from './welcome.component';
import { MatButtonModule, MatCardModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
  ],
  exports: [HomeWelcomeComponent],
  declarations: [HomeWelcomeComponent],
})
export class HomeWelcomeModule {
}
