import { useState, useEffect, useCallback } from "react";
import { getMarketOverview, getUserBalances } from "../services/api";
import type { MarketOverviewData, UserBalances } from "../types/trading";

export const useTradingData = (symbol: string) => {
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [priceChange24h, setPriceChange24h] = useState<number>(0);
  const [priceChangePercent24h, setPriceChangePercent24h] = useState<number>(0);
  const [high24h, setHigh24h] = useState<number>(0);
  const [low24h, setLow24h] = useState<number>(0);
  const [volume24h, setVolume24h] = useState<number>(0);
  const [availableBalanceUSD, setAvailableBalanceUSD] = useState<number>(0);
  const [availableBalanceBTC, setAvailableBalanceBTC] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const marketData: MarketOverviewData = await getMarketOverview(symbol);
      const balances: UserBalances = await getUserBalances();

      setCurrentPrice(marketData.lastPrice);
      setPriceChange24h(marketData.priceChange);
      setPriceChangePercent24h(marketData.priceChangePercent);
      setHigh24h(marketData.highPrice);
      setLow24h(marketData.lowPrice);
      setVolume24h(marketData.volume);

      setAvailableBalanceUSD(balances.USD || 0);
      setAvailableBalanceBTC(balances.BTC || 0);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [symbol]);

  useEffect(() => {
    fetchData();
    // Set up polling or WebSocket for real-time updates for header data if needed
    const interval = setInterval(fetchData, 15000); // Poll every 15 seconds for market data
    return () => clearInterval(interval);
  }, [fetchData]);

  return {
    currentPrice,
    priceChange24h,
    priceChangePercent24h,
    high24h,
    low24h,
    volume24h,
    availableBalanceUSD,
    availableBalanceBTC,
    loading,
    error,
  };
};

