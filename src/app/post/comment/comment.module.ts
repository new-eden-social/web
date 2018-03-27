import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './comment.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [CommentComponent],
  exports: [CommentComponent],
})
export class CommentModule {
}
