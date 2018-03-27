import { Injectable } from '@angular/core';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ApiService } from '../api.service';
import { PostTypes } from './post.types';
import { DPost, DPostList } from './post.dto';

@Injectable()
export class PostService extends ApiService {

  private uri = 'posts';

  /**
   * Latest posts
   * @param {number} page
   * @param {number} limit
   * @returns {Subscription}
   */
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


  hashtag(hashtag: string, page = 0, limit = 20) {
    return this.request<DPostList[]>(
      'GET',
      `${this.uri}/hashtag/${hashtag}?page=${page}&limit=${limit}`)
    .subscribe(
      response => this.ngRedux.dispatch(
        {
          type: PostTypes.GET_HASHTAG,
          payload: response,
        }),
      error => this.ngRedux.dispatch(
        {
          type: PostTypes.GET_HASHTAG,
          payload: error,
          error: true,
        }),
    );
  }

  /**
   * Character wall
   * @param {number} characterId
   * @param {number} page
   * @param {number} limit
   * @returns {Subscription}
   */
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


  /**
   * Post as character
   * @param {string} content
   * @param {"TEXT"} type
   * @param options
   * @returns {Subscription}
   */
  postAsCharacter(content: string, type: 'TEXT', options: any = {}) {
    return this.request<DPost>('POST', `${this.uri}/character`, {
      body: {
        content,
        type,
        locationId: options.locationId,
        corporationId: options.corporationId,
        allianceId: options.allianceId,
        characterId: options.characterId,
      },
    })
    .subscribe(
      response => this.ngRedux.dispatch(
        {
          type: PostTypes.POST_AS_CHARACTER,
          payload: response,
        }),
      error => this.ngRedux.dispatch(
        {
          type: PostTypes.POST_AS_CHARACTER,
          payload: error,
          error: true,
        }),);
  }

  /**
   * Get corporation wall
   * @param {number} corporationId
   * @param {number} page
   * @param {number} limit
   * @returns {Subscription}
   */
  corporationWall(corporationId: number, page = 0, limit = 20) {
    return this.request<DPostList[]>(
      'GET',
      `${this.uri}/corporation/${corporationId}?page=${page}&limit=${limit}`)
    .subscribe(
      response => this.ngRedux.dispatch(
        {
          type: PostTypes.GET_CORPORATION_WALL,
          payload: response,
        }),
      error => this.ngRedux.dispatch(
        {
          type: PostTypes.GET_CORPORATION_WALL,
          payload: error,
          error: true,
        }),
    );
  }

  /**
   * Post as corporation
   * @param {string} content
   * @param {"TEXT"} type
   * @param options
   * @returns {Subscription}
   */
  postAsCorporation(content: string, type: 'TEXT', options: any = {}) {
    return this.request<DPost>('POST', `${this.uri}/corporation`, {
      body: {
        content,
        type,
        locationId: options.locationId,
        corporationId: options.corporationId,
        allianceId: options.allianceId,
        characterId: options.characterId,
      },
    })
    .subscribe(
      response => this.ngRedux.dispatch(
        {
          type: PostTypes.POST_AS_CORPORATION,
          payload: response,
        }),
      error => this.ngRedux.dispatch(
        {
          type: PostTypes.POST_AS_CORPORATION,
          payload: error,
          error: true,
        }),);
  }

  /**
   * Get alliance wall
   * @param {number} allianceId
   * @param {number} page
   * @param {number} limit
   * @returns {Subscription}
   */
  allianceWall(allianceId: number, page = 0, limit = 20) {
    return this.request<DPostList[]>(
      'GET',
      `${this.uri}/alliance/${allianceId}?page=${page}&limit=${limit}`)
    .subscribe(
      response => this.ngRedux.dispatch(
        {
          type: PostTypes.GET_ALLIANCE_WALL,
          payload: response,
        }),
      error => this.ngRedux.dispatch(
        {
          type: PostTypes.GET_ALLIANCE_WALL,
          payload: error,
          error: true,
        }),
    );
  }

  /**
   * Post as alliance
   * @param {string} content
   * @param {"TEXT"} type
   * @param options
   * @returns {Subscription}
   */
  postAsAlliance(content: string, type: 'TEXT', options: any = {}) {
    return this.request<DPost>('POST', `${this.uri}/alliance`, {
      body: {
        content,
        type,
        locationId: options.locationId,
        corporationId: options.corporationId,
        allianceId: options.allianceId,
        characterId: options.characterId,
      },
    })
    .subscribe(
      response => this.ngRedux.dispatch(
        {
          type: PostTypes.POST_AS_ALLIANCE,
          payload: response,
        }),
      error => this.ngRedux.dispatch(
        {
          type: PostTypes.POST_AS_ALLIANCE,
          payload: error,
          error: true,
        }),);
  }

}
