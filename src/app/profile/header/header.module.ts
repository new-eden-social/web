import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  providers: [,],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class ProfileHeaderModule {
}
