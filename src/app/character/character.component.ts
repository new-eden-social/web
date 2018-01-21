import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CharacterService } from '../services/character/character.service';
import { Observable } from 'rxjs';
import { select } from '@angular-redux/store';
import { DCharacter } from '../services/character/character.dto';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
})
export class CharacterComponent implements OnInit {

  @select(['character', 'data'])
  character$: Observable<DCharacter>;

  character: DCharacter;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: CharacterService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let id = +this.route.snapshot.params['id'];
        this.service.get(id)
      }
    });
  }

  ngOnInit() {
    this.character$.subscribe(character => this.character = character);
  }

}
