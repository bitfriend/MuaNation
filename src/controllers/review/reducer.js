import * as types from './types';

const initialState = {
  reviews: []
};

export default reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_REVIEWS_SUCCESS:
      return {
        ...state,
        reviews: action.payload
      };
    case types.GET_REVIEWS_FAILURE:
      return {
        ...state,
        reviews: []
      };
    default:
      return state;
  }
};
