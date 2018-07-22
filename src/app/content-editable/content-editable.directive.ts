import {
  Directive, ElementRef, EventEmitter, Input, OnChanges, Output,
  SimpleChange,
} from '@angular/core';

@Directive({
  selector: '[appContentEditable]',
  host: {
    '(keyup)': 'writing()',
  },
})
export class ContentEditableDirective implements OnChanges {

  @Input('contentValue')
  textValue: string;

  @Output('contentValueUpdate')
  update = new EventEmitter<string>();

  private oldValue: string = '';
  private selection: {
    start: number,
    end: number,
  };

  constructor(
    private elRef: ElementRef,
  ) {
  }

  ngOnChanges(change) {
    const changeText = <SimpleChange>change.textValue;
    if (changeText.currentValue !== this.oldValue) {
      this.refreshView();
    }
  }

  writing() {
    const value = this.elRef.nativeElement.innerText;
    this.update.emit(value);
    this.oldValue = value;
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
    const range = document.createRange();
    range.setStart(this.elRef.nativeElement, 0);
    range.collapse(true);
    let nodeStack = [this.elRef.nativeElement];
    let charIndex = 0;
    let node;
    let foundStart = false;
    let stop = false;

    while (!stop && (node = nodeStack.pop())) {
      if (node.nodeType == 3) {
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

    console.log(range, this.selection);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }

  private refreshView() {

    this.saveSelection();
    this.elRef.nativeElement.innerHTML = this.textValue;
    this.restoreSelection();
  }
}
