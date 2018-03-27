import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { select } from '@angular-redux/store';
import { DCharacterShort } from '../../services/character/character.dto';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {

  @select(['authentication', 'authenticated'])
  authenticated$: Observable<boolean>;

  @select(['authentication', 'character'])
  character$: Observable<DCharacterShort>;
  character: DCharacterShort;

  postAs: 'character' | 'corporation' | 'alliance';
  postAsImage: string;
  postValue: string = '';
  postHtml: string = '';

  private writingSubject = new BehaviorSubject<string>('');

  constructor() { }

  ngOnInit() {
    this.character$.subscribe(character => {
      this.character = character;
      this.setCharacter();
    });

    this.writingSubject.subscribe(value => {
      this.postValue = value;

      const hashtagHtml = value.replace(
        /#(\w*[0-9a-zA-Z]+\w*[0-9a-zA-Z])/g,
        (hashtag) => `<a href="" class="input-field-link">${hashtag}</a>`);

      this.postHtml = hashtagHtml;
    });
  }

  writing(value: string) {
    this.writingSubject.next(value);
  }

  setCharacter() {
    this.postAs = 'character';
    this.postAsImage = this.character.portrait.px64x64;
  }

  setCorporation() {
    this.postAs = 'corporation';
    this.postAsImage = this.character.corporation.icon.px64x64;
  }

  setAlliance() {
    this.postAs = 'alliance';
    this.postAsImage = this.character.corporation.alliance.icon.px64x64;
  }
}
