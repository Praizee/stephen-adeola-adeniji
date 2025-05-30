// This file could contain helper functions for parsing specific WebSocket messages
// or managing WebSocket state that is too complex for a single hook.
// For example, if you have multiple WS streams, or need to manage a local order book state
// that is updated incrementally.

import type { CandleStickData } from "../types/trading";
import type { Time } from "lightweight-charts";

interface KlineWebSocketMessage {
  e: string;
  k: {
    t: number;
    o: string;
    h: string;
    l: string;
    c: string;
    v: string;
  };
}

export const processKlineWebSocketMessage = (
  message: KlineWebSocketMessage
): CandleStickData | null => {
  if (message.e === "kline" && message.k) {
    const k = message.k;
    return {
      time: (k.t / 1000) as Time, // Convert ms to seconds
      open: parseFloat(k.o),
      high: parseFloat(k.h),
      low: parseFloat(k.l),
      close: parseFloat(k.c),
      // volume: parseFloat(k.v),
    };
  }
  return null;
};

// to apply order book deltas
import type { OrderBookEntry } from "../types/orderbook";

export const applyOrderBookDeltas = (
  currentBids: OrderBookEntry[],
  currentAsks: OrderBookEntry[],
  deltas: { b: string[][]; a: string[][] }
): { bids: OrderBookEntry[]; asks: OrderBookEntry[] } => {
  let newBids = [...currentBids];
  let newAsks = [...currentAsks];

  // Update bids
  deltas.b.forEach((delta) => {
    const price = parseFloat(delta[0]);
    const quantity = parseFloat(delta[1]);

    if (quantity === 0) {
      // Remove entry
      newBids = newBids.filter((b) => b.price !== price);
    } else {
      // Update or add entry
      const existingIndex = newBids.findIndex((b) => b.price === price);
      if (existingIndex > -1) {
        newBids[existingIndex] = {
          price,
          amount: quantity,
          total: price * quantity,
        };
      } else {
        newBids.push({ price, amount: quantity, total: price * quantity });
      }
    }
  });

  // Update asks (similar logic)
  deltas.a.forEach((delta) => {
    const price = parseFloat(delta[0]);
    const quantity = parseFloat(delta[1]);

    if (quantity === 0) {
      newAsks = newAsks.filter((a) => a.price !== price);
    } else {
      const existingIndex = newAsks.findIndex((a) => a.price === price);
      if (existingIndex > -1) {
        newAsks[existingIndex] = {
          price,
          amount: quantity,
          total: price * quantity,
        };
      } else {
        newAsks.push({ price, amount: quantity, total: price * quantity });
      }
    }
  });

  // Re-sort after updates
  newBids.sort((a, b) => b.price - a.price); // Descending
  newAsks.sort((a, b) => a.price - b.price); // Ascending

  return { bids: newBids, asks: newAsks };
};

