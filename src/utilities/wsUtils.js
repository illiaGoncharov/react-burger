// Функция для создания объекта событий WebSocket
export const wsActionsCreater = (
  connectStart,
  onOpen,
  onMessage,
  onClose,
  onError,
  connectStop
) => ({
  connectStart: connectStart,
  onOpen: onOpen,
  onMessage: onMessage,
  onClose: onClose,
  onError: onError,
  connectStop: connectStop,
});