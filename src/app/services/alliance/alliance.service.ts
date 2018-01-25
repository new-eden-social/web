import { Injectable } from '@angular/core';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ApiService } from '../api.service';
import { DAlliance } from './alliance.dto';
import { AllianceTypes } from './alliance.types';

@Injectable()
export class AllianceService extends ApiService {

  private uri = 'alliances';

  /**
   * Get alliance
   * @param {number} id
   */
  get(id: number) {
    this.request<DAlliance>('GET', `${this.uri}/${id}`)
    .subscribe(
      response => this.ngRedux.dispatch(
        {
          type   : AllianceTypes.LOAD,
          payload: response,
        }),
      error => this.ngRedux.dispatch(
        {
          type   : AllianceTypes.LOAD,
          payload: error,
          error  : true,
        }),
    )
  }
}
