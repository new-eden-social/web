import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule, MatCardModule, MatIconModule, MatInputModule,
  MatListModule,
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { HomeProfileModule } from './profile/profile.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HomeWelcomeModule } from './welcome/welcome.module';
import { PostModule } from '../post/post.module';
import { PostFormModule } from '../post-form/post-form.module';
import { RouterModule } from '@angular/router';
import { FooterModule } from '../footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatListModule,
    InfiniteScrollModule,
    PostModule,
    PostFormModule,
    HomeProfileModule,
    HomeWelcomeModule,
    RouterModule,
    FooterModule,
  ],
  providers: [],
  declarations: [HomeComponent],
})
export class HomeModule {
}
