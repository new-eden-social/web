import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentFormComponent } from './comment-form.component';
import {
  MatButtonModule, MatExpansionModule, MatIconModule, MatInputModule,
  MatMenuModule,
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentEditableModule } from '../../content-editable/content-editable.module';

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
    ContentEditableModule,
  ],
  declarations: [CommentFormComponent],
  exports: [CommentFormComponent],
})
export class CommentFormModule { }
