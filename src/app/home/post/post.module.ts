import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post.component';
import { PostService } from '../../services/post/post.service';
import { RouterModule } from '@angular/router';
import { MdButtonModule, MdCardModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MdCardModule,
    MdButtonModule,
  ],
  providers: [PostService],
  declarations: [PostComponent],
  exports: [PostComponent],
})
export class PostModule {
}
