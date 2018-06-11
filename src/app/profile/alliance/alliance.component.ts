import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DPostList } from '../../services/post/post.dto';
import { DAlliance } from '../../services/alliance/alliance.dto';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../app.store';
import { Load } from '../../services/alliance/alliance.actions';
import { GetAllianceWall } from '../../services/post/post.actions';

@Component({
  selector: 'app-alliance',
  templateUrl: './alliance.component.html',
  styleUrls: ['./alliance.component.scss'],
})
export class AllianceComponent implements OnInit {

  authenticated$: Observable<boolean>;

  alliance$: Observable<DAlliance>;
  wall$: Observable<DPostList>;

  alliance: DAlliance;
  wall: DPostList;

  page: number;

  loadingProfile: boolean = true;
  loadingWall: boolean = true;

  constructor(
    private store: Store<IAppState>,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.authenticated$ = this.store.pipe(select('authentication', 'authenticated'));
    this.alliance$ = this.store.pipe(select('alliance', 'data'));
    this.wall$ = this.store.pipe(select('post', 'list'));

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setInitValues();

        let id = this.route.snapshot.params['id'];
        this.store.dispatch(new Load(id));
        this.store.dispatch(new GetAllianceWall({
          allianceId: id,
          page: this.page,
          limit: 20,
        }));
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
    this.store.dispatch(new GetAllianceWall({
      allianceId: this.alliance.id,
      page: this.page,
      limit: 20,
    }));
  }

  private setInitValues(): void {
    this.loadingProfile = true;
    this.loadingWall = true;
    this.page = 0;
  }
}
