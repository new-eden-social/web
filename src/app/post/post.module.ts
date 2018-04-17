import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatCardModule } from '@angular/material';
import { MomentModule } from 'angular2-moment';
import { PostService } from '../services/post/post.service';
import { CommentModule } from './comment/comment.module';
import { CommentFormModule } from './comment-form/comment-form.module';
import { CommentService } from '../services/comment/comment.service';

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
  providers: [PostService, CommentService],
  declarations: [PostComponent],
  exports: [PostComponent],
})
export class PostModule {
}
