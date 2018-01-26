import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorporationComponent } from './corporation.component';
import { MatButtonModule, MatCardModule, MatListModule } from '@angular/material';
import { PostFormModule } from '../../post-form/post-form.module';
import { PostModule } from '../../post/post.module';
import { PostService } from '../../services/post/post.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FooterModule } from '../../footer/footer.module';
import { CorporationService } from '../../services/corporation/corporation.service';
import { LoadingModule } from '../../loading/loading.module';
import { ProfileHeaderModule } from '../header/header.module';
import { RouterModule } from '@angular/router';
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
    LoadingModule,
    ProfileHeaderModule,
    RouterModule,
    PostListModule,
  ],
  providers: [CorporationService, PostService],
  declarations: [CorporationComponent],
  exports: [CorporationComponent],
})
export class CorporationModule {
}
