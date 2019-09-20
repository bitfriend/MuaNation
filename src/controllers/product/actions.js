import faker from 'faker';

import * as types from './types';
import { setLoading, clearLoading } from '../common/actions';

export const getProducts = () => {
  return (dispatch) => {
    dispatch(setLoading());
    try {
      let products = [];
      for (let j, i = 0; i < 100; i++) {
        products.push({
          image: faker.image.image(),
          name: faker.lorem.word(),
          overview: faker.lorem.sentence(50),
          extra: faker.random.number({ min: 1, max: 50 }) + '% off',
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

export const getSaleProduct = (id) => {
  return (dispatch) => {
    dispatch(setLoading());
    try {
      let images = [];
      for (let i = 0; i < 3; i++) {
        images.push(faker.image.image());
      }
      const saleProduct = {
        images,
        name: faker.lorem.word(),
        extra: faker.random.number({ min: 1, max: 50 }) + '% off',
        price: faker.random.number({ min: 1, max: 1000 }),
        overview: faker.lorem.paragraph(3),
        artist: {
          avatar: faker.image.avatar(),
          fullName: faker.name.findName(),
          score: faker.random.number({ min: 0, max: 5 }),
          overview: faker.lorem.sentence()
        }
      };
      dispatch({ type: types.GET_SALE_PRODUCT_SUCCESS, payload: saleProduct });
      dispatch(clearLoading());
    } catch (error) {
      dispatch({ type: types.GET_SALE_PRODUCT_FAILURE });
      dispatch(clearLoading());
    }
  }
}

export const getPopularProduct = (id) => {
  return (dispatch) => {
    dispatch(setLoading());
    try {
      let images = [];
      for (let i = 0; i < 3; i++) {
        images.push(faker.image.image());
      }
      const popularProduct = {
        images,
        name: faker.lorem.word(),
        extra: faker.random.number({ min: 1, max: 50 }) + '% off',
        price: faker.random.number({ min: 1, max: 1000 }),
        overview: faker.lorem.paragraph(3),
        artist: {
          avatar: faker.image.avatar(),
          fullName: faker.name.findName(),
          score: faker.random.number({ min: 0, max: 5 }),
          overview: faker.lorem.sentence()
        }
      };
      dispatch({ type: types.GET_POPULAR_PRODUCT_SUCCESS, payload: popularProduct });
      dispatch(clearLoading());
    } catch (error) {
      dispatch({ type: types.GET_POPULAR_PRODUCT_FAILURE });
      dispatch(clearLoading());
    }
  }
}
