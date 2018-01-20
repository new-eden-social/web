import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post.component';
import { PostService } from '../../services/post/post.service';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatCardModule } from '@angular/material';
import { MomentModule } from 'angular2-moment';

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
