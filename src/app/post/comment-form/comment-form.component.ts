import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { select } from '@angular-redux/store';
import { DCharacterShort } from '../../services/character/character.dto';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CommentEffects } from '../../services/comment/comment.effects';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit {

  @Input('postId')
  postId: string;

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

  constructor(
    private commentService: CommentEffects,
  ) {
  }

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

  submit() {
    switch (this.postAs) {
      case 'character':
        this.commentService.postAsCharacter(this.postId, this.postValue);
        break;
      case 'corporation':
        //this.commentService.postAsCorporation(this.postId, this.postValue);
        break;
      case 'alliance':
        //this.commentService.postAsAlliance(this.postId, this.postValue);
        break;
    }
    // TODO: We could wait for feedback, if error do not reset
    this.writing('');
  }
}
