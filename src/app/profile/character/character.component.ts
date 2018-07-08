import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DCharacter } from '../../services/character/character.dto';
import { DPostList } from '../../services/post/post.dto';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../app.store';
import { Load } from '../../services/character/character.actions';
import { GetCharacterWall } from '../../services/post/post.actions';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
})
export class CharacterComponent implements OnInit {

  authenticated$: Observable<boolean>;
  character$: Observable<DCharacter>;
  wall$: Observable<DPostList>;

  character: DCharacter;
  wall: DPostList;

  page: number;

  loadingProfile: boolean = true;
  loadingWall: boolean = true;

  constructor(
    private store: Store<IAppState>,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.authenticated$ = this.store.pipe(select('authentication', 'authenticated'));
    this.character$ = this.store.pipe(select('character', 'data'));
    this.wall$ = this.store.pipe(select('post', 'list'));

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setInitValues();

        let id = this.route.snapshot.params['id'];
        this.store.dispatch(new Load(id));
      }
    });
  }

  ngOnInit() {
    this.character$.subscribe(character => {
      this.character = character;
      if (this.character) {
        this.loadingProfile = false;
        // After character is loaded, start loading the wall
        this.store.dispatch(new GetCharacterWall({
          characterId: this.character.id,
          page: this.page,
          limit: 20,
        }));
      }
    });
    this.wall$.subscribe(wall => {
      this.wall = wall;
      if (this.wall) this.loadingWall = false;
    });
  }

  onScroll() {
    this.page++;
    this.store.dispatch(new GetCharacterWall({
      characterId: this.character.id,
      page: this.page,
      limit: 20,
    }));
  }

  private setInitValues(): void {
    this.loadingProfile = true;
    this.loadingWall = true;
    this.page = 0;
  }

}
