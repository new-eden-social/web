import { Action } from '@ngrx/store';
import { DComment, DCommentList } from './comment.dto';

export enum CommentActionTypes {
  GET_LATEST = '[Comment] Get latest comments for post',
  GET_LATEST_SUCCESS = '[Comment] Get latest comments for post success',
  POST_SUCCESS = '[Comment] Post comment success',
  POST_AS_CHARACTER = '[Comment] Post comment as character',
  POST_AS_CORPORATION = '[Comment] Post comment as corporation',
  POST_AS_ALLIANCE = '[Comment] Post comment as alliance',
}

export class Latest implements Action {
  readonly type = CommentActionTypes.GET_LATEST;

  constructor(public payload: { postId: string, page: number, limit: number }) {
  }
}

export class LatestSuccess implements Action {
  readonly type = CommentActionTypes.GET_LATEST_SUCCESS;

  constructor(public payload: { comments: DCommentList, postId: string }) {
  }
}

export class PostSuccess implements Action {
  readonly type = CommentActionTypes.POST_SUCCESS;

  constructor(public payload: { comment: DComment, postId: string }) {
  }
}

export class PostAsCharacter implements Action {
  readonly type = CommentActionTypes.POST_AS_CHARACTER;

  constructor(public payload: { content: string, postId: string }) {
  }
}

export class PostAsAlliance implements Action {
  readonly type = CommentActionTypes.POST_AS_ALLIANCE;

  constructor(public payload: { content: string, postId: string }) {
  }
}

export class PostAsCorporation implements Action {
  readonly type = CommentActionTypes.POST_AS_CORPORATION;

  constructor(public payload: { content: string, postId: string }) {
  }
}

export type CommentActionsUnion =
  Latest
  | LatestSuccess
  | PostSuccess
  | PostAsCharacter
  | PostAsCorporation
  | PostAsAlliance;
