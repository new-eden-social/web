import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { select } from '@angular-redux/store';
import { PostEffects } from '../../services/post/post.effects';
import { DPostList } from '../../services/post/post.dto';
import { DAlliance } from '../../services/alliance/alliance.dto';
import { AllianceEffects } from '../../services/alliance/alliance.effects';

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
    private allianceService: AllianceEffects,
    private postService: PostEffects,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setInitValues();

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

  private setInitValues(): void {
    this.loadingProfile = true;
    this.loadingWall = true;
    this.page = 0;
  }
}
