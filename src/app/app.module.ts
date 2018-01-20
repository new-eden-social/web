import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgReduxModule } from '@angular-redux/store';
import { NgReduxRouterModule } from '@angular-redux/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Top Level
import { AppComponent } from './app.component';

// App Modules
import { StoreModule } from './store/store.module';
import { NavbarModule } from './navbar/navbar.module';
import { HomeModule } from './home/home.module';
import { CharacterModule } from './character/character.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { WelcomeModule } from './welcome/welcome.module';
import { DebugModule } from './debug/debug.module';
import { appRoutes } from './app.routes';

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
    AuthenticationModule,
    WelcomeModule,
    DebugModule,
    ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
