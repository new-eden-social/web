import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatCardModule } from '@angular/material';
import { MomentModule } from 'angular2-moment';
import { CommentModule } from './comment/comment.module';
import { CommentFormModule } from './comment-form/comment-form.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MomentModule,

    CommentModule,
    CommentFormModule,
  ],
  declarations: [PostComponent],
  exports: [PostComponent],
})
export class PostModule {
}
