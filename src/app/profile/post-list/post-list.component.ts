import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/index';
import { DPostList } from '../../services/post/post.dto';
import { select, Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { IAppState } from '../../app.store';
import {
  GetAllianceWall, GetCharacterWall,
  GetCorporationWall,
} from '../../services/post/post.actions';
import { DCharacter } from '../../services/character/character.dto';
import { DCorporation } from '../../services/corporation/corporation.dto';
import { DAlliance } from '../../services/alliance/alliance.dto';
import { filter } from 'rxjs/internal/operators';
import {
  SubscribeToAllianceWall,
  SubscribeToCharacterWall, SubscribeToCorporationWall,
} from '../../services/websocket/websocket.actions';

@Component({
  selector: 'app-profile-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {

  websocketAuthenticated$: Observable<boolean>;

  entity$: Observable<DCharacter | DCorporation | DAlliance>;
  wall$: Observable<DPostList>;
  page = 0;
  entityId: string;
  entityType: 'character' | 'corporation' | 'alliance';

  constructor(
    private store: Store<IAppState>,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.websocketAuthenticated$ = this.store.pipe(select('websocket', 'authenticated'));

    this.route.params.subscribe(() => {
      this.entityId = this.route.parent.snapshot.paramMap.get('id');
      this.entityType = <'character' | 'corporation' | 'alliance'>this.route.snapshot.data.entity;

      this.wall$ = this.store.pipe(select('post', 'list', `${this.entityType}:${this.entityId}`));
      this.entity$ = this.store.pipe(select(this.entityType, 'single', this.entityId));

      this.loadWallForType(this.entityType);
    });
  }

  loadWallForType(type: 'character' | 'corporation' | 'alliance') {
    switch (type) {
      case 'character':
        this.store.dispatch(new GetCharacterWall({
          characterId: this.entityId,
          page: this.page,
          limit: 20,
        }));
        this.websocketAuthenticated$.pipe(
          filter(authenticated => authenticated),
        ).subscribe(() => {
          this.store.dispatch(new SubscribeToCharacterWall({
            characterId: this.entityId,
          }));
        });
        break;
      case 'corporation':
        this.store.dispatch(new GetCorporationWall({
          corporationId: this.entityId,
          page: this.page,
          limit: 20,
        }));
        this.websocketAuthenticated$.pipe(
          filter(authenticated => authenticated),
        ).subscribe(() => {
          this.store.dispatch(new SubscribeToCorporationWall({
            corporationId: this.entityId,
          }));
        });
        break;
      case 'alliance':
        this.store.dispatch(new GetAllianceWall({
          allianceId: this.entityId,
          page: this.page,
          limit: 20,
        }));
        this.websocketAuthenticated$.pipe(
          filter(authenticated => authenticated),
        ).subscribe(() => {
          this.store.dispatch(new SubscribeToAllianceWall({
            allianceId: this.entityId,
          }));
        });
        break;
    }
  }

  onScroll() {
    this.page++;
    this.loadWallForType(this.entityType);
  }

}
