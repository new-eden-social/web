import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime'

import { SearchService } from '../services/search/search.service';
import { ICharacter } from '../services/character/character.interface';
import { IAlliance } from '../services/alliance/alliance.interface';
import { ICorporation } from '../services/corporation/corporation.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  searchCtrl: FormControl;
  characters: ICharacter[];
  alliances: IAlliance[];
  corporations: ICorporation[];

  constructor(private searchService: SearchService,
              private router: Router) {
    this.searchCtrl = new FormControl();
    this.searchCtrl.valueChanges
    .debounceTime(200)
    .subscribe(name => {
      if (name.length > 4) {
        return this.search(name)
      }
    })
  }

  ngOnInit() {

  }

  search(val: string) {
    return this.searchService.search(val)
    .subscribe(
      data => {
        this.characters = data.characters.slice(0, 10);
        this.alliances = data.alliances.slice(0, 10);
        this.corporations = data.corporations.slice(0, 10);
      },
    );
  }

  openCharacter(character: ICharacter) {
    this.router.navigate(['/character', character.id])
  }

}
