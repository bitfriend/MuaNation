import * as types from './types';

const initialState = {
  user: {}
};

export default authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGN_IN_SUCCESS:
      return {
        ...state,
        user: action.payload
      };
    case types.SIGN_IN_FAILURE:
      return {
        ...state,
        user: {}
      };
    case types.SIGN_OUT_SUCCESS:
    case types.SIGN_OUT_FAILURE:
      return {
        ...state,
        user: {}
      };
    case types.SIGN_UP_SUCCESS:
      return {
        ...state,
        user: action.payload
      };
    case types.SIGN_UP_FAILURE:
      return {
        ...state,
        user: {}
      };
    default:
      return state;
  }
};
