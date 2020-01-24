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

export const changeTheme = (name) => {
  return (dispatch) => {
    return dispatch({ type: types.CHANGE_THEME, payload: name });
  }
}

export const changeStatusBar = (config) => {
  return (dispatch) => {
    return dispatch({ type: types.CHANGE_STATUS_BAR, payload: config });
  }
}
