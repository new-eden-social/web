import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CharacterService } from '../services/character/character.service';
import { Observable } from 'rxjs';
import { select } from '@angular-redux/store';
import { DCharacter } from '../services/character/character.dto';
import { PostService } from '../services/post/post.service';
import { DPostList } from '../services/post/post.dto';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
})
export class CharacterComponent implements OnInit {

  @select(['authentication', 'authenticated'])
  authenticated$: Observable<boolean>;

  @select(['character', 'data'])
  character$: Observable<DCharacter>;

  @select(['post', 'list'])
  wall$: Observable<DPostList>;

  character: DCharacter;
  wall: DPostList;

  page: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private characterService: CharacterService,
    private postService: PostService,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.page = 0;
        let id = +this.route.snapshot.params['id'];
        this.characterService.get(id);
        this.postService.characterWall(id);
      }
    });
  }

  ngOnInit() {
    this.character$.subscribe(character => this.character = character);
    this.wall$.subscribe(wall => this.wall = wall);
  }

  onScroll() {
    this.page++;
    this.postService.characterWall(this.character.id, this.page);
  }

}
