import * as types from './types';

const initialState = {
  isLoading: false
};

export default apiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.API_START:
      return {
        ...state,
        isLoading: true
      };
    case types.API_END:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};
