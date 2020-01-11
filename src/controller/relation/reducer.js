import * as types from './types';

const initialState = {
  relations: []
};

export default relationReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_FOLLOWERS_SUCCESS:
      return {
        ...state,
        relations: action.payload
      };
    case types.GET_FOLLOWERS_FAILURE:
      return {
        ...state,
        relations: []
      };
    case types.GET_FOLLOWING_SUCCESS:
      return {
        ...state,
        relations: action.payload
      };
    case types.GET_FOLLOWING_FAILURE:
      return {
        ...state,
        relations: []
      };
    default:
      return state;
  }
};
