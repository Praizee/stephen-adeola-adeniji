export const API_ENDPOINTS = {
  MARKET_OVERVIEW: "/ticker/24hr",
  CANDLESTICK: "/klines",
  ORDER_BOOK: "/depth",
  ACCOUNT_BALANCES: "/account",
  PLACE_ORDER: "/order",
};

export const WEBSOCKET_URLS = {
  KLINE_STREAM: "wss://stream.example.com:9443/ws/btcusdt@kline_",
  DEPTH_STREAM: "wss://stream.example.com:9443/ws/btcusdt@depth",
};

// global constants
export const DEFAULT_SYMBOL = "BTCUSDT";
export const APP_NAME = "Sisyphus Exchange";
export const MIN_TRADE_AMOUNT = 0.00001;

