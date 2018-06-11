import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DCharacterName } from '../../services/character/character.dto';
import { DCorporationName } from '../../services/corporation/corporation.dto';
import { DAllianceName } from '../../services/alliance/alliance.dto';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../store/store.reducer';
import { debounceTime, map, tap } from 'rxjs/internal/operators';
import { Clear, Search } from '../../services/search/search.actions';

@Component({
  selector: 'app-navbar-search',
  templateUrl: './navbar-search.component.html',
  styleUrls: ['./navbar-search.component.scss'],
})
export class NavbarSearchComponent implements OnInit {

  characters$: Observable<DCharacterName[]>;
  charactersLess: Observable<DCharacterName[]>;
  showCharacters: Observable<boolean>;

  corporations$: Observable<DCorporationName[]>;
  corporationsLess: Observable<DCorporationName[]>;
  showCorporations: Observable<boolean>;

  alliances$: Observable<DAllianceName[]>;
  alliancesLess: Observable<DAllianceName[]>;
  showAlliances: Observable<boolean>;

  searchCtrl = new FormControl();

  searchHover = false;
  searchFocus = false;

  private limit = 5;

  constructor(
    private store: Store<IAppState>,
    private router: Router,
  ) {
    this.characters$ = this.store.pipe(select('search', 'data', 'characters'));
    this.corporations$ = this.store.pipe(select('search', 'data', 'corporations'));
    this.alliances$ = this.store.pipe(select('search', 'data', 'alliances'));

    this.searchCtrl.valueChanges.pipe(
      debounceTime(500),
      tap(query => {
        if (query.length > 2) {
          this.store.dispatch(new Search(query));
        } else if (this.showCharacters || this.showCorporations || this.showAlliances) {
          this.store.dispatch(new Clear());
        }
      }),
    );

    this.charactersLess = this.characters$.pipe(
      map(characters => characters.splice(0, this.limit)),
    );
    this.showCharacters = this.characters$.pipe(
      map(characters => !!characters.length),
    );

    this.corporationsLess = this.corporations$.pipe(
      map(corporation => corporation.splice(0, this.limit)),
    );
    this.showCorporations = this.corporations$.pipe(
      map(corporations => !!corporations.length),
    );

    this.alliancesLess = this.alliances$.pipe(
      map(alliances => alliances.splice(0, this.limit)),
    );
    this.showAlliances = this.alliances$.pipe(
      map(alliances => !!alliances.length),
    );
  }

  ngOnInit() {
  }

  openCharacter(character: DCharacterName) {
    this.router.navigate(['/character', character.id]);
  }

  openCorporation(corporation: DCorporationName) {
    this.router.navigate(['/corporation', corporation.id]);
  }

  openAlliance(alliance: DAllianceName) {
    this.router.navigate(['/alliance', alliance.id]);
  }

  leftSearch() {
    this.searchHover = false;
  }

  enterSearch() {
    this.searchHover = true;
  }

  toggleBlur() {
    this.searchFocus = false;
  }

  toggleFocus() {
    this.searchFocus = true;
  }
}
