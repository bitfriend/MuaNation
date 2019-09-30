import * as types from './types';

const initialState = {
  bookings: [],
  booking: {},
  notifications: [],
  notification: {}
};

export default calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_BOOKINGS_SUCCESS:
      return {
        ...state,
        bookings: action.payload
      };
    case types.GET_BOOKINGS_FAILURE:
      return {
        ...state,
        bookings: []
      };
    case types.GET_BOOKING_SUCCESS:
      return {
        ...state,
        booking: action.payload
      };
    case types.GET_BOOKING_FAILURE:
      return {
        ...state,
        booking: {}
      };
    case types.GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: action.payload
      };
    case types.GET_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        notifications: []
      };
    case types.GET_NOTIFICATION_SUCCESS:
      return {
        ...state,
        notification: action.payload
      };
    case types.GET_NOTIFICATION_FAILURE:
      return {
        ...state,
        notification: {}
      };
    default:
      return state;
  }
};
