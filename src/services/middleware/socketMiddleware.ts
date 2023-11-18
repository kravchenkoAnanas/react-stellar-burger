import { IWSConfig } from "../api";
// import { RootState } from "../types";

export const socketMiddleware = (wsConfig: IWSConfig)  => {
  return (store: any) => {
    let socket: any = null;

    return (next: any) => (action: any) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const { wsInit, wsClose, onOpen, onClose, onError, onMessage } = wsConfig.actions;
      
      if (type === wsInit) {
        let url = wsConfig.url;
        if (payload) {
          url += payload;
        } else if (getState().user) {
          const token = localStorage.getItem("accessToken");
          url += `?token=${token}`;
        }
        // console.log("socketMiddleware url", url);
        socket = new WebSocket(url);
      }
      if (type === wsClose) {
        // console.log("socketMiddleware STOP");
        socket.close();
        dispatch({ type: onClose });
      }
      if (socket) {
        socket.onopen = (event: any) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event: any) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event: any) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = (event: any) => {
          dispatch({ type: onClose, payload: event });
        };

        // if (type === wsSendMessage) {
        //   const message = { ...payload, token: user.token };
        //   socket.send(JSON.stringify(message));
        // }
      }

      next(action);
    };
  };
};