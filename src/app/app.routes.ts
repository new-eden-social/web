import { HomeComponent } from './home/home.component';
import { CharacterComponent } from './character/character.component';

export const appRoutes = [
  { path: '', component: HomeComponent },
  { path: 'character/:id', component: CharacterComponent },
];
