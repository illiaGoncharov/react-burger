const socketMiddleware = (wsActions) => (store) => {

  let socket = null;
  
  return (next) => (action) => {
    const { dispatch } = store;
    const { type, payload } = action;

    if (type === wsActions.connectStart().type) {
      try {
        socket = new WebSocket(payload);

        socket.onopen = (e) => dispatch(wsActions.onOpen(e));
        socket.onclose = (e) => {
          dispatch(wsActions.onClose(e));
        };
        socket.onerror = (e) => {
          dispatch(wsActions.onError(e));
        };
        socket.onmessage = (e) => dispatch(wsActions.onMessage(JSON.parse(e.data)));
      } catch (error) {
        console.error('WebSocket connection failed:', error);
      }
    }

    if (socket && type === wsActions.connectStop().type && socket.readyState === WebSocket.OPEN) {
      try {
        socket.close(1000, "Closed by user");
      } catch (error) {
        console.error('Error while closing WebSocket:', error);
      } finally {
        socket = null;
      }
    }
    
    next(action);
  };
};

export default socketMiddleware;
