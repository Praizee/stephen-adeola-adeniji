import { useState, useCallback } from "react";
import type { PlaceOrderRequest } from "../types/trading";
import { placeNewOrder } from "../services/trading";

export const useOrderPlacement = () => {
  const [orderStatus, setOrderStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >("idle");
  const [orderError, setOrderError] = useState<Error | null>(null);
  const [placedOrder, setPlacedOrder] = useState<any | null>(null); // Type this more specifically

  const placeOrder = useCallback(async (order: PlaceOrderRequest) => {
    setOrderStatus("pending");
    setOrderError(null);
    setPlacedOrder(null);
    try {
      const response = await placeNewOrder(order);
      setPlacedOrder(response);
      setOrderStatus("success");
      return response;
    } catch (err) {
      setOrderError(err as Error);
      setOrderStatus("error");
      throw err; // Re-throw to allow component to handle
    }
  }, []);

  return { placeOrder, orderStatus, orderError, placedOrder };
};

