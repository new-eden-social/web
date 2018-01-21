import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePostFormComponent } from './post-form.component';
import { MatButtonModule, MatExpansionModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostService } from '../../services/post/post.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule
  ],
  exports: [HomePostFormComponent],
  declarations: [HomePostFormComponent],
  providers: [PostService],
})
export class HomePostFormModule {
}
