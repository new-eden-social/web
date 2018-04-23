import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { RichContentService } from './rich-content.service';

@Component({
  selector: 'app-rich-content',
  template: '<html-outlet [html]="contentHtml"></html-outlet>',
})
export class RichContentComponent implements OnInit {

  @Input() content: string;

  private contentHtml = '';

  constructor(private richContentService: RichContentService) { }

  ngOnInit() {
    this.contentHtml = this.content;
    this.contentHtml = this.richContentService.parseHashtags(this.contentHtml);
    this.contentHtml = this.richContentService.parseEmojies(this.contentHtml);
  }

}
