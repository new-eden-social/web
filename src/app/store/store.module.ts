import { NgModule } from '@angular/core';

import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { NgReduxRouterModule, NgReduxRouter } from '@angular-redux/router';
import { provideReduxForms } from '@angular-redux/form';

// Redux ecosystem
import { createLogger } from 'redux-logger';
import {persistStore, autoRehydrate} from 'redux-persist'

// The top-level reducers and epics that make up our app's logic.
import { rootReducer } from './store.reducer';
import { RootEpics } from './store.epics';
import { IAppState } from './store.interface';

@NgModule({
  imports: [NgReduxModule, NgReduxRouterModule],
  providers: [RootEpics],
})
export class StoreModule {
  constructor(public store: NgRedux<IAppState>,
              rootEpics: RootEpics,
              devTools: DevToolsExtension,
              ngReduxRouter: NgReduxRouter) {
    // Tell Redux about our reducers and epics. If the Redux DevTools
    // chrome extension is available in the browser, tell Redux about
    // it too.
    store.configureStore(
      rootReducer,
      {},
      [createLogger(), ...rootEpics.createEpics() ],
      [autoRehydrate()].concat(devTools.isEnabled() ? [devTools.enhancer(), autoRehydrate()] : []));

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
