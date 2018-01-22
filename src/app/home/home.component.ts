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

  @select(['post', 'list', 'data'])
  latest$: Observable<DPostList[]>;

  @select(['authentication', 'authenticated'])
  authenticated$: Observable<boolean>;

  page: number;

  constructor(private postService: PostService) {
  }

  ngOnInit() {
    this.page = 0;
    this.postService.latest(this.page);
  }

  onScroll() {
    this.page++;
    this.postService.latest(this.page)
  }

}
