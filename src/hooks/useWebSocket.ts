import { useEffect, useRef, useState, useCallback } from "react";

interface WebSocketMessage {
  type: string;
  payload: unknown;
}

interface WebSocketHookOptions {
  onOpen?: (event: Event) => void;
  onMessage?: (message: WebSocketMessage) => void;
  onError?: (event: Event) => void;
  onClose?: (event: CloseEvent) => void;
  reconnectInterval?: number; // milliseconds
  reconnectLimit?: number; // max reconnect attempts
}

export const useWebSocket = (url: string, options?: WebSocketHookOptions) => {
  const {
    onOpen,
    onMessage,
    // onError,
    onClose,
    reconnectInterval = 3000,
    reconnectLimit = 10,
  } = options || {};

  const ws = useRef<WebSocket | null>(null);
  const reconnectAttempts = useRef(0);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
  const [wsError, setWsError] = useState<Event | null>(null);

  const connect = useCallback(() => {
    if (
      ws.current &&
      (ws.current.readyState === WebSocket.OPEN ||
        ws.current.readyState === WebSocket.CONNECTING)
    ) {
      return; // Already connected or connecting
    }

    ws.current = new WebSocket(url);
    setIsConnected(false);
    setWsError(null);

    ws.current.onopen = (event) => {
      console.log("WebSocket opened:", event);
      setIsConnected(true);
      reconnectAttempts.current = 0; // Reset attempts on successful connection
      onOpen?.(event);
    };

    ws.current.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        setLastMessage(message);
        onMessage?.(message);
      } catch (e) {
        console.error("Failed to parse WebSocket message:", e);
        setWsError(e as Event);
      }
    };

    ws.current.onerror = (event) => {
      console.error("WebSocket error:", event);
      setWsError(event);
      onClose?.(event as CloseEvent); // Treat error as a close for reconnect logic
    };

    ws.current.onclose = (event) => {
      console.log("WebSocket closed:", event);
      setIsConnected(false);
      onClose?.(event);

      if (!event.wasClean && reconnectAttempts.current < reconnectLimit) {
        reconnectAttempts.current++;
        console.log(
          `Attempting to reconnect... (${reconnectAttempts.current}/${reconnectLimit})`
        );
        timeoutId.current = setTimeout(connect, reconnectInterval);
      } else if (!event.wasClean) {
        console.warn("WebSocket reconnect limit reached.");
      }
    };
  }, [url, onOpen, onMessage, onClose, reconnectInterval, reconnectLimit]);

  const disconnect = useCallback(() => {
    if (ws.current) {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
      ws.current.close(1000, "Component unmounted or manual disconnect");
      ws.current = null;
    }
  }, []);

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  const sendMessage = useCallback((message: string | object) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(
        typeof message === "string" ? message : JSON.stringify(message)
      );
    } else {
      console.warn("WebSocket not connected. Cannot send message.");
    }
  }, []);

  return {
    isConnected,
    lastMessage,
    wsError,
    sendMessage,
    disconnect,
    connect,
  };
};

