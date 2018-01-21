import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatCardModule } from '@angular/material';
import { MomentModule } from 'angular2-moment';
import { PostService } from '../services/post/post.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MomentModule,
  ],
  providers: [PostService],
  declarations: [PostComponent],
  exports: [PostComponent],
})
export class PostModule {
}
