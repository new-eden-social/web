import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './comment.component';
import { MatButtonModule } from '@angular/material';
import { MomentModule } from 'angular2-moment';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MomentModule,
    RouterModule,
  ],
  declarations: [CommentComponent],
  exports: [CommentComponent],
})
export class CommentModule {
}
