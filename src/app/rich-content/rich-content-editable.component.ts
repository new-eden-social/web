import { Component, OnInit, Input, SimpleChanges, Output, ElementRef, EventEmitter, HostListener } from '@angular/core';
import { RichContentService } from './rich-content.service';

@Component({
  selector: 'app-rich-content-editable',
  template: '<html-outlet [html]="contentHtml"></html-outlet>',
})
export class RichContentEditableComponent {

  @Output()
  update = new EventEmitter<string>();


  private content = '';
  private contentHtml = '';
  private oldValue = '';
  private selection: {
    start: number,
    end: number,
  };

  constructor(
    private richContentService: RichContentService,
    private elRef: ElementRef,
    ) { }

  @HostListener('keyup')
  writing() {
    const value = this.elRef.nativeElement.innerText;

    if (this.oldValue === value) {
      return;
    }

    this.update.emit(value);
    this.oldValue = value;

    this.saveSelection();

    // Remove text nodes but leave others
    const element = this.elRef.nativeElement;
    for (let i = 0; i < element.childNodes.length; i++) {
      const child = element.childNodes[i];
      if (child.nodeType === 3) {
        element.removeChild(child)
      }
    }
    this.updateContent(value);

    this.restoreSelection();
  }

  updateContent(content: string) {
    let html = content;
    // TODO: Sanitize html, as for now it should be just text
    html = this.richContentService.parseHashtags(html);
    html = this.richContentService.parseEmojies(html);
    this.contentHtml = html;
  }

 private saveSelection() {
    const range = window.getSelection().getRangeAt(0);
    const preSelectionRange = range.cloneRange();
    preSelectionRange.selectNodeContents(this.elRef.nativeElement);
    preSelectionRange.setEnd(range.startContainer, range.startOffset);
    const start = preSelectionRange.toString().length;

    this.selection = {
      start: start,
      end: start + range.toString().length,
    };
  }

  private restoreSelection() {
    let charIndex = 0;
    const range = document.createRange();
    range.setStart(this.elRef.nativeElement, 0);
    range.collapse(true);
    const nodeStack = [this.elRef.nativeElement];
    let node;
    let foundStart = false;
    let stop = false;

    while (!stop && (node = nodeStack.pop())) {
      if (node.nodeType === 3) {
        const nextCharIndex = charIndex + node.length;
        if (!foundStart && this.selection.start >= charIndex && this.selection.start <= nextCharIndex) {
          range.setStart(node, this.selection.start - charIndex);
          foundStart = true;
        }
        if (foundStart && this.selection.end >= charIndex && this.selection.end <= nextCharIndex) {
          range.setEnd(node, this.selection.end - charIndex);
          stop = true;
        }
        charIndex = nextCharIndex;
      } else {
        let i = node.childNodes.length;
        while (i--) {
          nodeStack.push(node.childNodes[i]);
        }
      }
    }

    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }

}
