import faker from 'faker';
import moment from 'moment';

import * as types from './types';
import { setLoading, clearLoading } from '../common/actions';

export const getBookings = (userId) => {
  return (dispatch) => {
    dispatch(setLoading());
    try {
      let bookings = [];
      const startDate = moment(new Date()).add(1, 'days').format('YYYY-MM-DD');
      const endDate = moment(new Date()).add(7, 'days').format('YYYY-MM-DD');
      for (let i = 0; i < 10; i++) {
        bookings.push({
          title: faker.lorem.word(),
          price: faker.random.number({ min: 0, max: 100 }),
          datetime: faker.date.between(startDate, endDate)
        });
      }
      dispatch({ type: types.GET_BOOKINGS_SUCCESS, payload: bookings });
      dispatch(clearLoading());
    } catch (error) {
      dispatch({ type: types.GET_BOOKINGS_FAILURE });
      dispatch(clearLoading());
    }
  }
}
