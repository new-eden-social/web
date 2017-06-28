import { HomeComponent } from './home/home.component';
import { CharacterComponent } from './character/character.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { WelcomeComponent } from './welcome/welcome.component';

export const appRoutes = [
  { path: '', component: HomeComponent },
  { path: 'character/:id', component: CharacterComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'authentication/callback', component: AuthenticationComponent },
];
