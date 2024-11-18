"use client";

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import type { OrderBookEntry } from './OrderBook';

interface OrderbookImbalanceProps {
  bids: OrderBookEntry[];
  asks: OrderBookEntry[];
}

export default function OrderbookImbalance({
  bids,
  asks,
}: OrderbookImbalanceProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const totalBidVolume = d3.sum(bids, (d) => d.size);
    const totalAskVolume = d3.sum(asks, (d) => d.size);
    const imbalanceRatio =
      (totalBidVolume - totalAskVolume) / (totalBidVolume + totalAskVolume);

    const svg = d3.select(svgRef.current);
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    svg.selectAll("*").remove();

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear().domain([-1, 1]).range([0, innerWidth]);

    g.append("rect")
      .attr("x", x(-1))
      .attr("y", innerHeight / 4)
      .attr("width", innerWidth)
      .attr("height", innerHeight / 2)
      .attr("fill", "hsl(var(--muted))");

    g.append("rect")
      .attr("x", x(-1))
      .attr("y", innerHeight / 4)
      .attr("width", x(imbalanceRatio) - x(-1))
      .attr("height", innerHeight / 2)
      .attr("fill", imbalanceRatio >= 0 ? "hsl(var(--success))" : "hsl(var(--destructive))");

    g.append("line")
      .attr("x1", x(0))
      .attr("x2", x(0))
      .attr("y1", 0)
      .attr("y2", innerHeight)
      .attr("stroke", "hsl(var(--border))")
      .attr("stroke-width", 2);

    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(5)
          .tickFormat((d) => `${(+d * 100).toFixed(0)}%`)
      );

    g.append("text")
      .attr("x", innerWidth / 2)
      .attr("y", innerHeight + margin.bottom)
      .attr("text-anchor", "middle")
      .text("Imbalance Ratio");
  }, [bids, asks]);

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium">Orderbook Imbalance</h3>
      <div className="h-[200px] w-full">
        <svg ref={svgRef} width="100%" height="100%" />
      </div>
    </div>
  );
}