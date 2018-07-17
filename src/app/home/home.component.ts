import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import { Observable } from 'rxjs';
import { DPostList } from '../services/post/post.dto';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../app.store';
import { GetLatest } from '../services/post/post.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  postList$: Observable<DPostList>;
  postList: DPostList;

  authenticated$: Observable<boolean>;

  page: number;

  loadingPosts: boolean = true;

  hashtags = [
    {
      name: 'eve',
      posts: 3415,
    },
    {
      name: 'mining',
      posts: 1482,
    },
    {
      name: 'isk',
      posts: 1023,
    },
    {
      name: 'test',
      posts: 939,
    },
    {
      name: 'bees',
      posts: 712,
    },
    {
      name: 'killmail',
      posts: 452,
    },
  ];

  constructor(
    private store: Store<IAppState>,
  ) {
    this.postList$ = this.store.pipe(select('post', 'list', 'latest'));
    this.authenticated$ = this.store.pipe(select('authentication', 'authenticated'));
  }

  ngOnInit() {
    this.page = 0;

    this.store.dispatch(new GetLatest({ page: this.page, limit: 20 }));

    this.postList$.subscribe(postList => {
      this.postList = postList;
      if (this.postList) this.loadingPosts = false;
    });
  }

  onScroll() {
    this.page++;
    this.store.dispatch(new GetLatest({ page: this.page, limit: 20 }));
  }

}
