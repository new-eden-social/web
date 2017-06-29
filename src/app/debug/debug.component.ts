import { Component, OnInit } from '@angular/core';
import { ICharacter } from '../services/character/character.interface';
import { FormControl } from '@angular/forms';
import { IAlliance } from '../services/alliance/alliance.interface';
import { ICorporation } from '../services/corporation/corporation.interface';
import { SearchService } from '../services/search/search.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime'

@Component({
  selector: 'app-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.scss']
})
export class DebugComponent implements OnInit {

  searchCtrl: FormControl;
  characters: ICharacter[];
  alliances: IAlliance[];
  corporations: ICorporation[];

  constructor(private searchService: SearchService,
              private router: Router,
              private authenticationService: AuthenticationService) {
    this.searchCtrl = new FormControl();
    this.searchCtrl.valueChanges
    .debounceTime(200)
    .subscribe(name => {
      if (name.length > 4) {
        console.log('Search would happen')
      }
    })
  }

  ngOnInit() {

  }

  openCharacter(character: ICharacter) {
    this.router.navigate(['/character', character.id])
  }


  testApi() {
    this.authenticationService.initialCheck('asd')
  }
}
