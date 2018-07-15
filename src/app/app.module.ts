import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule, MatSnackBarModule } from '@angular/material';
import { appRoutes } from './app.routes';
import { AppComponent } from './app.component';
import { NavbarModule } from './navbar/navbar.module';
import { HomeModule } from './home/home.module';
import { CharacterModule } from './profile/character/character.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { CorporationModule } from './profile/corporation/corporation.module';
import { AllianceModule } from './profile/alliance/alliance.module';
import { HashtagModule } from './hashtag/hashtag.module';
import { effects, metaReducers, reducers } from './app.store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { ApiService } from './services/api.service';
import { httpInterceptorProviders } from './http-interceptors';
import { PageNotFoundModule } from './page-not-found/page-not-found.module';
import { NotificationService } from './services/notification/notification.service';
import {TransferHttpCacheModule} from '@nguniversal/common';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' }),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    // Connects RouterModule with StoreModule
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router', // name of reducer key
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    BrowserModule.withServerTransition({appId: 'my-app'}),
    TransferHttpCacheModule,
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
    MatSnackBarModule,
    PageNotFoundModule,
  ],
  providers: [
    httpInterceptorProviders,
    ApiService,
    NotificationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
