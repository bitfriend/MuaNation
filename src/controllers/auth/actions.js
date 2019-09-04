import { AccessToken, GraphRequest, GraphRequestManager, LoginManager } from 'react-native-fbsdk';
import qs from 'qs';
import { StackActions, SwitchActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

import * as types from './types';
import { setLoading, clearLoading } from '../common/actions';

export const joinWithFacebook = (role, onError) => {
  return (dispatch) => {
    dispatch(setLoading());
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      (result) => {
        if (result.isCancelled) {
          console.log('facebook login cancelled');
          dispatch(clearLoading());
          dispatch({ type: types.JOIN_WITH_FACEBOOK_FAILURE });
          return;
        }
        AccessToken.getCurrentAccessToken().then(
          (result) => {
            console.log('get token successful', result.accessToken);
            const request = new GraphRequest('/me', {
              accessToken: result.accessToken,
              parameters: {
                fields: { string: ['id', 'name', 'email'].join(',') }
              }
            }, (error, res) => {
              if (error) {
                console.log('facebook get info failed', error);
                dispatch(clearLoading());
                dispatch({ type: types.JOIN_WITH_FACEBOOK_FAILURE });
                if (onError) {
                  onError(error);
                }
                return;
              }
              console.log('facebook login successful', res);
              fetch('https://muanation.com/api/users/add.json', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: qs.stringify({
                  type: 'facebook',
                  facebook_id: res.id,
                  username: res.name,
                  email: res.email,
                  password: '1234567890',
                  facebook_token: result.accessToken
                })
              }).then(response => response.json()).then(response => {
                if (response.message.success) {
                  dispatch({ type: types.JOIN_WITH_FACEBOOK_SUCCESS });
                  AsyncStorage.setItem('mua_token', response.data.token).then(() => {
                    dispatch(clearLoading());
                    dispatch(StackActions.push({ routeName: 'ImportMedia' }));
                  }).catch(error => {
                    dispatch(clearLoading());
                    if (onError) {
                      onError(error);
                    }
                  });
                } else {
                  dispatch({ type: types.JOIN_WITH_FACEBOOK_FAILURE });
                  dispatch(clearLoading());
                  if (onError) {
                    onError(response.message.msg);
                  }
                }
              }).catch(error => {
                dispatch({ type: types.JOIN_WITH_FACEBOOK_FAILURE });
                dispatch(clearLoading());
                if (onError) {
                  onError(error.message);
                }
              });
            });
            new GraphRequestManager().addRequest(request).start();
          },
          (reason) => {
            console.log('facebook get token failed', reason);
            dispatch(clearLoading());
            dispatch({ type: types.JOIN_WITH_FACEBOOK_FAILURE });
            if (onError) {
              onError(reason);
            }
          }
        );
      },
      (reason) => {
        console.log('facebook login failed', reason);
        dispatch(clearLoading());
        dispatch({ type: types.JOIN_WITH_FACEBOOK_FAILURE });
        if (onError) {
          onError(reason);
        }
      }
    ).catch(reason => {
      console.log('facebook login failed', reason);
      dispatch(clearLoading());
      dispatch({ type: types.JOIN_WITH_FACEBOOK_FAILURE });
      if (onError) {
        onError(reason);
      }
    });
  }
}

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
            const request = new GraphRequest('/me', {
              accessToken: result.accessToken,
              parameters: {
                fields: { string: ['id', 'name', 'email'].join(',') }
              }
            }, (error, res) => {
              if (error) {
                console.log('facebook get info failed', error);
                dispatch(clearLoading());
                dispatch({ type: types.SIGN_IN_WITH_FACEBOOK_FAILURE });
                if (onError) {
                  onError(error);
                }
                return;
              }
              console.log('facebook login successful', res);
              AsyncStorage.getItem('mua_token').then(token => {
                fetch('https://muanation.com/api/users/add.json', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${token}`
                  },
                  body: qs.stringify({
                    type: 'facebook',
                    facebook_id: res.id,
                    email: res.email
                  })
                }).then(response => response.json()).then(response => {
                  if (response.message.success) {
                    dispatch({ type: types.SIGN_IN_WITH_FACEBOOK_SUCCESS });
                    dispatch(clearLoading());
                    dispatch(SwitchActions.jumpTo({ routeName: 'AppTabNav' }));
                  } else {
                    dispatch({ type: types.SIGN_IN_WITH_FACEBOOK_FAILURE });
                    dispatch(clearLoading());
                    if (onError) {
                      onError(response.message.msg);
                    }
                  }
                }).catch(error => {
                  dispatch({ type: types.SIGN_IN_WITH_FACEBOOK_FAILURE });
                  dispatch(clearLoading());
                  if (onError) {
                    onError(error.message);
                  }
                });
              }).catch(error => {
                dispatch(clearLoading());
                if (onError) {
                  onError(error);
                }
              });
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
        if (onError) {
          onError(reason);
        }
      }
    ).catch(reason => {
      console.log('facebook login failed', reason);
      dispatch(clearLoading());
      dispatch({ type: types.SIGN_IN_WITH_FACEBOOK_FAILURE });
      if (onError) {
        onError(reason);
      }
    });
  }
}

export const joinWithInstagram = (role, token, onError) => {
  return (dispatch) => {
    dispatch(setLoading());
    fetch(`https://api.instagram.com/v1/users/self/?access_token=${token}`, {
      method: 'GET'
    }).then(response => {
      return response.json();
    }).then(res => {
      console.log('get user info successful', res.data);
      fetch('http://muanation.com/api/users/add.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Connection': 'keep-alive',
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjMsInVzZXJuYW1lIjoiamFtZXMxIiwiZW1haWwiOiJtZUB5b3UuY29tIiwibmFtZSI6bnVsbCwibGFzdF9uYW1lIjpudWxsLCJnZW5kZXIiOm51bGwsImFkZHJlc3MiOm51bGwsInN0YXRlIjpudWxsLCJjaXR5IjpudWxsLCJjb3VudHJ5IjpudWxsLCJwaG9uZSI6bnVsbCwiZmFjZWJvb2tfdG9rZW4iOm51bGwsImltYWdlX3VybCI6Imh0dHA6XC9cL211YW5hdGlvbi5jb21cL2ltZ1wvdXNlcnNcLyIsImV4cCI6MTU2MTg3MDA5MCwiaWF0IjoxNTU5MjQyMDkwfQ.V2hwf-2JSJuRQoc46shBAkucnS0D_utQjpSBhtlDCII'
        },
        body: qs.stringify({
          instagram_id: res.data.id,
          username: res.data.full_name, // Use "full_name" field, not "username", in order to keep compatibility with facebook login
          email: res.data.username,
          password: '1234567890',
          instagram_token: token,
          role
        })
      }).then(async (response) => {
        try {
          dispatch({ type: types.JOIN_WITH_INSTAGRAM_SUCCESS });
          dispatch(clearLoading());
          dispatch(StackActions.push({ routeName: 'ImportMedia' }));
        } catch (error) {
          dispatch({ type: types.JOIN_WITH_INSTAGRAM_FAILURE });
          dispatch(clearLoading());
        }
      }).catch(error => {
        dispatch({ type: types.JOIN_WITH_INSTAGRAM_FAILURE });
        dispatch(clearLoading());
      });
    }).catch(reason => {
      console.log('get user info failed', reason);
      dispatch(clearLoading());
      dispatch({ type: types.JOIN_WITH_INSTAGRAM_FAILURE });
      if (onError) {
        onError(reason);
      }
    });
  }
}

