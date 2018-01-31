import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { DPostList } from '../services/post/post.dto';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PostService } from '../services/post/post.service';

@Component({
  selector: 'app-hashtag',
  templateUrl: './hashtag.component.html',
  styleUrls: ['./hashtag.component.scss'],
})
export class HashtagComponent implements OnInit {

  @select(['authentication', 'authenticated'])
  authenticated$: Observable<boolean>;

  @select(['post', 'list'])
  wall$: Observable<DPostList>;
  wall: DPostList;

  loadingWall: boolean = true;
  page: number = 0;
  hashtag: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadingWall = true;
        this.page = 0;
        this.hashtag = this.route.snapshot.params['hashtag'];
        this.postService.hashtag(this.hashtag);
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
