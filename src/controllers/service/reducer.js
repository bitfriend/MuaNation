import * as types from './types';

const initialState = {
  categories: []
};

export default serviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload
      };
    case types.GET_CATEGORIES_FAILURE:
      return {
        ...state,
        categories: []
      };
    default:
      return state;
  }
};
