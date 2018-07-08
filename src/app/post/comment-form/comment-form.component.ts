import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { DCharacterShort } from '../../services/character/character.dto';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../app.store';
import {
  PostAsAlliance, PostAsCharacter,
  PostAsCorporation,
} from '../../services/comment/comment.actions';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit {

  @Input('postId')
  postId: string;

  authenticated$: Observable<boolean>;

  character$: Observable<DCharacterShort>;
  character: DCharacterShort;

  postAs: 'character' | 'corporation' | 'alliance';
  postAsImage: string;
  postValue: string = '';
  commentHtml: string = '';

  private writingSubject = new BehaviorSubject<string>('');

  constructor(
    private store: Store<IAppState>,
  ) {
    this.authenticated$ = this.store.pipe(select('authentication', 'authenticated'));
    this.character$ = this.store.pipe(select('authentication', 'character'));
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

      this.commentHtml = hashtagHtml;
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
        this.store.dispatch(new PostAsCharacter({ postId: this.postId, content: this.postValue }));
        break;
      case 'corporation':
        this.store.dispatch(new PostAsCorporation({ postId: this.postId, content: this.postValue }));
        break;
      case 'alliance':
        this.store.dispatch(new PostAsAlliance({ postId: this.postId, content: this.postValue }));
        break;
    }
    // TODO: We could wait for feedback, if error do not reset
    this.writing('');
  }
}
