import { Reducer } from 'redux';
import { ICommentState } from './comment.interface';
import { CommentTypes } from './comment.types';
import { DCommentList } from './comment.dto';

const INITIAL_STATE: ICommentState = {
  list: {},
};

export const commentReducer: Reducer<ICommentState> = (
  state: ICommentState = INITIAL_STATE,
  action: any,
): ICommentState => {
  switch (action.type) {
    /**
     * Add posts to the end (if page same as before or less, replace)
     */
    case CommentTypes.GET_LATEST:
      const postComments = state.list[action.postId];

      const oldComments = postComments ? postComments.data : [];
      let comments = [];
      // We reverse comments, so that newest are on the bottom
      action.payload.data.reverse();
      if (!postComments || postComments.page >= action.payload.page) comments = action.payload.data;
      else comments = [...action.payload.data, ...oldComments];

      return Object.assign({}, state, {
        list: Object.assign({}, state.list, {
          [action.postId]: <DCommentList>{
            data: comments,
            page: action.payload.page,
            pages: action.payload.pages,
            perPage: action.payload.perPage,
            count: action.payload.count,
          },
        }),
      });
    /**
     * Add submitted post to the top
     */
    case CommentTypes.POST_AS_CHARACTER:
    case CommentTypes.POST_AS_CORPORATION:
    case CommentTypes.POST_AS_ALLIANCE:
      const currentPostComments = state.list[action.postId] ? state.list[action.postId].data : [];

      return Object.assign({}, state, {
        list: Object.assign({}, state.list, {
          [action.postId]: Object.assign({}, state.list[action.postId], {
            data: [...currentPostComments, action.payload],
          }),
        }),
      });

  }
  return state;
};
