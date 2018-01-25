import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostFormComponent } from './post-form.component';
import {
  MatButtonModule, MatExpansionModule, MatIconModule, MatInputModule,
  MatMenuModule,
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostService } from '../services/post/post.service';
import { ContentEditableDirective } from '../content-editable.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule,
    MatMenuModule,
    MatIconModule,
  ],
  exports: [PostFormComponent],
  declarations: [PostFormComponent, ContentEditableDirective],
  providers: [PostService],
})
export class PostFormModule {
}
