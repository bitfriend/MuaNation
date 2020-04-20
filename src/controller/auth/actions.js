import qs from 'qs';
import AsyncStorage from '@react-native-community/async-storage';

import * as types from './types';
import { setLoading, clearLoading } from '../common/actions';

// AsyncStorage.removeItem('mua_token');

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
        dispatch({ type: types.SIGN_OUT });
        dispatch(clearLoading());
      } catch (error) {
        dispatch(clearLoading());
      }
    }).catch(error => {
      dispatch(clearLoading());
    });
  }
}
