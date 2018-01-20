import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostModule } from './post/post.module';
import { PostFormModule } from './post-form/post-form.module';
import {
  MatButtonModule, MatCardModule, MatIconModule, MatInputModule,
  MatListModule,
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { ProfileModule } from './profile/profile.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

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
    PostModule,
    PostFormModule,
    ProfileModule,
    InfiniteScrollModule
  ],
  providers: [],
  declarations: [HomeComponent],
})
export class HomeModule {
}
