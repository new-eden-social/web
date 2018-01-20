import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: CharacterService) {
  }

  ngOnInit() {
    // TODO: Doesn't trigger when loading same view with different id
    let id = +this.route.snapshot.params['id'];

    this.service.get(id)
  }

}
