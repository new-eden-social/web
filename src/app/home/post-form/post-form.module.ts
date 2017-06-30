import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostFormComponent } from './post-form.component';
import { MdButtonModule, MdInputModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdInputModule,
    MdButtonModule,
  ],
  exports: [PostFormComponent],
  declarations: [PostFormComponent],
})
export class PostFormModule {
}
