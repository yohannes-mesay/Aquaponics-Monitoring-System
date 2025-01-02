import useWebSocket from "react-use-websocket";

export const useData = () => {
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    "ws://localhost:5000",
    {
      onOpen: () => console.log("Connected to WebSocket"),
      onClose: () => console.log("Disconnected from WebSocket"),
      shouldReconnect: () => true,
    }
  );

  const data = lastJsonMessage;

  const isLoading = readyState !== 1; // `1` means the connection is open
  const error = readyState === 3; // `3` means the connection is closed

  return { isLoading, error, data, sendJsonMessage };
};
