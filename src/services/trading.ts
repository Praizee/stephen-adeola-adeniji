import type { PlaceOrderRequest, PlaceOrderResponse } from "../types/trading";

const BASE_URL = "https://api.binance.com/api/v3";

async function authenticatedFetcher<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const token = localStorage.getItem("authToken"); // Get token from local storage
  if (!token) {
    throw new Error("Authentication token not found. Please log in.");
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options?.headers,
  };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Trading error" }));
    throw new Error(
      errorData.message || `API error! status: ${response.status}`
    );
  }
  return response.json();
}

export const placeNewOrder = async (
  order: PlaceOrderRequest
): Promise<PlaceOrderResponse> => {
  // Replace with your actual order placement endpoint
  const url = `${BASE_URL}/order`;
  return authenticatedFetcher<PlaceOrderResponse>(url, {
    method: "POST",
    body: JSON.stringify(order),
  });
};

export const cancelOrder = async (orderId: string): Promise<any> => {
  const url = `${BASE_URL}/order/${orderId}`;
  return authenticatedFetcher(url, {
    method: "DELETE",
  });
};

export const getOpenOrders = async (symbol?: string): Promise<any[]> => {
  const url = `${BASE_URL}/openOrders${symbol ? `?symbol=${symbol}` : ""}`;
  return authenticatedFetcher(url);
};

// Add more trading specific functions as needed (e.g., getTradeHistory, getPositions)

