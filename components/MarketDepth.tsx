"use client";

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import type { OrderBookEntry } from './OrderBook';

interface MarketDepthProps {
  bids: OrderBookEntry[];
  asks: OrderBookEntry[];
}

export default function MarketDepth({ bids, asks }: Readonly<MarketDepthProps>) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    svg.selectAll("*").remove();

    const cumulativeBids = bids
      .toSorted((a, b) => b.price - a.price)
      .reduce(
        (acc: OrderBookEntry[], curr) => {
          const lastValue = acc[acc.length - 1]?.size || 0;
          acc.push({ price: curr.price, size: lastValue + curr.size });
          return acc;
        },
        []
      );

    const cumulativeAsks = asks
      .toSorted((a, b) => a.price - b.price)
      .reduce(
        (acc: OrderBookEntry[], curr) => {
          const lastValue = acc[acc.length - 1]?.size || 0;
          acc.push({ price: curr.price, size: lastValue + curr.size });
          return acc;
        },
        []
      );

    const x = d3
      .scaleLinear()
      .domain([
        d3.min(bids, (d) => d.price) || 0,
        d3.max(asks, (d) => d.price) || 0,
      ])
      .range([0, innerWidth]);

    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max([...cumulativeBids, ...cumulativeAsks], (d) => d.size) || 0,
      ])
      .range([innerHeight, 0]);

    const bidLine = d3
      .line<OrderBookEntry>()
      .x((d) => x(d.price))
      .y((d) => y(d.size));

    const askLine = d3
      .line<OrderBookEntry>()
      .x((d) => x(d.price))
      .y((d) => y(d.size));

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    g.append("path")
      .datum(cumulativeBids)
      .attr("fill", "none")
      .attr("stroke", "hsl(var(--success))")
      .attr("stroke-width", 2)
      .attr("d", bidLine);

    g.append("path")
      .datum(cumulativeAsks)
      .attr("fill", "none")
      .attr("stroke", "hsl(var(--destructive))")
      .attr("stroke-width", 2)
      .attr("d", askLine);

    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x));

    g.append("g").call(d3.axisLeft(y));

    g.append("text")
      .attr("x", innerWidth / 2)
      .attr("y", innerHeight + margin.bottom)
      .attr("text-anchor", "middle")
      .text("Price ($)");

    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - innerHeight / 2)
      .attr("dy", "1em")
      .attr("text-anchor", "middle")
      .text("Cumulative Size (BTC)");
  }, [bids, asks]);

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium">Market Depth</h3>
      <div className="h-[300px] w-full">
        <svg ref={svgRef} width="100%" height="100%" />
      </div>
    </div>
  );
}