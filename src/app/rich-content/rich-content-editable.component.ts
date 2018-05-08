import { Component, Output, ElementRef, EventEmitter, HostListener } from '@angular/core';
import { RichContentService } from './rich-content.service';

@Component({
  selector: 'app-rich-content-editable',
  template: '<html-outlet contenteditable="true" [html]="contentHtml"></html-outlet>',
})
export class RichContentEditableComponent {

  @Output()
  update = new EventEmitter<string>();

  public contentHtml = '';

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
    const value = this.elRef.nativeElement.textContent;
    this.update.emit(value);

    let html = value;
    // TODO: Sanitize html, as for now it should be just text
    html = this.richContentService.parseHashtags(html);
    html = this.richContentService.parseEmojies(html);
    html = this.richContentService.parseText(html);

    // No change to value (only text was entered) return
    if (html === value) {
      return;
    }

    this.saveSelection();

    // Remove text nodes but leave others
    const element = this.elRef.nativeElement;
    for (let i = 0; i < element.childNodes.length; i++) {
      const child = element.childNodes[i];
      if (child.nodeType === 3) {
        element.removeChild(child)
      }
    }

    this.contentHtml = html;
    this.restoreSelection();
  }

 private saveSelection() {
   const mainElement = this.elRef.nativeElement;

   const range = window.getSelection().getRangeAt(0);
    const preSelectionRange = range.cloneRange();
    preSelectionRange.selectNodeContents(mainElement);
    preSelectionRange.setEnd(range.startContainer, range.startOffset);
    const start = preSelectionRange.toString().length;

    this.selection = {
      start: start,
      end: start + range.toString().length,
    };
  }

  private restoreSelection() {
    const mainElement = this.elRef.nativeElement;

    const range = document.createRange();
    range.setStart(mainElement, 0);
    range.collapse(true);
    const nodeStack: Node[] = [mainElement];
    let charIndex = 0;
    let node: Node;
    let foundStart = false;
    let stop = false;

    while (!stop && (node = nodeStack.pop())) {
      if (node.nodeType === 3) {
        console.log("parentNode", node.parentNode);
        const nextCharIndex = charIndex + (<Text>node).length;
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

    console.log(range, this.selection);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }

}
