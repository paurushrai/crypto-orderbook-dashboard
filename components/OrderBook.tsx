"use client";

import { Card } from "@/components/ui/card";
import SpreadIndicator from "./SpreadIndicator";
import OrderbookImbalance from "./OrderbookImbalance";
import MarketDepth from "./MarketDepth";
import OrderbookTable from "./OrderbookTable";
import { useMarketData } from "@/hooks/use-market-data";
import ErrorBoundaryUsingClass from "@/components/ErrorBoundary";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@/components/ErrorFallback";
import BugCounter from "./BugCounter";

export type OrderBookEntry = {
  price: number;
  size: number;
};

export type OrderBookData = {
  bids: OrderBookEntry[];
  asks: OrderBookEntry[];
  timestamp: number;
};

export default function OrderBook() {
  const orderBookData = useMarketData();
  const spread =
    orderBookData.asks[0]?.price - orderBookData.bids[0]?.price || 0;

  return (
    <div className="grid gap-6">
      <Card className="p-6">
        <h1>Error Boundary Using Class Component</h1>
        <ErrorBoundaryUsingClass>
          <BugCounter />
        </ErrorBoundaryUsingClass>
        <h1>
          Error Boundary Using Function Component: react-error-boundary library
        </h1>
        <p>Recommended modern approach</p>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <BugCounter />
        </ErrorBoundary>
        <h2 className="mb-4 text-2xl font-semibold">Market Indicators</h2>
        <div className="space-y-6">
          <SpreadIndicator
            spread={spread}
            timestamp={orderBookData.timestamp}
          />
          <OrderbookImbalance
            bids={orderBookData.bids}
            asks={orderBookData.asks}
          />
          <MarketDepth bids={orderBookData.bids} asks={orderBookData.asks} />
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="mb-4 text-2xl font-semibold">Order Book</h2>
        <OrderbookTable
          bids={orderBookData.bids}
          asks={orderBookData.asks}
          spread={spread}
        />
      </Card>
    </div>
  );
}
