import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgReduxModule } from '@angular-redux/store';
import { NgReduxRouterModule } from '@angular-redux/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material';

// Top Level
import { appRoutes } from './app.routes';
import { AppComponent } from './app.component';

// App Modules
import { StoreModule } from './store/store.module';
import { NavbarModule } from './navbar/navbar.module';
import { HomeModule } from './home/home.module';
import { CharacterModule } from './profile/character/character.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { DebugModule } from './debug/debug.module';
import { CorporationModule } from './profile/corporation/corporation.module';
import { AllianceModule } from './profile/alliance/alliance.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgReduxModule,
    NgReduxRouterModule,
    StoreModule,
    NavbarModule,
    HomeModule,
    CharacterModule,
    CorporationModule,
    AllianceModule,
    AuthenticationModule,
    DebugModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
