import { Reducer } from 'redux';
import { IPostState } from './post.interface';
import { PostTypes } from './post.types';
import { DPostList } from './post.dto';

const INITIAL_STATE: IPostState = {
  list: null,
};

export const postReducer: Reducer<IPostState> = (
  state: IPostState = INITIAL_STATE,
  action: any,
): IPostState => {
  switch (action.type) {
    /**
     * Add posts to the end (if page same as before or less, replace)
     */
    case PostTypes.GET_LATEST:
    case PostTypes.GET_CHARACTER_WALL:
      const oldPosts = state.list ? state.list.data : [];
      let posts = [];
      if (!state.list || state.list.page >= action.payload.page) posts = action.payload.data;
      else posts = [...oldPosts, ...action.payload.data];

      return Object.assign({}, state, {
        list: <DPostList>{
          data: posts,
          page: action.payload.page,
          pages: action.payload.pages,
          perPage: action.payload.perPage,
          count: action.payload.count,
        },
      });
    /**
     * Add submitted post to the top
     */
    case PostTypes.SUBMIT_POST:
      return Object.assign({}, state, {
        list: <DPostList> Object.assign({}, state.list, {
          data: [action.payload, ...state.list.data],
        }),
      });

  }
  return state;
};
