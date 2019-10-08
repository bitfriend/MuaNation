import faker from 'faker';

import * as types from './types';
import { setLoading, clearLoading } from '../common/actions';

export const getChats = (userId) => {
  return (dispatch) => {
    dispatch(setLoading());
    try {
      let chats = [];
      for (let i = 0; i < 10; i++) {
        chats.push({
          avatar: faker.image.avatar(),
          fullName: faker.name.findName(),
          last: {
            text: faker.lorem.sentence(10),
            time: faker.date.recent()
          }
        });
      }
      dispatch({ type: types.GET_CHATS_SUCCESS, payload: chats });
      dispatch(clearLoading());
    } catch (error) {
      dispatch({ type: types.GET_CHATS_FAILURE });
      dispatch(clearLoading());
    }
  }
}

export const getChat = (userId) => {
  return (dispatch) => {
    dispatch(setLoading());
    try {
      let chat = {
        id: faker.random.uuid(),
        fullName: faker.name.findName(),
        avatar: faker.image.avatar(),
        messages: []
      };
      for (let i = 0; i < 10; i++) {
        chat.messages.push({
          fromMe: faker.random.boolean(),
          text: faker.lorem.sentence(2),
          time: faker.date.past()
        });
      }
      dispatch({ type: types.GET_CHAT_SUCCESS, payload: chat });
      dispatch(clearLoading());
    } catch (error) {
      dispatch({ type: types.GET_CHAT_FAILURE });
      dispatch(clearLoading());
    }
  }
}