export const signInWithInstagram = (token, email, onError) => {
  return (dispatch) => {
    dispatch(setLoading());
    fetch(`https://api.instagram.com/v1/users/self/?access_token=${token}`, {
      method: 'GET'
    }).then(response => {
      return response.json();
    }).then(res => {
      console.log('get user info successful', res.data);
      fetch('http://muanation.com/api/users/token.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Connection': 'keep-alive',
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjMsInVzZXJuYW1lIjoiamFtZXMxIiwiZW1haWwiOiJtZUB5b3UuY29tIiwibmFtZSI6bnVsbCwibGFzdF9uYW1lIjpudWxsLCJnZW5kZXIiOm51bGwsImFkZHJlc3MiOm51bGwsInN0YXRlIjpudWxsLCJjaXR5IjpudWxsLCJjb3VudHJ5IjpudWxsLCJwaG9uZSI6bnVsbCwiZmFjZWJvb2tfdG9rZW4iOm51bGwsImltYWdlX3VybCI6Imh0dHA6XC9cL211YW5hdGlvbi5jb21cL2ltZ1wvdXNlcnNcLyIsImV4cCI6MTU2MTg3MDA5MCwiaWF0IjoxNTU5MjQyMDkwfQ.V2hwf-2JSJuRQoc46shBAkucnS0D_utQjpSBhtlDCII'
        },
        body: qs.stringify({
          username: res.data.username,
          password: '1234567890'
        })
      }).then(response => {
        return response.json();
      }).then(resp => {
        if (resp.success) {
          console.log('mua login successful', resp);
          dispatch({
            type: types.SIGN_IN_SUCCESS,
            payload: {
              instagram_id: res.data.id,
              username: res.data.username,
              email,
              password: '1234567890',
              instagram_token: token
            }
          });
          dispatch(clearLoading());
          dispatch(SwitchActions.jumpTo({ routeName: 'AppTabNav' }));
        } else {
          console.log('mua login failed', resp);
          dispatch({ type: types.SIGN_IN_FAILURE });
          dispatch(clearLoading());
          if (onError) {
            onError(resp.data.message);
          }
        }
      }).catch(error => {
        dispatch({ type: types.SIGN_IN_FAILURE });
        dispatch(clearLoading());
        if (onError) {
          onError(error);
        }
      });
    }).catch(reason => {
      console.log('get user info failed', reason);
      dispatch(clearLoading());
      dispatch({ type: types.SIGN_IN_WITH_INSTAGRAM_FAILURE });
      if (onError) {
        onError(reason);
      }
    });
  }
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
