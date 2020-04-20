import * as types from './types';

const initialState = {
  user: {}
};

export default authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGN_IN:
      return {
        ...state,
        user: action.payload
      };
    case types.SIGN_OUT:
      return {
        ...state,
        user: {}
      };
    case types.SIGN_UP:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};
