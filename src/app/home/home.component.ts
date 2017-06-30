import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime'
import { PostService } from '../services/post/post.service';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { IPostResponse } from '../services/post/post.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  @select(['post', 'all'])
  posts$: Observable<IPostResponse[]>;

  constructor(private postService: PostService) {
  }

  ngOnInit() {
    this.postService.all();
  }

}
