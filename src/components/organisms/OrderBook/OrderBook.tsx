import React from "react";
import { Typography } from "../../atoms/Typography";
import { OrderBookRow } from "../../molecules/OrderBookRow";
// import { OrderBookEntry } from "../../../types/orderbook";
import { useOrderBook } from "../../../hooks/useOrderBook";
import "./OrderBook.css";
import LoadingSpinner from "../../atoms/LoadingSpinner/LoadingSpinner";

interface OrderBookProps {
  symbol: string;
}

const OrderBook: React.FC<OrderBookProps> = ({ symbol }) => {
  const { bids, asks, loading, error, currentSpread } = useOrderBook(symbol);

  // Calculate max total for visualization bar
  const allTotals = [...bids.map((b) => b.total), ...asks.map((a) => a.total)];
  const maxTotal = allTotals.length > 0 ? Math.max(...allTotals) : 1;

  if (loading)
    return (
      <div className="order-book__message">
        <LoadingSpinner />
        {/* Loading order book... */}
      </div>
    );
  if (error)
    return (
      <div className="order-book__message order-book__message--error">
        Error: {error.message}
      </div>
    );

  return (
    <div className="order-book">
      <div className="order-book__header">
        <Typography
          variant="body2"
          component="span"
          className="order-book__header-item"
        >
          Price (USD)
        </Typography>
        <Typography
          variant="body2"
          component="span"
          className="order-book__header-item"
        >
          Amount (BTC)
        </Typography>
        <Typography
          variant="body2"
          component="span"
          className="order-book__header-item"
        >
          Total
        </Typography>
      </div>
      <div className="order-book__lists">
        <div className="order-book__list order-book__list--asks">
          {/* Asks (Sell Orders) - usually displayed descending price */}
          {asks
            .slice(0, 15)
            .reverse()
            .map(
              (
                entry,
                index // Show top 15 asks, reversed for UI
              ) => (
                <OrderBookRow
                  key={index}
                  type="sell"
                  entry={entry}
                  maxTotal={maxTotal}
                />
              )
            )}
        </div>
        <div className="order-book__spread">
          <Typography variant="h5" color="default">
            {currentSpread ? currentSpread.toFixed(2) : "--.--"}
          </Typography>
          <Typography variant="caption" color="muted">
            {/* You can display spread percentage here if calculated */}
          </Typography>
        </div>
        <div className="order-book__list order-book__list--bids">
          {/* Bids (Buy Orders) - usually displayed ascending price */}
          {bids.slice(0, 15).map(
            (
              entry,
              index // Show top 15 bids
            ) => (
              <OrderBookRow
                key={index}
                type="buy"
                entry={entry}
                maxTotal={maxTotal}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderBook;

