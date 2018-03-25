import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { select } from '@angular-redux/store';
import { PostService } from '../../services/post/post.service';
import { DPostList } from '../../services/post/post.dto';
import { DCorporation } from '../../services/corporation/corporation.dto';
import { CorporationService } from '../../services/corporation/corporation.service';

@Component({
  selector: 'app-corporation',
  templateUrl: './corporation.component.html',
  styleUrls: ['./corporation.component.scss'],
})
export class CorporationComponent implements OnInit {

  @select(['authentication', 'authenticated'])
  authenticated$: Observable<boolean>;

  @select(['corporation', 'data'])
  corporation$: Observable<DCorporation>;

  @select(['post', 'list'])
  wall$: Observable<DPostList>;

  corporation: DCorporation;
  wall: DPostList;

  page: number;

  loadingProfile: boolean = true;
  loadingWall: boolean = true;

  allianceName: string;
  allianceId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private corporationService: CorporationService,
    private postService: PostService,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setInitValues();

        let id = +this.route.snapshot.params['id'];
        this.corporationService.get(id);
        this.postService.corporationWall(id);
      }
    });
  }

  ngOnInit() {
    this.corporation$.subscribe(corporation => {
      this.corporation = corporation;
      if (this.corporation) this.loadingProfile = false;
      if (this.corporation && this.corporation.alliance) {
        this.allianceId = this.corporation.alliance.id;
        this.allianceName = this.corporation.alliance.name;
      }
    });
    this.wall$.subscribe(wall => {
      this.wall = wall;
      if (this.wall) this.loadingWall = false;
    });
  }

  onScroll() {
    this.page++;
    this.postService.corporationWall(this.corporation.id, this.page);
  }

  private setInitValues(): void {
    this.loadingProfile = true;
    this.loadingWall = true;
    this.page = 0;
  }

}
