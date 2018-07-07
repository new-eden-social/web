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
import { catchError, map, mergeMap, switchMap } from 'rxjs/internal/operators';
import { Observable } from 'rxjs/Rx';
import { Exception } from '../api.actions';
import { of } from 'rxjs/index';

@Injectable()
export class CommentEffects extends ApiService {

  private uri = 'comments';
  @Effect()
  post$: Observable<PostSuccess | Exception> = this.actions$.pipe(
    ofType<PostAsCharacter | PostAsCorporation | PostAsAlliance>(
      CommentActionTypes.POST_AS_CHARACTER,
      CommentActionTypes.POST_AS_CORPORATION,
      CommentActionTypes.POST_AS_ALLIANCE),
    switchMap(({ payload, type }) => {
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
          catchError(error => of(new Exception(error))),
        );
      },
    ),
  );
  @Effect()
  latest$: Observable<LatestSuccess | Exception> = this.actions$.pipe(
    ofType<Latest>(CommentActionTypes.GET_LATEST),
    switchMap(({ payload }) =>
      this.request<DCommentList>(
        'GET',
        `${this.uri}/${payload.postId}/latest?page=${payload.page}&limit=${payload.limit}`).pipe(
        map(comments => new LatestSuccess({ postId: payload.postId, comments })),
        catchError(error => of(new Exception(error))),
      ),
    ));
}
