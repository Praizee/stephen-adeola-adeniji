import React from "react";
import { Typography } from "../../atoms/Typography";
import "./OrderBookRow.css";
import type { OrderBookEntry } from "../../../types/orderbook";

interface OrderBookRowProps {
  type: "buy" | "sell";
  entry: OrderBookEntry; // { price: number, amount: number, total: number }
  maxTotal: number; // For visualization bar width
}

const OrderBookRow: React.FC<OrderBookRowProps> = ({
  type,
  entry,
  maxTotal,
}) => {
  const { price, amount, total } = entry;
  const barWidth = (total / maxTotal) * 100;

  return (
    <div className={`order-book-row order-book-row--${type}`}>
      <div
        className={`order-book-row__fill order-book-row__fill--${type}`}
        style={{ width: `${barWidth}%` }}
      ></div>
      <Typography
        variant="body2"
        component="span"
        className={`order-book-row__price order-book-row__price--${type}`}
      >
        {price.toFixed(2)}
      </Typography>
      <Typography
        variant="body2"
        component="span"
        className="order-book-row__amount"
      >
        {amount.toFixed(5)}
      </Typography>
      <Typography
        variant="body2"
        component="span"
        className="order-book-row__total"
      >
        {total.toFixed(2)}
      </Typography>
    </div>
  );
};

export default OrderBookRow;

