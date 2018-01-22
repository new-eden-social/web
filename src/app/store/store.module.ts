import { NgModule } from '@angular/core';

import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { NgReduxRouterModule, NgReduxRouter } from '@angular-redux/router';
import { provideReduxForms } from '@angular-redux/form';
import storage from 'redux-persist/lib/storage';

// Redux ecosystem
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';

// The top-level reducers and epics that make up our app's logic.
import { rootReducer } from './store.reducer';
import { RootEpics } from './store.epics';
import { IAppState } from './store.interface';

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['authentication', 'router']
};

@NgModule({
  imports: [
    NgReduxModule,
    NgReduxRouterModule.forRoot(),
  ],
  providers: [RootEpics],
})
export class StoreModule {
  constructor(
    public store: NgRedux<IAppState>,
    private rootEpics: RootEpics,
    private devTools: DevToolsExtension,
    private ngReduxRouter: NgReduxRouter,
  ) {
    // Tell Redux about our reducers and epics. If the Redux DevTools
    // chrome extension is available in the browser, tell Redux about
    // it too.
    store.configureStore(
      persistReducer(persistConfig, rootReducer),
      {},
      [createLogger(), ...rootEpics.createEpics()],
      [].concat(devTools.isEnabled() ? [devTools.enhancer()] : []));

    // Enable syncing of Angular router state with our Redux store.
    if (ngReduxRouter) {
      ngReduxRouter.initialize();
    }

    // Enable syncing of Angular form state with our Redux store.
    provideReduxForms(store);

    // Begin periodically persisting the store
    persistStore(store);
  }
}
