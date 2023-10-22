export const socketMiddleware = (wsUrl, wsActions) => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const { wsInit, wsClose, onOpen, onClose, onError, onMessage } = wsActions;
      
      if (type === wsInit) {
        let url = wsUrl;
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
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = event => {
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