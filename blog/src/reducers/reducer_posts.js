import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case DELETE_POST:
      return _.omit(state, action.payload);
    case FETCH_POST:
      // ES5
      // const post = action.payload.data;
      // const newState = { ...state };
      // newState[post.id] = post;
      // return newState;
      return { ...state, [action.payload.data.id]: action.payload.data };
    case FETCH_POSTS:
      // console.log(action.payload.data); //displays an array [post1, post2]
      // need to refactor to an object
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}
