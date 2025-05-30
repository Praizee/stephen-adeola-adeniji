import React, { useState } from "react";
import { Button } from "../../atoms/Button";
import "./OrderHistory.css";

type OrderHistoryProps = object;

type Tab = "open-orders" | "positions" | "order-history" | "trade-history";

const OrderHistory: React.FC<OrderHistoryProps> = () => {
  const [activeTab, setActiveTab] = useState<Tab>("open-orders");

  const renderContent = () => {
    switch (activeTab) {
      case "open-orders":
        return (
          <div className="order-history__content">
            <h4>No Open Orders</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id
              pulvinar nullam sit imperdiet pulvinar.
            </p>
          </div>
        );
      case "positions":
        return (
          <div className="order-history__content">
            <h4>No Positions</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id
              pulvinar nullam sit imperdiet pulvinar.
            </p>
          </div>
        );
      case "order-history":
        return (
          <div className="order-history__content">
            <h4>No Order History</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id
              pulvinar nullam sit imperdiet pulvinar.
            </p>
          </div>
        );
      case "trade-history":
        return (
          <div className="order-history__content">
            <h4>No Trade History</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id
              pulvinar nullam sit imperdiet pulvinar.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="order-history">
      <div className="order-history__tabs">
        <Button
          variant={activeTab === "open-orders" ? "primary" : "ghost"}
          size="small"
          onClick={() => setActiveTab("open-orders")}
          className="order-history__tab-button"
        >
          Open Orders
        </Button>
        <Button
          variant={activeTab === "positions" ? "primary" : "ghost"}
          size="small"
          onClick={() => setActiveTab("positions")}
          className="order-history__tab-button"
        >
          Positions
        </Button>
        <Button
          variant={activeTab === "order-history" ? "primary" : "ghost"}
          size="small"
          onClick={() => setActiveTab("order-history")}
          className="order-history__tab-button"
        >
          Order History
        </Button>
        <Button
          variant={activeTab === "trade-history" ? "primary" : "ghost"}
          size="small"
          onClick={() => setActiveTab("trade-history")}
          className="order-history__tab-button"
        >
          Trade History
        </Button>
      </div>
      <div className="order-history__panel">{renderContent()}</div>
    </div>
  );
};

export default OrderHistory;

