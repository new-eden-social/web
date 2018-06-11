import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DCharacterShort } from '../../services/character/character.dto';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../store/store.reducer';

@Component({
  selector: 'app-home-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class HomeProfileComponent implements OnInit {

  character$: Observable<DCharacterShort>;

  constructor(
    private store: Store<IAppState>,
  ) {
    this.character$ = this.store.pipe(select('authentication', 'character'))
  }

  ngOnInit() {
  }

}
