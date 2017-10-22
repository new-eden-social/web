import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostFormComponent } from './post-form.component';
import { MatButtonModule, MatInputModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [PostFormComponent],
  declarations: [PostFormComponent],
})
export class PostFormModule {
}
