import { Injectable } from '@angular/core';
import { combineEpics } from 'redux-observable';

@Injectable()
export class RootEpics {
  constructor() {
  }

  public createEpics() {
    return [
      // TODO: Add component epics here
    ];
  }
}
