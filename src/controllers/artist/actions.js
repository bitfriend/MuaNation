import faker from 'faker';

import AsyncStorage from '@react-native-community/async-storage';

import * as types from './types';
import { setLoading, clearLoading } from '../common/actions';

export const getFeaturedArtists = (onError) => {
  return (dispatch) => {
    console.log('getFeaturedArtists');
    dispatch(setLoading());
    // AsyncStorage.getItem('mua_token').then(muaToken => {
    //   console.log('muaToken', muaToken);
    //   fetch('https://muanation.com/api/users/featured_artists.json', {
    //     method: 'GET',
    //     headers: {
    //       'Authorization': `Bearer ${muaToken}`
    //     }
    //   }).then(response => response.json()).then(response => {
    //     if (response.message.success) {
    //       let artists = [];
    //       response.featured_artists.map(artist => {
    //         artists.push({
    //           avatar: artist.image,
    //           checked: faker.random.boolean(),
    //           fullName: artist.username,
    //           tags: artist.tags,
    //           score: faker.random.number({ min: 0, max: 5 }),
    //           reviews: artist.reviews.length
    //         });
    //       });
    //       dispatch({ type: types.GET_FEATURED_ARTISTS_SUCCESS, payload: artists });
    //       dispatch(clearLoading());
    //     } else {
    //       dispatch({ type: types.GET_FEATURED_ARTISTS_FAILURE });
    //       dispatch(clearLoading());
    //       if (onError) {
    //         onError(response.message.msg);
    //       }
    //     }
    //   }).catch(error => {
    //     dispatch({ type: types.GET_FEATURED_ARTISTS_FAILURE });
    //     dispatch(clearLoading());
    //     if (onError) {
    //       onError(error.message);
    //     }
    //   });
    // }).catch(error => {
    //   dispatch({ type: types.GET_FEATURED_ARTISTS_FAILURE });
    //   dispatch(clearLoading());
    //   if (onError) {
    //     onError(error);
    //   }
    // });
    try {
      let artists = [];
      for (let i = 0; i < 10; i++) {
        let tags = [];
        for (let j = 0; j < 5; j++) {
          tags.push(faker.lorem.word());
        }
        artists.push({
          avatar: faker.image.avatar(),
          checked: faker.random.boolean(),
          fullName: faker.name.findName(),
          tags,
          score: faker.random.number({ min: 0, max: 5 }),
          reviews: faker.random.number({ min: 0, max: 1000 })
        });
      }
      dispatch({ type: types.GET_FEATURED_ARTISTS_SUCCESS, payload: artists });
      console.log('getFeaturedArtists');
      dispatch(clearLoading());
    } catch (error) {
      dispatch({ type: types.GET_FEATURED_ARTISTS_FAILURE });
      console.log('getFeaturedArtists');
      dispatch(clearLoading());
    }
  }
}

export const getArtists = (onError) => {
  return (dispatch) => {
    console.log('getArtists');
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
          fullName: faker.name.findName(),
          tags,
          score: faker.random.number({ min: 0, max: 5 }),
          reviews: faker.random.number({ min: 0, max: 1000 }),
          products
        });
      }
      dispatch({ type: types.GET_ARTISTS_SUCCESS, payload: artists });
      console.log('getArtists');
      dispatch(clearLoading());
    } catch (error) {
      dispatch({ type: types.GET_ARTISTS_FAILURE });
      console.log('getArtists');
      dispatch(clearLoading());
    }
  }
}

export const getSuggestedArtists = () => {
  return (dispatch) => {
    console.log('getSuggestedArtists');
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
          fullName: faker.name.findName(),
          tags,
          score: faker.random.number({ min: 0, max: 5 }),
          reviews: faker.random.number({ min: 0, max: 1000 }),
          products
        });
      }
      dispatch({ type: types.GET_SUGGESTED_ARTISTS_SUCCESS, payload: artists });
      console.log('getSuggestedArtists');
      dispatch(clearLoading());
    } catch (error) {
      dispatch({ type: types.GET_SUGGESTED_ARTISTS_FAILURE });
      console.log('getSuggestedArtists');
      dispatch(clearLoading());
    }
  }
}

export const getArtist = (id) => {
  return (dispatch) => {
    console.log('getArtist');
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
      const currentArtist = {
        avatar: faker.image.avatar(),
        fullName: faker.name.findName(),
        followers: faker.random.number({ min: 0, max: 1000 }),
        following: faker.random.number({ min: 0, max: 1000 }),
        score: faker.random.number({ min: 0, max: 5 }),
        reviews: faker.random.number({ min: 0, max: 1000 }),
        overview: faker.lorem.paragraph(3),
        tags,
        products
      };
      dispatch({ type: types.GET_ARTIST_SUCCESS, payload: currentArtist });
      console.log('getArtist');
      dispatch(clearLoading());
    } catch (error) {
      dispatch({ type: types.GET_ARTIST_FAILURE });
      console.log('getArtist');
      dispatch(clearLoading());
    }
  }
}

export const getArtistProducts = (id, category) => {
  return (dispatch) => {
    console.log('getArtistProducts');
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
      console.log('getArtistProducts');
      dispatch(clearLoading());
    } catch (error) {
      dispatch({ type: types.GET_ARTIST_PRODUCTS_FAILURE });
      console.log('getArtistProducts');
      dispatch(clearLoading());
    }
  }
}
