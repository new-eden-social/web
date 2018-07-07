import { HomeComponent } from './home/home.component';
import { CharacterComponent } from './profile/character/character.component';
import { CorporationComponent } from './profile/corporation/corporation.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AllianceComponent } from './profile/alliance/alliance.component';
import { HashtagComponent } from './hashtag/hashtag.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const appRoutes = [
  { path: '', component: HomeComponent },
  { path: 'hashtag/:hashtag', component: HashtagComponent },
  { path: 'character/:id', component: CharacterComponent },
  { path: 'corporation/:id', component: CorporationComponent },
  { path: 'alliance/:id', component: AllianceComponent },
  { path: 'authentication/callback', component: AuthenticationComponent },
  { path: '**', component: PageNotFoundComponent },
];
