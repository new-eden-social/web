import { Injectable } from '@angular/core';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ApiService } from '../api.service';
import { PostTypes } from './post.types';
import { DPost, DPostList } from './post.dto';

@Injectable()
export class PostService extends ApiService {

  private uri = 'posts';

  latest() {
    this.request<DPostList[]>('GET', `${this.uri}/latest`)
    .subscribe(
      response => this.ngRedux.dispatch(
        {
          type: PostTypes.GET_POSTS,
          payload: response,
        }),
      error => this.ngRedux.dispatch(
        {
          type: PostTypes.GET_POSTS,
          payload: error,
          error: true,
        }),
    );
  }


  postAsCharacter(content: string, type: 'TEXT', options: any = {}) {
    this.request<DPost>('POST', `${this.uri}/character`, {
      body: {
        content,
        type,
        locationId: options.locationId,
        corporationId: options.corporationId,
        allianceId: options.allianceId,
        characterId: options.characterId,
      },
    })
    .subscribe(console.log, console.error);
  }

}
