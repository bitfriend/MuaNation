import * as types from './types';

const initialState = {
  chats: [],
  chat: {}
};

export default chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CHATS_SUCCESS:
      return {
        ...state,
        chats: action.payload
      };
    case types.GET_CHATS_FAILURE:
      return {
        ...state,
        chats: []
      };
    case types.GET_CHAT_SUCCESS:
      return {
        ...state,
        chat: action.payload
      };
    case types.GET_CHAT_FAILURE:
      return {
        ...state,
        chat: {}
      };
    default:
      return state;
  }
};
