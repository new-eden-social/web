import { IPostState } from './post.interface';
import { PostActionsUnion, PostActionTypes } from './post.actions';

const INITIAL_STATE: IPostState = {
  list: null,
};

export function postReducer(
  state: IPostState = INITIAL_STATE,
  action: PostActionsUnion,
): IPostState {
  switch (action.type) {
    case PostActionTypes.GET_SUCCESS: {
      const oldPosts = state.list ? state.list.data : [];
      let posts = [];
      if (!state.list || state.list.page >= action.payload.page) posts = action.payload.data;
      else posts = [...oldPosts, ...action.payload.data];

      return {
        ...state,
        list: {
          data: posts,
          page: action.payload.page,
          pages: action.payload.pages,
          perPage: action.payload.perPage,
          count: action.payload.count,
        },
      };
    }

    case PostActionTypes.POST_SUCCESS: {
      return {
        ...state,
        list: {
          ...state.list,
          data: [action.payload, ...state.list.data],
        },
      };
    }

    default: {
      return state;
    }
  }
}
