import { Component, Input, OnInit } from '@angular/core';
import { DCharacter } from '../services/character/character.dto';
import { DCorporation } from '../services/corporation/corporation.dto';
import { DAlliance } from '../services/alliance/alliance.dto';
import { DPostList } from '../services/post/post.dto';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {

  @Input()
  characterWall: DCharacter;

  @Input()
  corporationWall: DCorporation;

  @Input()
  allianceWall: DAlliance;

  @Input()
  postList: DPostList;

  @select(['authentication', 'authenticated'])
  authenticated$: Observable<boolean>;

  constructor() {
  }

  ngOnInit() {
  }

}
