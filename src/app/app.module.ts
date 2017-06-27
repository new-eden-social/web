import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgReduxModule } from '@angular-redux/store';
import { NgReduxRouterModule } from '@angular-redux/router';
import { MaterialModule } from '@angular/material';

// App Modules
import { StoreModule } from './store/store.module';
import { NavbarModule } from './navbar/navbar.module';
import { HomeModule } from './home/home.module';

// Top Level
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { CharacterModule } from './character/character.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgReduxModule,
    NgReduxRouterModule,
    StoreModule,
    NavbarModule,
    HomeModule,
    CharacterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
