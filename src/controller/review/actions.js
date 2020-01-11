import faker from 'faker';

import * as types from './types';
import { setLoading, clearLoading } from '../common/actions';

export const getReviews = (userId) => {
  return (dispatch) => {
    console.log('getReviews');
    dispatch(setLoading());
    try {
      let reviews = [];
      for (let i = 0; i < 10; i++) {
        let products = [];
        for (let j = 0; j < 5; j++) {
          products.push(faker.image.image());
        }
        reviews.push({
          avatar: faker.image.avatar(),
          fullName: faker.name.findName(),
          overview: faker.lorem.sentence(),
          score: faker.random.number({ min: 0, max: 5 }),
          products
        });
      }
      dispatch({ type: types.GET_REVIEWS_SUCCESS, payload: reviews });
      console.log('getReviews');
      dispatch(clearLoading());
    } catch (error) {
      dispatch({ type: types.GET_REVIEWS_FAILURE });
      console.log('getReviews');
      dispatch(clearLoading());
    }
  }
}
