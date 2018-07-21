import { HomeComponent } from './home/home.component';
import { CharacterComponent } from './profile/character/character.component';
import { CorporationComponent } from './profile/corporation/corporation.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AllianceComponent } from './profile/alliance/alliance.component';
import { HashtagComponent } from './hashtag/hashtag.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PostListComponent } from './profile/post-list/post-list.component';
import { PostSingleComponent } from './profile/post-single/post-single.component';

export const appRoutes = [
  { path: '', component: HomeComponent },
  { path: 'hashtag/:hashtag', component: HashtagComponent },
  {
    path: 'character/:id',
    component: CharacterComponent,
    children: [
      { path: '', component: PostListComponent, data: { entity: 'character' } },
      { path: 'post/:postId', component: PostSingleComponent, data: { entity: 'character' } },
    ],
  },
  {
    path: 'corporation/:id',
    component: CorporationComponent,
    children: [
      { path: '', component: PostListComponent, data: { entity: 'corporation' } },
      { path: 'post/:postId', component: PostSingleComponent, data: { entity: 'corporation' } },
    ],
  },
  {
    path: 'alliance/:id',
    component: AllianceComponent,
    children: [
      { path: '', component: PostListComponent, data: { entity: 'alliance' } },
      { path: 'post/:postId', component: PostSingleComponent, data: { entity: 'alliance' } },
    ],
  },
  { path: 'authentication/callback', component: AuthenticationComponent },
  { path: '**', component: PageNotFoundComponent },
];
