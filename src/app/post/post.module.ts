import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatCardModule } from '@angular/material';
import { MomentModule } from 'angular2-moment';
import { PostEffects } from '../services/post/post.effects';
import { CommentModule } from './comment/comment.module';
import { CommentFormModule } from './comment-form/comment-form.module';
import { CommentEffects } from '../services/comment/comment.effects';

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
  providers: [PostEffects, CommentEffects],
  declarations: [PostComponent],
  exports: [PostComponent],
})
export class PostModule {
}
