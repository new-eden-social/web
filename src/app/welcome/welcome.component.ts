import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../store/store.interface';
import { Observable } from 'rxjs';
import { ICharacter } from '../services/character/character.interface';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {

  @select(['authentication', 'character'])
  character$: Observable<ICharacter>;
  character: ICharacter;

  missed = [
    {
      title: 'Deleniti nisi dolor possimus',
      description: 'Deleniti nisi dolor possimus. Quo numquam eos cum ut et quaerat atque eius. Molestiae voluptatem quibusdam minima aliquam placeat voluptas vero quos. Inventore perferendis aut molestiae praesentium. Eaque dolore fugit corrupti quis. Est omnis et illum.',
      type: 'news',
    },
    {
      title: 'Deleniti nisi dolor possimus',
      description: 'Deleniti nisi dolor possimus. Quo numquam eos cum ut et quaerat atque eius. Molestiae voluptatem quibusdam minima aliquam placeat voluptas vero quos. Inventore perferendis aut molestiae praesentium. Eaque dolore fugit corrupti quis. Est omnis et illum.',
      type: 'news',
    },
    {
      title: 'Deleniti nisi dolor possimus',
      description: 'Deleniti nisi dolor possimus. Quo numquam eos cum ut et quaerat atque eius. Molestiae voluptatem quibusdam minima aliquam placeat voluptas vero quos. Inventore perferendis aut molestiae praesentium. Eaque dolore fugit corrupti quis. Est omnis et illum.',
      type: 'news',
    },
    {
      title: 'Deleniti nisi dolor possimus',
      description: 'Deleniti nisi dolor possimus. Quo numquam eos cum ut et quaerat atque eius. Molestiae voluptatem quibusdam minima aliquam placeat voluptas vero quos. Inventore perferendis aut molestiae praesentium. Eaque dolore fugit corrupti quis. Est omnis et illum.',
      type: 'news',
    },
    {
      title: 'Deleniti nisi dolor possimus',
      description: 'Deleniti nisi dolor possimus. Quo numquam eos cum ut et quaerat atque eius. Molestiae voluptatem quibusdam minima aliquam placeat voluptas vero quos. Inventore perferendis aut molestiae praesentium. Eaque dolore fugit corrupti quis. Est omnis et illum.',
      type: 'news',
    },
  ];

  constructor(private ngRedux: NgRedux<IAppState>) {

    this.character$.subscribe(character => this.character = character);
  }

  ngOnInit() {
  }

}
