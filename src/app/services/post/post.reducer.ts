import { Reducer } from 'redux';
import { IPostState } from './post.interface';
import { PostTypes } from './post.types';

const INITIAL_STATE: IPostState = {
  all: null,
};

export const postReducer: Reducer<IPostState> = (
  state: IPostState = INITIAL_STATE,
  action: any,
): IPostState => {
  switch (action.type) {
    case PostTypes.GET_POSTS:
      return Object.assign({}, state, {
        all: action.payload,
      });
  }
  return state;
};
