import {
  WS_USER_NAME_UPDATE,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  TWsActions
} from '../actions/wsActions';
import { IMessage, IUser } from '../types';

type TwsType = {
  connected: boolean,
  messages: IMessage[],
  user: IUser | null
}

const initialState: TwsType = {
  connected: false,
  messages: [],
  user: null
};

export const wsReducer = (
  state = initialState,
  action: TWsActions
  ): TwsType => {

  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        connected: true
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        connected: false
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        connected: false
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        messages: state.messages.length
          ? [...state.messages, { ...action.payload, timestamp: new Date().getTime() / 1000 }]
          : [{ ...action.payload, timestamp: new Date().getTime() / 1000 }]
      };
    case WS_USER_NAME_UPDATE:
      return {
        ...state,
        user: action.payload
      };

    default:
      return state;
  }
};