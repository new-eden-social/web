import { Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { DCharacter, DCharacterShort } from '../services/character/character.dto';
import { PostService } from '../services/post/post.service';
import { DCorporation } from '../services/corporation/corporation.dto';
import { DAlliance } from '../services/alliance/alliance.dto';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PostFormComponent implements OnInit {

  @Input()
  characterWall?: DCharacter;

  @Input()
  corporationWall?: DCorporation;

  @Input()
  allianceWall?: DAlliance;

  @select(['authentication', 'character'])
  character$: Observable<DCharacterShort>;
  character: DCharacterShort;

  options = {
    locationId: null,
    characterId: null,
    corporationId: null,
    allianceId: null,
  };

  postAs: 'character' | 'corporation' | 'alliance';
  postAsImage: string;
  postValue: string = '';
  postHtml: string = '';
  private writingSubject = new BehaviorSubject<string>('');

  constructor(private postService: PostService) {
  }

  ngOnInit() {
    this.character$.subscribe(character => {
      this.character = character;
      this.setCharacter();
    });

    this.writingSubject.subscribe(value => {
      this.postValue = value;
      value = value.replace(
        /#(\w*[0-9a-zA-Z]+\w*[0-9a-zA-Z])/g,
        (hashtag) => `<a href="" class="input-field-link">${hashtag}</a>`);
      this.postHtml = value;
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
    // If we try to post to character wall that isn't us, we should post on a wall
    if (this.characterWall && (this.character.id !== this.characterWall.id)) {
      this.options.characterId = this.characterWall.id;
    } else {
      this.options.characterId = null;
    }

    // If we try to post as corporation to own corporation wall, we shouldn't post on a wall
    if (this.corporationWall && (this.postAs !== 'corporation' || this.character.corporation.id !== this.corporationWall.id)) {
      this.options.corporationId = this.corporationWall.id;
    } else {
      this.options.corporationId = null;
    }

    // If we try to post as alliance and we are in alliance, on the alliance wall that is our
    // alliance we shouldn't post on a wall
    if (this.allianceWall && (this.postAs !== 'alliance' ||
        ( !this.character.corporation.alliance || this.character.corporation.alliance.id !== this.allianceWall.id)
      )) {
      this.options.allianceId = this.allianceWall.id;
    } else {
      this.options.allianceId = null;
    }

    switch (this.postAs) {
      case 'character':
        this.postService.postAsCharacter(this.postValue, 'TEXT', this.options);
        break;
      case 'corporation':
        this.postService.postAsCorporation(this.postValue, 'TEXT', this.options);
        break;
      case 'alliance':
        this.postService.postAsAlliance(this.postValue, 'TEXT', this.options);
        break;
    }
    // TODO: We could wait for feedback, if error do not reset
    this.writing('');
  }
}
