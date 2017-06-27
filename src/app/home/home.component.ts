import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime'

import { SearchService } from '../services/search.service';
import { Character } from '../services/character.interface';
import { Alliance } from '../services/alliance.interface';
import { Corporation } from '../services/corporation.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  searchCtrl: FormControl;
  characters: Character[];
  alliances: Alliance[];
  corporations: Corporation[];

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

  openCharacter(character: Character) {
    this.router.navigate(['/character', character.id])
  }

}
