import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DCharacter } from '../../services/character/character.dto';
import { DPost, DPostList } from '../../services/post/post.dto';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../app.store';
import { LoadCharacter } from '../../services/character/character.actions';
import { GetCharacterWall, LoadPost } from '../../services/post/post.actions';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
})
export class CharacterComponent implements OnInit {

  authenticated$: Observable<boolean>;
  character: DCharacter;

  constructor(
    private store: Store<IAppState>,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.authenticated$ = this.store.pipe(select('authentication', 'authenticated'));

    this.route.params.subscribe(() => {
      const id = this.route.snapshot.paramMap.get('id');

      this.store.pipe(select('character', 'single', id))
      .subscribe(character => {
        this.character = character;
      });

      this.store.dispatch(new LoadCharacter(id));
    });
  }
}
