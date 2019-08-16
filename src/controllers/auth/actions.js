import { AccessToken, GraphRequest, GraphRequestManager, LoginManager } from 'react-native-fbsdk';
import qs from 'qs';

import * as types from './types';
import { setLoading, clearLoading } from '../app/actions';

export const signInWithFacebook = (onError) => {
  return (dispatch) => {
    dispatch(setLoading());
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      (result) => {
        if (result.isCancelled) {
          console.log('facebook login cancelled');
          dispatch(clearLoading());
          dispatch({ type: types.SIGN_IN_WITH_FACEBOOK_FAILURE });
          return;
        }
        AccessToken.getCurrentAccessToken().then(
          (result) => {
            console.log('get token successful', result.accessToken);
            const fields = [
              'email',
              'name',
              'first_name',
              'middle_name',
              'last_name'
            ];
            const request = new GraphRequest('/me', {
              accessToken: result.accessToken,
              parameters: {
                fields: { string: fields.join(',') }
              }
            }, (error, result) => {
              if (error) {
                console.log('facebook get info failed', error);
                dispatch(clearLoading());
                dispatch({ type: types.SIGN_IN_WITH_FACEBOOK_FAILURE });
                if (onError) {
                  onError(error);
                }
                return;
              }
              console.log('facebook login successful', result);
              dispatch(clearLoading());
              dispatch({ type: types.SIGN_IN_WITH_FACEBOOK_SUCCESS, payload: result });
            });
            new GraphRequestManager().addRequest(request).start();
          },
          (reason) => {
            console.log('facebook get token failed', reason);
            dispatch(clearLoading());
            dispatch({ type: types.SIGN_IN_WITH_FACEBOOK_FAILURE });
            if (onError) {
              onError(reason);
            }
          }
        );
      },
      (reason) => {
        console.log('facebook login failed', reason);
        dispatch(clearLoading());
        dispatch({ type: types.SIGN_IN_WITH_FACEBOOK_FAILURE });
      }
    ).catch(reason => {
      console.log('facebook login failed', reason);
      dispatch(clearLoading());
      dispatch({ type: types.SIGN_IN_WITH_FACEBOOK_FAILURE });
    });
  }
}

export const loginWithInstagram = () => {
  return (dispatch) => {}
}

export const signIn = (username, password) => {
  return (dispatch) => {
    dispatch(setLoading());
    fetch('http://muanation.com/api/users/token.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Connection': 'keep-alive',
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjMsInVzZXJuYW1lIjoiamFtZXMxIiwiZW1haWwiOiJtZUB5b3UuY29tIiwibmFtZSI6bnVsbCwibGFzdF9uYW1lIjpudWxsLCJnZW5kZXIiOm51bGwsImFkZHJlc3MiOm51bGwsInN0YXRlIjpudWxsLCJjaXR5IjpudWxsLCJjb3VudHJ5IjpudWxsLCJwaG9uZSI6bnVsbCwiZmFjZWJvb2tfdG9rZW4iOm51bGwsImltYWdlX3VybCI6Imh0dHA6XC9cL211YW5hdGlvbi5jb21cL2ltZ1wvdXNlcnNcLyIsImV4cCI6MTU2MTg3MDA5MCwiaWF0IjoxNTU5MjQyMDkwfQ.V2hwf-2JSJuRQoc46shBAkucnS0D_utQjpSBhtlDCII'
      },
      body: qs.stringify({ username, password })
    }).then(async (response) => {
      try {
        // await AsyncStorage.setItem('userToken', '0000');
        dispatch({ type: types.SIGN_IN_SUCCESS, payload: user });
        dispatch(clearLoading());
      } catch (error) {
        dispatch({ type: types.SIGN_IN_FAILURE });
        dispatch(clearLoading());
      }
    }).catch(error => {
      dispatch({ type: types.SIGN_IN_FAILURE });
      dispatch(clearLoading());
    });
  }
}

export const signOut = (username, password) => {
  return (dispatch) => {
    dispatch(setLoading());
    fetch('http://muanation.com/api/users/logout.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Connection': 'keep-alive',
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjMsInVzZXJuYW1lIjoiamFtZXMxIiwiZW1haWwiOiJtZUB5b3UuY29tIiwibmFtZSI6bnVsbCwibGFzdF9uYW1lIjpudWxsLCJnZW5kZXIiOm51bGwsImFkZHJlc3MiOm51bGwsInN0YXRlIjpudWxsLCJjaXR5IjpudWxsLCJjb3VudHJ5IjpudWxsLCJwaG9uZSI6bnVsbCwiZmFjZWJvb2tfdG9rZW4iOm51bGwsImltYWdlX3VybCI6Imh0dHA6XC9cL211YW5hdGlvbi5jb21cL2ltZ1wvdXNlcnNcLyIsImV4cCI6MTU2MTg3MDA5MCwiaWF0IjoxNTU5MjQyMDkwfQ.V2hwf-2JSJuRQoc46shBAkucnS0D_utQjpSBhtlDCII'
      },
      body: qs.stringify({ username, password })
    }).then(async (response) => {
      try {
        dispatch({ type: types.SIGN_OUT_SUCCESS });
        dispatch(clearLoading());
      } catch (error) {
        dispatch({ type: types.SIGN_OUT_FAILURE });
        dispatch(clearLoading());
      }
    }).catch(error => {
      dispatch({ type: types.SIGN_OUT_FAILURE });
      dispatch(clearLoading());
    });
  }
}

export const signUp = (username, email, password) => {
  return (dispatch) => {
    dispatch(setLoading());
    fetch('http://muanation.com/api/users/add.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Connection': 'keep-alive',
      },
      body: qs.stringify({ username, password, active: '1', email })
    }).then(async (response) => {
      try {
        // await AsyncStorage.setItem('userToken', '0000');
        dispatch({ type: types.SIGN_UP_SUCCESS, payload: user });
        dispatch(clearLoading());
      } catch (error) {
        dispatch({ type: types.SIGN_UP_FAILURE });
        dispatch(clearLoading());
      }
    }).catch(error => {
      dispatch({ type: types.SIGN_UP_FAILURE });
      dispatch(clearLoading());
    });
  }
}
