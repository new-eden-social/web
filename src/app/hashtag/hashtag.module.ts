import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HashtagComponent } from './hashtag.component';
import { LoadingModule } from '../loading/loading.module';
import { PostListModule } from '../post-list/post-list.module';
import { FooterModule } from '../footer/footer.module';
import { PostEffects } from 'app/services/post/post.effects';
import { MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    LoadingModule,
    PostListModule,
    FooterModule,
    MatButtonModule,
  ],
  providers: [PostEffects],
  declarations: [HashtagComponent],
  exports: [HashtagComponent],
})
export class HashtagModule {
}
