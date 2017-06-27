import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CharacterService } from '../services/character.service';
import { Character } from '../services/character.interface';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css'],
})
export class CharacterComponent implements OnInit {

  character: Character;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: CharacterService) {
  }

  ngOnInit() {
    let id = +this.route.snapshot.params['id'];

    this.service.get(id)
    .subscribe((character: Character) => this.character = character);
  }

}
