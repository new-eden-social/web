import { Injectable } from '@angular/core';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ApiService } from '../api.service';
import { DCorporation } from './corporation.dto';
import { CorporationTypes } from './corporaiton.types';

@Injectable()
export class CorporationService extends ApiService {

  private uri = 'corporations';

  /**
   * Get corporation
   * @param {number} id
   */
  get(id: number) {
    this.request<DCorporation>('GET', `${this.uri}/${id}`)
    .subscribe(
      response => this.ngRedux.dispatch(
        {
          type   : CorporationTypes.LOAD,
          payload: response,
        }),
      error => this.ngRedux.dispatch(
        {
          type   : CorporationTypes.LOAD,
          payload: error,
          error  : true,
        }),
    )
  }
}
