export interface OrderBookEntry {
  price: number;
  amount: number;
  total: number; // price * amount, calculated client-side for convenience
}

export interface OrderBookData {
  bids: OrderBookEntry[]; // Sorted descending by price (best bid first)
  asks: OrderBookEntry[]; // Sorted ascending by price (best ask first)
  lastUpdateId?: number; // Useful for incremental updates from WS
}
