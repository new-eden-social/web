import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { DCharacterShort } from '../../services/character/character.dto';

@Component({
  selector: 'app-home-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class HomeProfileComponent implements OnInit {

  @select(['authentication', 'character'])
  character: Observable<DCharacterShort>;

  constructor() { }

  ngOnInit() {
  }

}
