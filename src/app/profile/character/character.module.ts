import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterComponent } from './character.component';
import { CharacterService } from '../../services/character/character.service';
import { MatButtonModule, MatCardModule, MatListModule } from '@angular/material';
import { PostFormModule } from '../../post-form/post-form.module';
import { PostModule } from '../../post/post.module';
import { PostService } from '../../services/post/post.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FooterModule } from '../../footer/footer.module';
import { RouterModule } from '@angular/router';
import { ProfileHeaderModule } from '../header/header.module';
import { LoadingModule } from '../../loading/loading.module';
import { PostListModule } from '../../post-list/post-list.module';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    PostFormModule,
    PostModule,
    InfiniteScrollModule,
    FooterModule,
    RouterModule,
    LoadingModule,
    ProfileHeaderModule,
    PostListModule,
  ],
  providers: [CharacterService, PostService],
  declarations: [CharacterComponent],
  exports: [CharacterComponent],
})
export class CharacterModule {
}