"use client";

import { useState, useEffect } from 'react';
import type { OrderBookData } from '@/components/OrderBook';

const POLLING_INTERVAL = 1000; // 1 second

export function useMarketData() {
  const [orderBookData, setOrderBookData] = useState<OrderBookData>({
    bids: [],
    asks: [],
    timestamp: Date.now(),
  });

  useEffect(() => {
    const fetchOrderBook = async () => {
      try {
        const response = await fetch('https://api.exchange.coinbase.com/products/BTC-USD/book?level=2');
        const data = await response.json();

        setOrderBookData({
          bids: data.bids.map(([price, size]: string[]) => ({
            price: parseFloat(price),
            size: parseFloat(size),
          })).slice(0, 10),
          asks: data.asks.map(([price, size]: string[]) => ({
            price: parseFloat(price),
            size: parseFloat(size),
          })).slice(0, 10),
          timestamp: Date.now(),
        });
      } catch (error) {
        console.error('Error fetching order book:', error);
      }
    };

    // Initial fetch
    fetchOrderBook();

    // Set up polling
    const intervalId = setInterval(fetchOrderBook, POLLING_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  return orderBookData;
}