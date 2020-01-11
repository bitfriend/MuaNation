import faker from 'faker';
import moment from 'moment';

import * as types from './types';
import { setLoading, clearLoading } from '../common/actions';

export const getBookings = (userId) => {
  return (dispatch) => {
    console.log('getBookings');
    dispatch(setLoading());
    try {
      let bookings = [];
      const startDate = moment(new Date()).add(1, 'days').format('YYYY-MM-DD');
      const endDate = moment(new Date()).add(7, 'days').format('YYYY-MM-DD');
      for (let i = 0; i < 10; i++) {
        bookings.push({
          title: faker.lorem.word(),
          price: faker.random.number({ min: 0, max: 100 }),
          createdAt: faker.date.between(startDate, endDate)
        });
      }
      dispatch({ type: types.GET_BOOKINGS_SUCCESS, payload: bookings });
      console.log('getBookings');
      dispatch(clearLoading());
    } catch (error) {
      dispatch({ type: types.GET_BOOKINGS_FAILURE });
      console.log('getBookings');
      dispatch(clearLoading());
    }
  }
}

export const getBooking = () => {
  return (dispatch) => {
    dispatch(setLoading());
    try {
      const booking = {
        image: faker.image.image(),
        title: faker.lorem.word(),
        price: faker.random.number({ min: 0, max: 100 }),
        overview: faker.lorem.sentences(5),
        avatar: faker.image.avatar(),
        fullName: faker.name.findName(),
        createdAt: faker.date.past()
      };
      dispatch({ type: types.GET_BOOKING_SUCCESS, payload: booking });
      dispatch(clearLoading());
    } catch (error) {
      dispatch({ type: types.GET_BOOKING_FAILURE });
      dispatch(clearLoading());
    }
  }
}

export const getNotifications = () => {
  return (dispatch) => {
    console.log('getNotifications');
    dispatch(setLoading());
    try {
      let notifications = [];
      const startDate = moment(new Date()).add(1, 'days').format('YYYY-MM-DD');
      const endDate = moment(new Date()).add(7, 'days').format('YYYY-MM-DD');
      for (let i = 0; i < 10; i++) {
        notifications.push({
          avatar: faker.image.avatar(),
          fullName: faker.name.findName(),
          processed: faker.random.boolean(),
          time: faker.date.between(startDate, endDate),
          title: faker.lorem.word(),
          price: faker.random.number({ min: 0, max: 100 })
        });
      }
      dispatch({ type: types.GET_NOTIFICATIONS_SUCCESS, payload: notifications });
      console.log('getNotifications');
      dispatch(clearLoading());
    } catch (error) {
      dispatch({ type: types.GET_NOTIFICATIONS_FAILURE });
      console.log('getNotifications');
      dispatch(clearLoading());
    }
  }
}

export const getNotification = () => {
  return (dispatch) => {
    console.log('getNotification');
    dispatch(setLoading());
    try {
      const startDate = moment(new Date()).add(-1, 'days').format('YYYY-MM-DD');
      const endDate = moment(new Date()).add(-7, 'days').format('YYYY-MM-DD');
      const notification = {
        overview: faker.lorem.sentences(4),
        avatar: faker.image.avatar(),
        fullName: faker.name.findName(),
        createdAt: faker.date.between(startDate, endDate)
      };
      dispatch({ type: types.GET_NOTIFICATION_SUCCESS, payload: notification });
      console.log('getNotification');
      dispatch(clearLoading());
    } catch (error) {
      dispatch({ type: types.GET_NOTIFICATION_FAILURE });
      console.log('getNotification');
      dispatch(clearLoading());
    }
  }
}
