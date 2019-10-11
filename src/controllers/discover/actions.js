import faker from 'faker';

import * as types from './types';
import { setLoading, clearLoading } from '../common/actions';

export const fetchNeighbours = (latitude, longitude, onError) => {
  return (dispatch) => {
    console.log('fetchNeighbours');
    dispatch(setLoading());
    try {
      let neighbours = [];
      for (let i = 0; i < 10; i++) {
        neighbours.push({
          latitude: latitude + faker.random.number({ min: 0, max: 0.0922, precision: 0.00001 }),
          longitude: longitude + faker.random.number({ min: 0, max: 0.0421, precision: 0.00001 })
        });
      }
      dispatch({ type: types.FETCH_NEIGHBOURS_SUCCESS, payload: neighbours });
      console.log('fetchNeighbours');
      dispatch(clearLoading());
    } catch (error) {
      dispatch({ type: types.FETCH_NEIGHBOURS_FAILURE });
      console.log('fetchNeighbours');
      dispatch(clearLoading());
      if (onError) {
        onError(error);
      }
    }
  }
}

export const getCriteria = () => {
  return (dispatch) => {
    console.log('getCriteria');
    dispatch(setLoading());
    try {
      let i, criteria = {
        category: {
          selected: [],
          deselected: []
        },
        price: {
          min: faker.random.number({ min: 0, max: 50 }),
          max: faker.random.number({ min: 50, max: 100 })
        },
        score: {
          min: faker.random.number({ min: 0, max: 5 })
        },
        distance: {
          max: faker.random.number({ min: 1, max: 10 })
        }
      };
      for (i = 0; i < 2; i++) {
        criteria.category.selected.push(faker.lorem.word());
      }
      for (i = 0; i < 8; i++) {
        criteria.category.deselected.push(faker.lorem.word());
      }
      dispatch({ type: types.GET_CRITERIA_SUCCESS, payload: criteria });
      console.log('getCriteria');
      dispatch(clearLoading());
    } catch (error) {
      dispatch({ type: types.GET_CRITERIA_FAILURE });
      console.log('getCriteria');
      dispatch(clearLoading());
    }
  }
}

export const selectCategory = (category) => {
  return (dispatch) => {
    console.log('selectCategory');
    dispatch(setLoading());
    try {
      dispatch({ type: types.SELECT_CATEGORY_SUCCESS, payload: category });
      console.log('selectCategory');
      dispatch(clearLoading());
    } catch (error) {
      dispatch({ type: types.SELECT_CATEGORY_FAILURE });
      console.log('selectCategory');
      dispatch(clearLoading());
    }
  }
}

export const deselectCategory = (category) => {
  return (dispatch) => {
    console.log('deselectCategory');
    dispatch(setLoading());
    try {
      dispatch({ type: types.DESELECT_CATEGORY_SUCCESS, payload: category });
      console.log('deselectCategory');
      dispatch(clearLoading());
    } catch (error) {
      dispatch({ type: types.DESELECT_CATEGORY_FAILURE });
      console.log('deselectCategory');
      dispatch(clearLoading());
    }
  }
}

export const setPriceRange = (min, max) => {
  return (dispatch) => {
    console.log('setPriceRange');
    dispatch(setLoading());
    try {
      dispatch({
        type: types.SET_PRICE_RANGE_SUCCESS,
        payload: { min, max }
      });
      console.log('setPriceRange');
      dispatch(clearLoading());
    } catch (error) {
      dispatch({ type: types.SET_PRICE_RANGE_FAILURE });
      console.log('setPriceRange');
      dispatch(clearLoading());
    }
  }
}

export const setMinScore = (score) => {
  return (dispatch) => {
    dispatch(setLoading());
    try {
      dispatch({ type: types.SET_MIN_SCORE_SUCCESS, payload: score });
      dispatch(clearLoading());
    } catch (error) {
      dispatch({ type: types.SET_MIN_SCORE_FAILURE });
      dispatch(clearLoading());
    }
  }
}

export const setMaxDistance = (distance) => {
  return (dispatch) => {
    console.log('setMaxDistance');
    dispatch(setLoading());
    try {
      dispatch({ type: types.SET_MAX_DISTANCE_SUCCESS, payload: distance });
      console.log('setMaxDistance');
      dispatch(clearLoading());
    } catch (error) {
      dispatch({ type: types.SET_MAX_DISTANCE_FAILURE });
      console.log('setMaxDistance');
      dispatch(clearLoading());
    }
  }
}
