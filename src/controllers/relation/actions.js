import faker from 'faker';

import * as types from './types';
import { setLoading, clearLoading } from '../common/actions';

export const getFollowers = (userId) => {
  return (dispatch) => {
    dispatch(setLoading());
    try {
      let followers = [];
      for (let j, i = 0; i < 10; i++) {
        followers.push({
          avatar: faker.image.avatar(),
          fullName: faker.name.findName(),
          followed: faker.random.boolean()
        });
      }
      dispatch({ type: types.GET_FOLLOWERS_SUCCESS, payload: followers });
      dispatch(clearLoading());
    } catch (error) {
      dispatch({ type: types.GET_FOLLOWERS_FAILURE });
      dispatch(clearLoading());
    }
  }
}

export const getFollowing = (userId) => {
  return (dispatch) => {
    dispatch(setLoading());
    try {
      let following = [];
      for (let j, i = 0; i < 10; i++) {
        following.push({
          avatar: faker.image.avatar(),
          fullName: faker.name.findName(),
          followed: true
        });
      }
      dispatch({ type: types.GET_FOLLOWING_SUCCESS, payload: following });
      dispatch(clearLoading());
    } catch (error) {
      dispatch({ type: types.GET_FOLLOWING_FAILURE });
      dispatch(clearLoading());
    }
  }
}
