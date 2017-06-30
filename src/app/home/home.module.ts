import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {
  MdButtonModule, MdCardModule, MdIconModule,
  MdInputModule, MdListModule,
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { PostModule } from './post/post.module';
import { PostFormModule } from './post-form/post-form.module';

@NgModule({
  imports: [
    CommonModule,
    MdCardModule,
    MdButtonModule,
    MdIconModule,
    MdInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MdListModule,
    PostModule,
    PostFormModule,
  ],
  providers: [],
  declarations: [HomeComponent],
})
export class HomeModule {
}
