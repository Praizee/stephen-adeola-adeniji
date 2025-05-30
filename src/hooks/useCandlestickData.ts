import { useState, useEffect, useCallback } from "react";
import { getCandlestickData } from "../services/api";
import type {
  ProcessedCandleStickData,
  CandleStickInterval,
} from "../types/trading";

export const useCandlestickData = (
  symbol: string,
  interval: CandleStickInterval
) => {
  const [data, setData] = useState<ProcessedCandleStickData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // getCandlestickData already returns ProcessedCandleStickData[]
      const response = await getCandlestickData(symbol, interval);
      setData(response);
    } catch (err) {
      setError(err as Error);
      setData([]); // Clear data on error
    } finally {
      setLoading(false);
    }
  }, [symbol, interval]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error };
};

// import { useState, useEffect, useCallback } from "react";
// import { getCandlestickData } from "../services/api"; // Your API service
// import type { CandleStickData, CandleStickInterval } from "../types/trading";

// export const useCandlestickData = (
//   symbol: string,
//   interval: CandleStickInterval
// ) => {
//   const [data, setData] = useState<CandleStickData[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<Error | null>(null);

//   const fetchData = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await getCandlestickData(symbol, interval);
//       // Assuming API returns data in the format lightweight-charts expects:
//       // [{ time: timestamp, open: number, high: number, low: number, close: number }]
//       setData(response);
//     } catch (err) {
//       setError(err as Error);
//       setData([]); // Clear data on error
//     } finally {
//       setLoading(false);
//     }
//   }, [symbol, interval]);

//   useEffect(() => {
//     fetchData();

//     // Implement WebSocket for real-time updates if your API supports it
//     // This would involve using useWebSocket and updating `data` state
//     // with new candles or appending new data.
//     // For example:
//     // const { lastMessage } = useWebSocket(`ws://your-websocket-api/kline?symbol=<span class="math-inline">\{symbol\}&interval\=</span>{interval}`, {
//     //   onMessage: (message) => {
//     //     // Process real-time message and update data
//     //     // e.g., if message is a new candle, append it or update the last candle
//     //   }
//     // });
//   }, [fetchData]);

//   return { data, loading, error };
// };

