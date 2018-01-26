import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import { PostService } from '../services/post/post.service';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { DPostList } from '../services/post/post.dto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  @select(['post', 'list'])
  postList$: Observable<DPostList>;
  postList: DPostList;

  @select(['authentication', 'authenticated'])
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

  constructor(private postService: PostService) {
    this.postList$.subscribe(postList => {
      this.postList = postList;
      if (this.postList) this.loadingPosts = false;
    });
  }

  ngOnInit() {
    this.page = 0;
    this.postService.latest(this.page);
  }

  onScroll() {
    this.page++;
    this.postService.latest(this.page);
  }

}
