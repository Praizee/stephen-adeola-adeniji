import React from "react";
import { TradingLayout } from "../../templates/TradingLayout";
import { useTradingData } from "../../../hooks/useTradingData";
import { useOrderPlacement } from "../../../hooks/useOrderPlacement";
// import LoadingSpinner from "../../atoms/LoadingSpinner/LoadingSpinner";
import "./TradingPage.css";

const TradingPage: React.FC = () => {
  const symbol = "BTCUSDT"; // Or dynamically fetch/select
  const {
    currentPrice,
    priceChange24h,
    priceChangePercent24h,
    high24h,
    low24h,
    volume24h,
    availableBalanceUSD,
    availableBalanceBTC,
    // loading,
    // error,
  } = useTradingData(symbol);

  const { placeOrder, orderStatus, orderError } = useOrderPlacement();

  const handleSubmitOrder = async (
    type: "buy" | "sell",
    price: number,
    amount: number
  ) => {
    // Implement logic to send order to backend via placeOrder hook
    console.log(`Placing ${type} order for ${amount} BTC at ${price} USD`);
    await placeOrder({ symbol, type, price, amount });
    if (orderStatus === "success") {
      alert("Order placed successfully!");
    } else if (orderError) {
      alert(`Order failed: ${orderError.message}`);
    }
  };

  // if (loading)
  //   return (
  //     <div className="trading-page__message">
  //       <LoadingSpinner />
  //       {/* Loading trading data... */}
  //     </div>
  //   );
  // if (error)
  //   return (
  //     <div className="trading-page__message trading-page__message--error">
  //       Failed to load trading data: {error.message}
  //     </div>
  //   );

  return (
    <div className="trading-page">
      <TradingLayout
        currentPrice={currentPrice}
        priceChange24h={priceChange24h}
        priceChangePercent24h={priceChangePercent24h}
        high24h={high24h}
        low24h={low24h}
        volume24h={volume24h}
        availableBalanceUSD={availableBalanceUSD}
        availableBalanceBTC={availableBalanceBTC}
        symbol={symbol}
        onSubmitOrder={handleSubmitOrder}
      />
    </div>
  );
};

export default TradingPage;

