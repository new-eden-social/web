import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeProfileComponent } from './profile.component';
import { MatButtonModule, MatCardModule } from '@angular/material';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
  ],
  exports: [HomeProfileComponent],
  declarations: [HomeProfileComponent],
  providers: [],
})
export class HomeProfileModule {
}
