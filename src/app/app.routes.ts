import { HomeComponent } from './home/home.component';
import { CharacterComponent } from './profile/character/character.component';
import { CorporationComponent } from './profile/corporation/corporation.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { DebugComponent } from './debug/debug.component';
import { AllianceComponent } from './profile/alliance/alliance.component';

export const appRoutes = [
  { path: '', component: HomeComponent },
  { path: 'character/:id', component: CharacterComponent },
  { path: 'corporation/:id', component: CorporationComponent },
  { path: 'alliance/:id', component: AllianceComponent },
  { path: 'authentication/callback', component: AuthenticationComponent },
  { path: 'debug', component: DebugComponent },
];
