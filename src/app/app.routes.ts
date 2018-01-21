import { HomeComponent } from './home/home.component';
import { CharacterComponent } from './character/character.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { DebugComponent } from './debug/debug.component';

export const appRoutes = [
  { path: '', component: HomeComponent },
  { path: 'character/:id', component: CharacterComponent },
  { path: 'authentication/callback', component: AuthenticationComponent },
  { path: 'debug', component: DebugComponent },
];
