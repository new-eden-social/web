import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HashtagComponent } from './hashtag.component';
import { LoadingModule } from '../loading/loading.module';
import { PostListModule } from '../post-list/post-list.module';
import { FooterModule } from '../footer/footer.module';
import { PostService } from 'app/services/post/post.service';

@NgModule({
  imports: [
    CommonModule,
    LoadingModule,
    PostListModule,
    FooterModule,
  ],
  providers: [PostService],
  declarations: [HashtagComponent],
  exports: [HashtagComponent],
})
export class HashtagModule {
}
