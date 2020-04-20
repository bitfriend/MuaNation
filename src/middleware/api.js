import qs from 'query-string';
import { isEmpty } from 'lodash/fp';
import HttpStatus from 'http-status-codes';

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
    label
  } = action.payload;

  let { headers } = action.payload;

  if (!!label) {
    dispatch(apiStart(label));
  }
  let request = null;

  if (method === 'GET') {
    let path = baseURL + url;
    if (!isEmpty(data)) {
      path += '?' + qs.stringify(data);
    }
    headers = headers || {};
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }
    request = fetch(path, { headers });
  } else if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
    headers = headers || {};
    if (!(data instanceof FormData)) {
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }
    request = fetch(baseURL + url, {
      method,
      body: (data instanceof FormData) ? data : qs.stringify(data),
      headers
    });
  } else if (method === 'DELETE') {
    headers = headers || {};
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }
    request = fetch(baseURL + url, {
      method,
      headers
    });
  }

  if (!request) {
    return;
  }
  request.then(response => {
    if (response.ok) {
      return response.json();
    } else {
      const text = HttpStatus.getStatusText(response.status);
      throw new Error(text);
    }
  }).then(json => {
    if (json.message.success) {
      if (onSuccess) {
        if (callback) {
          onSuccess(json.data);
        } else {
          dispatch(onSuccess(json.data));
        }
      }
    } else {
      if (json.message.validation_errors) {
        const errors = [];
        for (let field in json.message.validation_errors) {
          errors.push(Object.values(json.message.validation_errors[field]));
        }
        const text = errors.join("\n");
        if (callback) {
          onFailure(text);
        } else {
          dispatch(onFailure(text));
        }
      } else if (json.error) {
        if (callback) {
          onFailure(json.error);
        } else {
          dispatch(onFailure(json.error));
        }
      } else {
        throw new Error('Unknown Error');
      }
    }
  }).catch(error => {
    console.log(url, error);
    dispatch(apiError(error));
    if (onFailure) {
      if (callback) {
        onFailure(error.message);
      } else {
        dispatch(onFailure(error.message));
      }
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
