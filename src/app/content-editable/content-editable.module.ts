import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentEditableDirective } from './content-editable.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [ContentEditableDirective],
  exports: [ContentEditableDirective],
})
export class ContentEditableModule {
}
