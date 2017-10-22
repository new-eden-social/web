import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { PostModule } from './post/post.module';
import { PostFormModule } from './post-form/post-form.module';
import {
  MatButtonModule, MatCardModule, MatIconModule, MatInputModule,
  MatListModule,
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MatListModule,
    PostModule,
    PostFormModule,
  ],
  providers: [],
  declarations: [HomeComponent],
})
export class HomeModule {
}
