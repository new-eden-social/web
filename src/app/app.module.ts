import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgReduxModule } from '@angular-redux/store';
import { NgReduxRouterModule } from '@angular-redux/router';
import { MaterialModule } from '@angular/material';

// Top Level
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';

// App Modules
import { StoreModule } from './store/store.module';
import { NavbarModule } from './navbar/navbar.module';
import { HomeModule } from './home/home.module';
import { CharacterModule } from './character/character.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { WelcomeModule } from './welcome/welcome.module';
import { SidenavModule } from './sidenav/sidenav.module';
import { DebugComponent } from './debug/debug.component';
import { DebugModule } from './debug/debug.module';

@NgModule({
  declarations: [
    AppComponent,
    DebugComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgReduxModule,
    NgReduxRouterModule,
    StoreModule,
    NavbarModule,
    HomeModule,
    CharacterModule,
    AuthenticationModule,
    WelcomeModule,
    SidenavModule,
    DebugModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
