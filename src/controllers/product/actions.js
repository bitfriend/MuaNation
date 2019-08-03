import faker from 'faker';

import * as types from './types';
import { setLoading, clearLoading } from '../app/actions';

export const getProducts = () => {
  return (dispatch) => {
    dispatch(setLoading());
    try {
      let products = [];
      for (let j, i = 0; i < 10; i++) {
        products.push({
          image: faker.image.image(),
          name: faker.lorem.word(),
          price: faker.random.number({ min: 1, max: 1000 })
        });
      }
      dispatch({ type: types.GET_PRODUCTS_SUCCESS, payload: products });
      dispatch(clearLoading());
    } catch (error) {
      dispatch({ type: types.GET_PRODUCTS_FAILURE });
      dispatch(clearLoading());
    }
  }
}

export const getProductDetails = (id) => {
  return (dispatch) => {
    dispatch(setLoading());
    try {
      let images = [];
      for (let i = 0; i < 3; i++) {
        images.push(faker.image.image());
      }
      const productDetails = {
        images,
        name: faker.lorem.word(),
        price: faker.random.number({ min: 1, max: 1000 }),
        overview: faker.lorem.paragraph(3),
        artist: {
          avatar: faker.image.avatar(),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          score: faker.random.number({ min: 0, max: 5 }),
          overview: faker.lorem.sentence()
        }
      };
      dispatch({ type: types.GET_PRODUCT_DETAILS_SUCCESS, payload: productDetails });
      dispatch(clearLoading());
    } catch (error) {
      dispatch({ type: types.GET_PRODUCT_DETAILS_FAILURE });
      dispatch(clearLoading());
    }
  }
}
