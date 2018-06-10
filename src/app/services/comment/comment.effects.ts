import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { ApiService } from '../api.service';
import {
  CommentActionTypes, Latest, LatestSuccess, PostAsAlliance, PostAsCharacter, PostAsCorporation,
  PostSuccess,
} from './comment.actions';
import { DComment, DCommentList } from './comment.dto';
import { Effect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/internal/operators';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class CommentEffects extends ApiService {

  private uri = 'comments';
  @Effect()
  post$: Observable<PostSuccess> = this.actions$.pipe(
    ofType<PostAsCharacter | PostAsCorporation | PostAsAlliance>(
      CommentActionTypes.POST_AS_CHARACTER,
      CommentActionTypes.POST_AS_CORPORATION,
      CommentActionTypes.POST_AS_ALLIANCE),
    mergeMap(({ payload, type }) => {
        let path;
        switch (type) {
          case CommentActionTypes.POST_AS_CHARACTER:
            path = 'character';
            break;
          case CommentActionTypes.POST_AS_CORPORATION:
            path = 'corporation';
            break;
          case CommentActionTypes.POST_AS_ALLIANCE:
            path = 'alliance';
            break;
        }
        return this.request<DComment>('POST', `${this.uri}/${payload.postId}/${path}`, {
          body: {
            content: payload.content,
          },
        }).pipe(
          map(comment => new PostSuccess({ postId: payload.postId, comment })),
        );
      },
    ),
  );
  @Effect()
  latest$: Observable<LatestSuccess> = this.actions$.pipe(
    ofType<Latest>(CommentActionTypes.GET_LATEST),
    mergeMap(({ payload }) =>
      this.request<DCommentList>(
        'GET',
        `${this.uri}/${payload.postId}/latest?page=${payload.page}&limit=${payload.limit}`).pipe(
        map(comments => new LatestSuccess({ postId: payload.postId, comments })),
      ),
    ));
}
