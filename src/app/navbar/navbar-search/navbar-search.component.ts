import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { SearchService } from '../../services/search/search.service';
import { DCharacterName } from '../../services/character/character.dto';
import { DCorporationName } from '../../services/corporation/corporation.dto';
import { DAllianceName } from '../../services/alliance/alliance.dto';

@Component({
  selector: 'app-navbar-search',
  templateUrl: './navbar-search.component.html',
  styleUrls: ['./navbar-search.component.scss'],
})
export class NavbarSearchComponent implements OnInit {

  @select(['search', 'data', 'characters'])
  characters$: Observable<DCharacterName[]>;
  charactersLess: Observable<DCharacterName[]>;
  showCharacters: Observable<boolean>;

  @select(['search', 'data', 'corporations'])
  corporations$: Observable<DCorporationName[]>;
  corporationsLess: Observable<DCorporationName[]>;
  showCorporations: Observable<boolean>;

  @select(['search', 'data', 'alliances'])
  alliances$: Observable<DAllianceName[]>;
  alliancesLess: Observable<DAllianceName[]>;
  showAlliances: Observable<boolean>;

  searchCtrl = new FormControl();

  searchHover = false;
  searchFocus = false;

  private limit = 5;

  constructor(private router: Router, private searchService: SearchService) {

    this.searchCtrl.valueChanges
    .debounceTime(500)
    .subscribe(query => {
      if (query.length > 2) {
        this.searchService.search(query);
      } else if (this.showCharacters || this.showCorporations || this.showAlliances) {
        this.searchService.clear();
      }
    });

    this.charactersLess = this.characters$
    .map(characters => characters.splice(0, this.limit));
    this.showCharacters = this.characters$.map(characters => !!characters.length);

    this.corporationsLess = this.corporations$
    .map(corporation => corporation.splice(0, this.limit));
    this.showCorporations = this.corporations$.map(corporations => !!corporations.length);

    this.alliancesLess = this.alliances$
    .map(alliances => alliances.splice(0, this.limit));
    this.showAlliances = this.alliances$.map(alliances => !!alliances.length);
  }

  ngOnInit() {
  }

  openCharacter(character: DCharacterName) {
    this.router.navigate(['/character', character.id])
  }

  openCorporation(corporation: DCorporationName) {
    this.router.navigate(['/corporation', corporation.id])
  }

  openAlliance(alliance: DAllianceName) {
    this.router.navigate(['/alliance', alliance.id])
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
