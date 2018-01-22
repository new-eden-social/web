import { Component, Input, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { DCharacter, DCharacterShort } from '../services/character/character.dto';
import { PostService } from '../services/post/post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit {

  @Input()
  characterWall?: DCharacter;

  @select(['authentication', 'character'])
  character$: Observable<DCharacterShort>;
  character: DCharacterShort;

  postContent = new FormControl();

  options = {
    locationId: null,
    characterId: null,
    corporationId: null,
    allianceId: null,
  };

  constructor(private postService: PostService) {
  }

  ngOnInit() {
    this.character$.subscribe(character => this.character = character);
  }


  submit() {
    // If we try to post to character wall that isn't us, we should post on a wall
    if (this.character.id !== this.characterWall.id) {
      this.options.characterId = this.characterWall.id;
    } else {
      this.options.characterId = null;
    }

    console.log(this.postContent.value);

    this.postService.postAsCharacter(this.postContent.value, 'TEXT', this.options);
    // TODO: We could wait for feedback, if error do not reset
    this.postContent.reset();
  }
}
