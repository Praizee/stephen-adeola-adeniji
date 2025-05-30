import { useState, useEffect, useCallback } from "react";
import { getOrderBook } from "../services/api";

import { useWebSocket } from "./useWebSocket"; // To integrate real-time updates
import type { OrderBookData, OrderBookEntry } from "../types/orderbook";

export const useOrderBook = (symbol: string) => {
  const [bids, setBids] = useState<OrderBookEntry[]>([]);
  const [asks, setAsks] = useState<OrderBookEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [currentSpread, setCurrentSpread] = useState<number | null>(null);

  // WebSocket for real-time order book updates
  const { lastMessage, isConnected, wsError } = useWebSocket(
    `wss://stream.binance.com:9443/ws/btcusdt@depth`
    // `wss://ws-feed.pro.coinbase.com`
  );

  const calculateSpread = useCallback(
    (currentBids: OrderBookEntry[], currentAsks: OrderBookEntry[]) => {
      if (currentBids.length > 0 && currentAsks.length > 0) {
        const bestBid = currentBids[0].price;
        const bestAsk = currentAsks[0].price;
        setCurrentSpread(bestAsk - bestBid);
      } else {
        setCurrentSpread(null);
      }
    },
    []
  );

  const fetchInitialData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data: OrderBookData = await getOrderBook(symbol);
      // Assuming API returns sorted bids (desc) and asks (asc)
      setBids(data.bids);
      setAsks(data.asks);
      calculateSpread(data.bids, data.asks);
    } catch (err) {
      setError(err as Error);
      setBids([]);
      setAsks([]);
      setCurrentSpread(null);
    } finally {
      setLoading(false);
    }
  }, [symbol, calculateSpread]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  useEffect(() => {
    // Process real-time WebSocket messages for order book updates
    if (lastMessage) {
      // This logic will highly depend on your WebSocket API's message format.
      // It could be a full snapshot or incremental updates (deltas).
      // For incremental, you'd merge/update the existing bids/asks arrays.
      // Example (simplified - assumes full snapshot for each update or specific delta handling):
      const message: any = lastMessage; // Cast to 'any' or specific WebSocket type
      if (message.dataType === "depthUpdate") {
        const updatedBids =
          message.bids?.map((b: [string, string]) => ({
            price: parseFloat(b[0]),
            amount: parseFloat(b[1]),
            total: parseFloat(b[0]) * parseFloat(b[1]),
          })) || bids;
        const updatedAsks =
          message.asks?.map((a: [string, string]) => ({
            price: parseFloat(a[0]),
            amount: parseFloat(a[1]),
            total: parseFloat(a[0]) * parseFloat(a[1]),
          })) || asks;

        updatedBids.sort(
          (a: OrderBookEntry, b: OrderBookEntry): number => b.price - a.price
        ); // Descending for bids
        updatedAsks.sort(
          (a: OrderBookEntry, b: OrderBookEntry) => a.price - b.price
        ); // Ascending for asks

        setBids(updatedBids);
        setAsks(updatedAsks);
        calculateSpread(updatedBids, updatedAsks);
      }
    }
  }, [lastMessage, bids, asks, calculateSpread]);

  return { bids, asks, loading, error, currentSpread, isConnected, wsError };
};

