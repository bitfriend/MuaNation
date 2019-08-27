import * as types from './types';

export const setLoading = () => {
  return (dispatch) => {
    return dispatch({ type: types.SET_LOADING });
  }
}

export const clearLoading = () => {
  return (dispatch) => {
    return dispatch({ type: types.CLEAR_LOADING });
  }
}
