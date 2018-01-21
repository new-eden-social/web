import { Reducer } from 'redux';
import { IPostState } from './post.interface';
import { PostTypes } from './post.types';
import { DPostList } from './post.dto';

const INITIAL_STATE: IPostState = {
  latest: null,
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
      const oldData = state.latest ? state.latest.data : [];
      let data = [];
      if (!state.latest || state.latest.page >= action.payload.page) data = action.payload.data;
      else data = [...oldData, ...action.payload.data];

      return Object.assign({}, state, {
        latest: <DPostList>{
          data,
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
      console.log('should submit')
      return Object.assign({}, state, {
        latest: <DPostList> Object.assign({}, state.latest, {
          data: [action.payload, ...state.latest.data],
        }),
      });

  }
  return state;
};
