import * as types from './types';

const initialState = {
  bookings: [],
  booking: {}
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
    default:
      return state;
  }
};
