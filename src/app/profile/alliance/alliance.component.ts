import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { select } from '@angular-redux/store';
import { PostService } from '../../services/post/post.service';
import { DPostList } from '../../services/post/post.dto';
import { DCorporation } from '../../services/corporation/corporation.dto';
import { CorporationService } from '../../services/corporation/corporation.service';
import { DAlliance } from '../../services/alliance/alliance.dto';
import { AllianceService } from '../../services/alliance/alliance.service';

@Component({
  selector: 'app-alliance',
  templateUrl: './alliance.component.html',
  styleUrls: ['./alliance.component.scss'],
})
export class AllianceComponent implements OnInit {

  @select(['authentication', 'authenticated'])
  authenticated$: Observable<boolean>;

  @select(['alliance', 'data'])
  alliance$: Observable<DAlliance>;

  @select(['post', 'list'])
  wall$: Observable<DPostList>;

  alliance: DAlliance;
  wall: DPostList;

  page: number;

  loadingProfile: boolean = true;
  loadingWall: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private allianceService: AllianceService,
    private postService: PostService,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadingProfile = true;
        this.loadingWall = true;
        this.page = 0;
        let id = +this.route.snapshot.params['id'];
        this.allianceService.get(id);
        this.postService.allianceWall(id);
      }
    });
  }

  ngOnInit() {
    this.alliance$.subscribe(alliance => {
      this.alliance = alliance;
      if (this.alliance) this.loadingProfile = false;
    });
    this.wall$.subscribe(wall => {
      this.wall = wall;
      if (this.wall) this.loadingWall = false;
    });
  }

  onScroll() {
    this.page++;
    this.postService.allianceWall(this.alliance.id, this.page);
  }

}
