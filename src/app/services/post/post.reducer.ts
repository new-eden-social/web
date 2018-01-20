import { Reducer } from 'redux';
import { IPostState } from './post.interface';
import { PostTypes } from './post.types';
import { DPostList } from './post.dto';

const INITIAL_STATE: IPostState = {
  all: null,
};

export const postReducer: Reducer<IPostState> = (
  state: IPostState = INITIAL_STATE,
  action: any,
): IPostState => {
  switch (action.type) {
    case PostTypes.GET_POSTS:
      const oldData = state.all ? state.all.data : [];
      let data = [];
      console.log(state.all ? state.all.page : null, action.payload.page)
      if (!state.all || state.all.page >= action.payload.page) data = action.payload.data;
      else data = [...oldData, ...action.payload.data];

      return Object.assign({}, state, {
        all: <DPostList>{
          data,
          page: action.payload.page,
          pages: action.payload.pages,
          perPage: action.payload.perPage,
          count: action.payload.count,
        },
      });
  }
  return state;
};
