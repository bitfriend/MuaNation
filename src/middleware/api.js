import qs from 'query-string';
import { isEmpty } from 'lodash/fp';
import { API_REQUEST } from '../controller/api/types';
import { accessDenied, apiError, apiStart, apiEnd } from '../controller/api/actions';

export default apiMiddleware = ({ dispatch }) => next => action => {
  if (!action.type) {
    console.log('api middleware', action);
  }
  next(action);

  if (action.type !== API_REQUEST) {
    return;
  }

  const {
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
  } = action.payload;

  if (!!label) {
    dispatch(apiStart(label));
  }
  let operation = null;

  if (method === 'GET') {
    let path = baseURL + url;
    if (!isEmpty(data)) {
      path += '?' + qs.stringify(data);
    }
    operation = fetch(path);
  } else if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
    operation = fetch(baseURL + url, {
      method,
      body: JSON.stringify(data),
      headers: headers || {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${accessToken}`
      }
    });
  } else if (method === 'DELETE') {
    operation = fetch(baseURL + url, {
      method
    });
  }

  if (!operation) {
    return;
  }
  operation.then(response => response.json()).then(json => {
    if (callback) {
      onSuccess(json);
    } else {
      dispatch(onSuccess(json));
    }
  }).catch(error => {
    console.log(url, error);
    dispatch(apiError(error));
    if (callback) {
      onFailure(error);
    } else {
      dispatch(onFailure(error));
    }

    if (error.response && error.response.status === 403) {
      dispatch(accessDenied(window.location.pathname));
    }
  }).finally(() => {
    if (!!label) {
      dispatch(apiEnd(label));
    }
  });
}
