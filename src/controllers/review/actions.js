import faker from 'faker';

import * as types from './types';
import { setLoading, clearLoading } from '../app/actions';

export const getReviews = (userId) => {
  return (dispatch) => {
    dispatch(setLoading());
    try {
      let reviews = [];
      for (let j, i = 0; i < 10; i++) {
        let products = [];
        for (let j = 0; j < 5; j++) {
          products.push(faker.image.image());
        }
        reviews.push({
          avatar: faker.image.avatar(),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          overview: faker.lorem.sentence(),
          score: faker.random.number({ min: 0, max: 5 }),
          products
        });
      }
      dispatch({ type: types.GET_REVIEWS_SUCCESS, payload: reviews });
      dispatch(clearLoading());
    } catch (error) {
      dispatch({ type: types.GET_REVIEWS_FAILURE });
      dispatch(clearLoading());
    }
  }
}
