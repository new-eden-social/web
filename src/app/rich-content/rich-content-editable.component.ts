import {
  Component, Output, ElementRef, EventEmitter, HostListener,
} from '@angular/core';
import { RichContentService } from './rich-content.service';

@Component({
  selector: 'app-rich-content-editable',
  template: '<html-outlet [editable]="true" [html]="contentHtml"></html-outlet>',
})
export class RichContentEditableComponent {

  @Output()
  update = new EventEmitter<string>();

  public contentHtml = '';

  constructor(
    private richContentService: RichContentService,
    private elRef: ElementRef,
  ) {
  }

  @HostListener('keyup')
  writing() {
    const value = this.elRef.nativeElement.textContent;
    this.update.emit(value);

    let html = value;
    // TODO: Sanitize html, as for now it should be just text
    html = this.richContentService.parseHashtags(html, true);
    html = this.richContentService.parseEmojies(html);
    html = this.richContentService.parseText(html);

    this.contentHtml = html;
  }
}
