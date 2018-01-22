import { Injectable } from '@angular/core';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ApiService } from '../api.service';
import { PostTypes } from './post.types';
import { DPost, DPostList } from './post.dto';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PostService extends ApiService {

  private uri = 'posts';

  latest(page = 0, limit = 20) {
    return this.request<DPostList[]>('GET', `${this.uri}/latest?page=${page}&limit=${limit}`)
    .subscribe(
      response => this.ngRedux.dispatch(
        {
          type: PostTypes.GET_LATEST,
          payload: response,
        }),
      error => this.ngRedux.dispatch(
        {
          type: PostTypes.GET_LATEST,
          payload: error,
          error: true,
        }),
    );
  }

  characterWall(characterId: number, page = 0, limit = 20) {
    return this.request<DPostList[]>(
      'GET',
      `${this.uri}/character/${characterId}?page=${page}&limit=${limit}`)
    .subscribe(
      response => this.ngRedux.dispatch(
        {
          type: PostTypes.GET_CHARACTER_WALL,
          payload: response,
        }),
      error => this.ngRedux.dispatch(
        {
          type: PostTypes.GET_CHARACTER_WALL,
          payload: error,
          error: true,
        }),
    );
  }


  postAsCharacter(content: string, type: 'TEXT', options: any = {}) {
    return this.request<DPost>('POST', `${this.uri}/character`, {
      body: {
        post: {
          content,
          type,
          locationId: options.locationId,
          corporationId: options.corporationId,
          allianceId: options.allianceId,
          characterId: options.characterId,
        },
      },
    })
    .subscribe(
      response => this.ngRedux.dispatch(
        {
          type: PostTypes.SUBMIT_POST,
          payload: response,
        }),
      error => this.ngRedux.dispatch(
        {
          type: PostTypes.SUBMIT_POST,
          payload: error,
          error: true,
        }),);
  }

}
