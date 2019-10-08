import faker from 'faker';

import * as types from './types';
import { setLoading, clearLoading } from '../common/actions';

export const getCategories = () => {
  return (dispatch) => {
    dispatch(setLoading());
    try {
      let categories = [];
      for (let i = 0; i < 10; i++) {
        categories.push(faker.lorem.word());
      }
      dispatch({ type: types.GET_CATEGORIES_SUCCESS, payload: categories });
      dispatch(clearLoading());
    } catch (error) {
      dispatch({ type: types.GET_CATEGORIES_FAILURE });
      dispatch(clearLoading());
    }
  }
}
