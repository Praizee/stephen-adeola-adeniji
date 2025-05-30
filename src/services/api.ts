import type {
  BinanceKline,
  ProcessedCandleStickData,
  CandleStickInterval,
  MarketOverviewData,
  UserBalances,
} from "../types/trading";

import type { OrderBookData, OrderBookEntry } from "../types/orderbook";
import type { Time } from "lightweight-charts";

const BASE_URL = "https://api.binance.com/api/v3";

async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Something went wrong" }));
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }
  return response.json();
}

export const getCandlestickData = async (
  symbol: string,
  interval: CandleStickInterval
): Promise<ProcessedCandleStickData[]> => {
  const url = `${BASE_URL}/klines?symbol=${symbol}&interval=${interval}&limit=500`;

  const rawData = await fetcher<BinanceKline[]>(url);

  return rawData.map((d: BinanceKline) => ({
    time: new Date(d[0]).getTime() as Time,
    open: parseFloat(d[1]),
    high: parseFloat(d[2]),
    low: parseFloat(d[3]),
    close: parseFloat(d[4]),
    volume: parseFloat(d[5]),
  }));
};

export const getOrderBook = async (
  symbol: string,
  limit: number = 20
): Promise<OrderBookData> => {
  // Replace with your actual order book API endpoint
  const url = `${BASE_URL}/depth?symbol=${symbol}&limit=${limit}`;
  const rawData = await fetcher<any>(url);

  const processEntries = (entries: string[][]): OrderBookEntry[] => {
    return entries.map((entry) => {
      const price = parseFloat(entry[0]);
      const amount = parseFloat(entry[1]);
      return { price, amount, total: price * amount };
    });
  };

  return {
    bids: processEntries(rawData.bids || []),
    asks: processEntries(rawData.asks || []),
  };
};

export const getMarketOverview = async (
  symbol: string
): Promise<MarketOverviewData> => {
  const url = `${BASE_URL}/ticker/24hr?symbol=${symbol}`;
  const data = await fetcher<any>(url);

  return {
    symbol: data.symbol,
    lastPrice: parseFloat(data.lastPrice),
    priceChange: parseFloat(data.priceChange),
    priceChangePercent: parseFloat(data.priceChangePercent),
    highPrice: parseFloat(data.highPrice),
    lowPrice: parseFloat(data.lowPrice),
    volume: parseFloat(data.volume),
  };
};

export const getUserBalances = async (): Promise<UserBalances> => {
  // This would typically require authentication headers
  const url = `${BASE_URL}/account`;
  const data = await fetcher<any>(url, {
    headers: {
      Authorization: "Bearer AUTH_TOKEN",
    },
  });

  const balances: UserBalances = {};
  // Assuming data.balances is an array of { asset: 'BTC', free: '1.23' }
  if (Array.isArray(data.balances)) {
    data.balances.forEach((bal: { asset: string; free: string }) => {
      balances[bal.asset] = parseFloat(bal.free);
    });
  }
  // Or if balances are directly keys like { USD: 1000, BTC: 0.5 }
  // Object.assign(balances, data.balances);

  return balances;
};

