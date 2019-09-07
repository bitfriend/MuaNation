import * as types from './types';

const initialState = {
  loading: 0
};

export default commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOADING:
      return {
        ...state,
        loading: state.loading + 1
      };
    case types.CLEAR_LOADING:
      return {
        ...state,
        loading: state.loading - 1
      };
    default:
      return state;
  }
};
