import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllianceComponent } from './alliance.component';
import { MatButtonModule, MatCardModule, MatListModule } from '@angular/material';
import { PostFormModule } from '../../post-form/post-form.module';
import { PostModule } from '../../post/post.module';
import { PostService } from '../../services/post/post.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FooterModule } from '../../footer/footer.module';
import { LoadingModule } from '../../loading/loading.module';
import { ProfileHeaderModule } from '../header/header.module';
import { AllianceService } from 'app/services/alliance/alliance.service';

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
  ],
  providers: [AllianceService, PostService],
  declarations: [AllianceComponent],
  exports: [AllianceComponent],
})
export class AllianceModule {
}
