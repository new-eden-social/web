import { Injectable } from '@angular/core';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ApiService } from '../api.service';
import { CommentTypes } from './comment.types';
import { DComment, DCommentList } from './comment.dto';

@Injectable()
export class CommentService extends ApiService {

  private uri = 'comments';

  /**
   * Latest posts
   * @param postId
   * @param {number} page
   * @param {number} limit
   * @returns {Subscription}
   */
  latest(postId: string, page = 0, limit = 20) {
    return this.request<DCommentList[]>(
      'GET',
      `${this.uri}/${postId}/latest?page=${page}&limit=${limit}`)
    .subscribe(
      response => this.ngRedux.dispatch(
        {
          type: CommentTypes.GET_LATEST,
          payload: response,
        }),
      error => this.ngRedux.dispatch(
        {
          type: CommentTypes.GET_LATEST,
          payload: error,
          error: true,
        }),
    );
  }

  /**
   * Post as character
   * @param postId
   * @param {string} content
   * @returns {Subscription}
   */
  postAsCharacter(postId: string, content: string) {
    return this.request<DComment>('POST', `${this.uri}/${postId}/character`, {
      body: {
        content,
      },
    })
    .subscribe(
      response => this.ngRedux.dispatch(
        {
          type: CommentTypes.POST_AS_CHARACTER,
          payload: response,
        }),
      error => this.ngRedux.dispatch(
        {
          type: CommentTypes.POST_AS_CHARACTER,
          payload: error,
          error: true,
        }),);
  }

}
