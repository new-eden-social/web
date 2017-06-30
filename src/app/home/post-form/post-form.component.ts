import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { ICharacterResponse } from '../../services/character/character.interface';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

  @select(['authentication', 'character'])
  character$: Observable<ICharacterResponse>;

  constructor() { }

  ngOnInit() {
  }

}
