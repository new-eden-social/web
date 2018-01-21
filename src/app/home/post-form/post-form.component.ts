import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { PostService } from '../../services/post/post.service';
import { DCharacterShort } from '../../services/character/character.dto';

@Component({
  selector: 'app-home-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class HomePostFormComponent implements OnInit {

  @select(['authentication', 'character'])
  character$: Observable<DCharacterShort>;

  postContent = new FormControl();

  constructor(private postService: PostService) { }

  ngOnInit() {
  }


  submit() {
    this.postService.postAsCharacter(this.postContent.value, 'TEXT');
    // TODO: We could weit for feedback, if error do not reset
    this.postContent.reset();
  }
}
