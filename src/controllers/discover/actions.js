import faker from 'faker';

import * as types from './types';
import { setLoading, clearLoading } from '../app/actions';

export const getCriteria = () => {
  return (dispatch) => {
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
      dispatch(clearLoading());
    } catch (error) {
      dispatch({ type: types.GET_CRITERIA_FAILURE });
      dispatch(clearLoading());
    }
  }
}

export const selectCategory = (category) => {
  return (dispatch) => {
    dispatch(setLoading());
    try {
      dispatch({ type: types.SELECT_CATEGORY_SUCCESS, payload: category });
      dispatch(clearLoading());
    } catch (error) {
      dispatch({ type: types.SELECT_CATEGORY_FAILURE });
      dispatch(clearLoading());
    }
  }
}

export const deselectCategory = (category) => {
  return (dispatch) => {
    dispatch(setLoading());
    try {
      dispatch({ type: types.DESELECT_CATEGORY_SUCCESS, payload: category });
      dispatch(clearLoading());
    } catch (error) {
      dispatch({ type: types.DESELECT_CATEGORY_FAILURE });
      dispatch(clearLoading());
    }
  }
}

export const setPriceRange = (min, max) => {
  return (dispatch) => {
    dispatch(setLoading());
    try {
      dispatch({
        type: types.SET_PRICE_RANGE_SUCCESS,
        payload: { min, max }
      });
      dispatch(clearLoading());
    } catch (error) {
      dispatch({ type: types.SET_PRICE_RANGE_FAILURE });
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
    dispatch(setLoading());
    try {
      dispatch({ type: types.SET_MAX_DISTANCE_SUCCESS, payload: distance });
      dispatch(clearLoading());
    } catch (error) {
      dispatch({ type: types.SET_MAX_DISTANCE_FAILURE });
      dispatch(clearLoading());
    }
  }
}
