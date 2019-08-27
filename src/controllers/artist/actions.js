import faker from 'faker';

import * as types from './types';
import { setLoading, clearLoading } from '../common/actions';

export const getArtists = () => {
  return (dispatch) => {
    dispatch(setLoading());
    try {
      let artists = [];
      for (let j, i = 0; i < 10; i++) {
        let tags = [];
        for (j = 0; j < 5; j++) {
          tags.push(faker.lorem.word());
        }
        let products = [];
        for (j = 0; j < 3; j++) {
          products.push(faker.random.image());
        }
        artists.push({
          avatar: faker.image.avatar(),
          checked: faker.random.boolean(),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          tags,
          score: faker.random.number({ min: 0, max: 5 }),
          reviews: faker.random.number({ min: 0, max: 1000 }),
          products
        });
      }
      dispatch({ type: types.GET_ARTISTS_SUCCESS, payload: artists });
      dispatch(clearLoading());
    } catch (error) {
      dispatch({ type: types.GET_ARTISTS_FAILURE });
      dispatch(clearLoading());
    }
  }
}

export const getSuggestedArtists = () => {
  return (dispatch) => {
    dispatch(setLoading());
    try {
      let artists = [];
      for (let j, i = 0; i < 10; i++) {
        let tags = [];
        for (j = 0; j < 5; j++) {
          tags.push(faker.lorem.word());
        }
        let products = [];
        for (j = 0; j < 3; j++) {
          products.push(faker.random.image());
        }
        artists.push({
          avatar: faker.image.avatar(),
          checked: faker.random.boolean(),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          tags,
          score: faker.random.number({ min: 0, max: 5 }),
          reviews: faker.random.number({ min: 0, max: 1000 }),
          products
        });
      }
      dispatch({ type: types.GET_SUGGESTED_ARTISTS_SUCCESS, payload: artists });
      dispatch(clearLoading());
    } catch (error) {
      dispatch({ type: types.GET_SUGGESTED_ARTISTS_FAILURE });
      dispatch(clearLoading());
    }
  }
}

export const getArtistProfile = (id) => {
  return (dispatch) => {
    dispatch(setLoading());
    try {
      let j, tags = [];
      for (j = 0; j < 5; j++) {
        tags.push(faker.lorem.word());
      }
      let products = [];
      for (j = 0; j < 3; j++) {
        products.push(faker.random.image());
      }
      const artistProfile = {
        avatar: faker.image.avatar(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        followers: faker.random.number({ min: 0, max: 1000 }),
        following: faker.random.number({ min: 0, max: 1000 }),
        score: faker.random.number({ min: 0, max: 5 }),
        reviews: faker.random.number({ min: 0, max: 1000 }),
        overview: faker.lorem.paragraph(3),
        tags,
        products
      };
      dispatch({ type: types.GET_ARTIST_PROFILE_SUCCESS, payload: artistProfile });
      dispatch(clearLoading());
    } catch (error) {
      dispatch({ type: types.GET_ARTIST_PROFILE_FAILURE });
      dispatch(clearLoading());
    }
  }
}

export const getArtistProducts = (id, category) => {
  return (dispatch) => {
    dispatch(setLoading());
    try {
      let products = [];
      for (let j = 0; j < 100; j++) {
        products.push({
          image: faker.image.image(),
          name: faker.lorem.word(),
          price: faker.random.number({ min: 1, max: 1000 })
        });
      }
      dispatch({ type: types.GET_ARTIST_PRODUCTS_SUCCESS, payload: products });
      dispatch(clearLoading());
    } catch (error) {
      dispatch({ type: types.GET_ARTIST_PRODUCTS_FAILURE });
      dispatch(clearLoading());
    }
  }
}
