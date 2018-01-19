import { Injectable } from '@angular/core';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ApiService } from '../api.service';
import { PostTypes } from './post.types';
import { IPostResponse } from './post.interface';

@Injectable()
export class PostService extends ApiService {

  private uri = 'posts';

  all() {
    this.request<IPostResponse[]>('GET', this.uri)
    .subscribe(
      response => this.ngRedux.dispatch(
        {
          type   : PostTypes.GET_POSTS,
          payload: response,
        }),
      error => this.ngRedux.dispatch(
        {
          type   : PostTypes.GET_POSTS,
          payload: error,
          error  : true,
        }),
    )
  }

}
