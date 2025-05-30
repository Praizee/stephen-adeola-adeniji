import React, { useState } from "react";
import { Typography } from "../../atoms/Typography";
import { Button } from "../../atoms/Button";
import { FormField } from "../../molecules/FormField";
import "./TradingForm.css";
import { Icon } from "../../atoms/Icon";

interface TradingFormProps {
  currentPrice: number;
  availableBalanceUSD: number;
  availableBalanceBTC: number;
  onSubmitOrder: (type: "buy" | "sell", price: number, amount: number) => void;
}

const TradingForm: React.FC<TradingFormProps> = ({
  currentPrice,
  availableBalanceUSD,
  availableBalanceBTC,
  onSubmitOrder,
}) => {
  const [orderType, setOrderType] = useState<"buy" | "sell">("buy");
  const [limitType, setLimitType] = useState<"limit" | "market">("limit");
  const [limitPrice, setLimitPrice] = useState<string>(currentPrice.toFixed(2));
  const [amount, setAmount] = useState<string>("");
  const [total, setTotal] = useState<string>("0.00");

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = e.target.value;
    setLimitPrice(newPrice);
    calculateTotal(newPrice, amount);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = e.target.value;
    setAmount(newAmount);
    calculateTotal(limitPrice, newAmount);
  };

  const calculateTotal = (priceStr: string, amountStr: string) => {
    const price = parseFloat(priceStr);
    const amountNum = parseFloat(amountStr);
    if (!isNaN(price) && !isNaN(amountNum)) {
      setTotal((price * amountNum).toFixed(2));
    } else {
      setTotal("0.00");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseFloat(limitPrice);
    const amountNum = parseFloat(amount);
    if (!isNaN(price) && !isNaN(amountNum) && amountNum > 0) {
      onSubmitOrder(orderType, price, amountNum);
      // Reset form or show success/error
    } else {
      // Show validation error
      alert("Please enter valid price and amount.");
    }
  };

  return (
    <div className="trading-form">
      <div className="trading-form__type-selector">
        <Button
          variant={orderType === "buy" ? "success" : "secondary"}
          onClick={() => setOrderType("buy")}
          className="trading-form__type-button trading-form__type-button--buy"
        >
          Buy
        </Button>
        <Button
          variant={orderType === "sell" ? "danger" : "secondary"}
          onClick={() => setOrderType("sell")}
          className="trading-form__type-button trading-form__type-button--sell"
        >
          Sell
        </Button>
      </div>

      <div className="trading-form__order-type-selector">
        <Button
          variant={limitType === "limit" ? "primary" : "ghost"}
          onClick={() => setLimitType("limit")}
          size="small"
        >
          Limit
        </Button>
        <Button
          variant={limitType === "market" ? "primary" : "ghost"}
          onClick={() => setLimitType("market")}
          size="small"
        >
          Market
        </Button>
        <Typography
          variant="caption"
          color="muted"
          className="trading-form__help-icon"
        >
          <Icon name="plus" size="small" />
        </Typography>
      </div>

      <form onSubmit={handleSubmit} className="trading-form__inputs">
        <FormField
          label="Limit price"
          id="limit-price"
          type="number"
          step="0.01"
          value={limitPrice}
          onChange={handlePriceChange}
          readOnly={limitType === "market"}
        />
        <FormField
          label="Amount"
          id="amount"
          type="number"
          step="0.00001"
          value={amount}
          onChange={handleAmountChange}
        />

        <div className="trading-form__total">
          <Typography
            variant="body2"
            component="span"
            className="trading-form__total-label"
          >
            Total
          </Typography>
          <Typography
            variant="body1"
            component="span"
            className="trading-form__total-value"
          >
            {total} USD
          </Typography>
        </div>

        <div className="trading-form__post-only">
          <input
            type="checkbox"
            id="post-only"
            className="trading-form__checkbox"
          />
          <label htmlFor="post-only" className="trading-form__checkbox-label">
            <Typography variant="caption" component="span" color="muted">
              Post Only
            </Typography>
            <Icon name="plus" size="small" />
          </label>
        </div>

        <Typography
          variant="body2"
          color="default"
          className="trading-form__total-account-value"
        >
          Total account value:{" "}
          <Typography component="span" weight="semibold">
            NGRN
          </Typography>
        </Typography>
        <Typography
          variant="body2"
          color="default"
          className="trading-form__open-orders"
        >
          Open Orders:{" "}
          <Typography component="span" weight="semibold">
            0.00
          </Typography>
        </Typography>
        <Typography
          variant="body2"
          color="default"
          className="trading-form__available"
        >
          Available:{" "}
          <Typography component="span" weight="semibold">
            {availableBalanceUSD.toFixed(2)} USD /{" "}
            {availableBalanceBTC.toFixed(5)} BTC
          </Typography>
        </Typography>

        <Button
          type="submit"
          variant={orderType === "buy" ? "success" : "danger"}
          size="large"
          className="trading-form__submit-button"
        >
          {orderType === "buy" ? "Buy BTC" : "Sell BTC"}
        </Button>
        <Button
          variant="secondary"
          size="large"
          className="trading-form__deposit-button"
        >
          Deposit
        </Button>
      </form>
    </div>
  );
};

export default TradingForm;

