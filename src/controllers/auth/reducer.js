import * as types from './types';

const initialState = {
  facebook: {},
  instagram: {},
  user: null
};

export default authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGN_IN_WITH_FACEBOOK_SUCCESS:
      return {
        ...state,
        facebook: action.payload
      };
    case types.SIGN_IN_WITH_FACEBOOK_FAILURE:
      return {
        ...state,
        facebook: null
      };
    case types.SIGN_IN_WITH_INSTAGRAM_SUCCESS:
      return {
        ...state,
        instagram: action.payload
      };
    case types.SIGN_IN_WITH_INSTAGRAM_FAILURE:
      return {
        ...state,
        instagram: null
      };
    case types.SIGN_IN_SUCCESS:
      return {
        ...state,
        user: action.payload
      };
    case types.SIGN_IN_FAILURE:
      return {
        ...state,
        user: null
      };
    case types.SIGN_OUT_SUCCESS:
    case types.SIGN_OUT_FAILURE:
      return {
        ...state,
        user: null
      };
    case types.SIGN_UP_SUCCESS:
      return {
        ...state,
        user: action.payload
      };
    case types.SIGN_UP_FAILURE:
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
};
