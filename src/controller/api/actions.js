import * as types from './types';

export const apiRequest = ({
  callback,
  baseURL = 'https://muanation.com/api',
  url,
  method,
  data = null,
  accessToken = null,
  onSuccess = () => {},
  onFailure = () => {},
  label = '',
  headers = null
}) => ({
  type: types.API_REQUEST,
  payload: {
    callback,
    baseURL,
    url,
    method,
    data,
    accessToken,
    onSuccess,
    onFailure,
    label,
    headers
  }
})

export const apiStart = label => ({
  type: types.API_START,
  payload: label
})

export const apiEnd = label => ({
  type: types.API_END,
  payload: label
})

export const accessDenied = url => ({
  type: types.ACCESS_DENIED,
  payload: { url }
})

export const apiError = error => ({
  type: types.API_ERROR,
  error
})
