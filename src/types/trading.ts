import type { CandlestickData } from "lightweight-charts";

export type CandleStickData = CandlestickData;

export interface ProcessedCandleStickData extends CandlestickData {
  volume?: number;
}

// This represents the raw array structure from Binance API
export type BinanceKline = [
  number, // Open time
  string, // Open
  string, // High
  string, // Low
  string, // Close
  string, // Volume
  number, // Close time
  string, // Quote asset volume
  number, // Number of trades
  string, // Taker buy base asset volume
  string, // Taker buy quote asset volume
  string // Ignore
];

export type CandleStickInterval =
  | "1m"
  | "3m"
  | "5m"
  | "15m"
  | "30m"
  | "1h"
  | "2h"
  | "4h"
  | "6h"
  | "8h"
  | "12h"
  | "1d"
  | "3d"
  | "1w"
  | "1M";

export interface MarketOverviewData {
  symbol: string;
  lastPrice: number;
  priceChange: number;
  priceChangePercent: number;
  highPrice: number;
  lowPrice: number;
  volume: number;
}

export interface UserBalances {
  [currency: string]: number; // e.g., { "BTC": 0.5, "USD": 1000.0 }
}

export interface PlaceOrderRequest {
  symbol: string;
  type: "buy" | "sell";
  price: number;
  amount: number;
  orderType?: "LIMIT" | "MARKET";
}

export interface PlaceOrderResponse {
  orderId: string;
  symbol: string;
  status:
    | "NEW"
    | "PARTIALLY_FILLED"
    | "FILLED"
    | "CANCELED"
    | "PENDING_CANCEL"
    | "REJECTED"
    | "EXPIRED";
  clientOrderId: string;
  price: string;
  origQty: string;
  executedQty: string;
}

