import React from "react";
import "./TradingLayout.css";
import { TradingChart } from "../../organisms/TradingChart";
import { OrderBook } from "../../organisms/OrderBook";
import { TradingForm } from "../../organisms/TradingForm";
import { OrderHistory } from "../../organisms/OrderHistory";
import { Header } from "../../organisms/Header";
import Navbar from "../../molecules/Navbar/Navbar";

interface TradingLayoutProps {
  // Data that needs to be passed down to organisms
  currentPrice: number;
  priceChange24h: number;
  priceChangePercent24h: number;
  high24h: number;
  low24h: number;
  volume24h: number;
  availableBalanceUSD: number;
  availableBalanceBTC: number;
  symbol: string; // e.g., "BTCUSDT"
  onSubmitOrder: (type: "buy" | "sell", price: number, amount: number) => void;
}

const TradingLayout: React.FC<TradingLayoutProps> = ({
  currentPrice,
  availableBalanceUSD,
  availableBalanceBTC,
  symbol,
  onSubmitOrder,
}) => {
  return (
    <div className="trading-layout">
      <Navbar />
      <Header />
      <main className="trading-layout__main-content">
        <div className="trading-layout__chart-section">
          <TradingChart symbol={symbol} />
        </div>
        <div className="trading-layout__right-sidebar">
          <OrderBook symbol={symbol} />
          <TradingForm
            currentPrice={currentPrice}
            availableBalanceUSD={availableBalanceUSD}
            availableBalanceBTC={availableBalanceBTC}
            onSubmitOrder={onSubmitOrder}
          />
        </div>
        <div className="trading-layout__order-history">
          <OrderHistory />
        </div>
      </main>
    </div>
  );
};

export default TradingLayout;

