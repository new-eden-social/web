import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DPostList } from '../services/post/post.dto';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PostEffects } from '../services/post/post.effects';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../app.store';
import { GetHashtag } from '../services/post/post.actions';

@Component({
  selector: 'app-hashtag',
  templateUrl: './hashtag.component.html',
  styleUrls: ['./hashtag.component.scss'],
})
export class HashtagComponent implements OnInit {

  authenticated$: Observable<boolean>;

  wall$: Observable<DPostList>;
  wall: DPostList;

  loadingWall: boolean = true;
  page: number = 0;
  hashtag: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostEffects,
    private store: Store<IAppState>,
  ) {
    this.authenticated$ = this.store.pipe(select('authentication', 'authenticated'));

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadingWall = true;
        this.page = 0;
        this.hashtag = this.route.snapshot.params['hashtag'];
        this.wall$ = this.store.pipe(select('post', 'list', `hashtag:${this.hashtag}`));
        this.store.dispatch(new GetHashtag({
          hashtag: this.hashtag,
          page: this.page,
          limit: 20,
        }));
      }
    });
  }

  ngOnInit() {
    this.wall$.subscribe(wall => {
      this.wall = wall;
      if (this.wall) this.loadingWall = false;
    });
  }

}
