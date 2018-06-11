import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material';

// Top Level
import { appRoutes } from './app.routes';
import { AppComponent } from './app.component';

// App Modules
import { NavbarModule } from './navbar/navbar.module';
import { HomeModule } from './home/home.module';
import { CharacterModule } from './profile/character/character.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { CorporationModule } from './profile/corporation/corporation.module';
import { AllianceModule } from './profile/alliance/alliance.module';
import { HashtagModule } from './hashtag/hashtag.module';
import { metaReducers, reducers } from './store/store.reducer';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AllianceEffects } from './services/alliance/alliance.effects';
import { AuthenticationEffects } from './services/authentication/authentication.effects';
import { CharacterEffects } from './services/character/character.effects';
import { CommentEffects } from './services/comment/comment.effects';
import { CorporationEffects } from './services/corporation/corporation.effects';
import { PostEffects } from './services/post/post.effects';
import { SearchEffects } from './services/search/search.effects';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([
      AllianceEffects,
      AuthenticationEffects,
      CharacterEffects,
      CommentEffects,
      CorporationEffects,
      PostEffects,
      SearchEffects,
    ]),
    // Connects RouterModule with StoreModule
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router', // name of reducer key
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    NavbarModule,
    HomeModule,
    CharacterModule,
    CorporationModule,
    AllianceModule,
    AuthenticationModule,
    HashtagModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
