import { Dispatch, Middleware, MiddlewareAPI } from "redux";
import { TWsActions } from "../actions/wsActions";
import { IWSConfig } from "../api";
import { WebSocketMessageEvent } from "../types";

const socketMiddleware = (wsConfig: IWSConfig): Middleware => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;

    return (next: Dispatch) => (action: TWsActions) => {
      const { dispatch, getState } = store;
      const { type } = action;
      let payload;
      if ('payload' in action) {
        payload = action.payload;
      } else {
        payload = null;
      }
      const { wsInit, wsClose, onOpen, onClose, onError, onMessage } = wsConfig.actions;
      
      if (type === wsInit) {
        let url = wsConfig.url;
        if (payload) {
          url += payload;
        } else if (getState().user) {
          const token = localStorage.getItem("accessToken");
          url += `?token=${token}`;
        }
        socket = new WebSocket(url);
      }

      if (type === wsClose) {
        if (socket) {
          socket.close();
          dispatch({ type: onClose });
        }
      }

      if (socket) {
        socket.onopen = (event: Event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event: Event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event: WebSocketMessageEvent) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = (event: CloseEvent) => {
          dispatch({ type: onClose, payload: event });
        }
      }

      next(action);
    };
  };
};

export default socketMiddleware;