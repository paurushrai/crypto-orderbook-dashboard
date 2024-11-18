"use client";

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface SpreadIndicatorProps {
  spread: number;
  timestamp: number;
}

export default function SpreadIndicator({
  spread,
  timestamp,
}: SpreadIndicatorProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const data = useRef<{ timestamp: number; spread: number }[]>([]);
  const MAX_POINTS = 60;

  useEffect(() => {
    if (!svgRef.current) return;

    data.current.push({ timestamp, spread });
    if (data.current.length > MAX_POINTS) {
      data.current.shift();
    }

    const svg = d3.select(svgRef.current);
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    svg.selectAll("*").remove();

    const x = d3
      .scaleTime()
      .domain([
        d3.min(data.current, (d) => d.timestamp) || 0,
        d3.max(data.current, (d) => d.timestamp) || 0,
      ])
      .range([0, innerWidth]);

    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data.current, (d) => d.spread) || 0,
      ])
      .range([innerHeight, 0]);

    const line = d3
      .line<{ timestamp: number; spread: number }>()
      .x((d) => x(d.timestamp))
      .y((d) => y(d.spread));

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    g.append("path")
      .datum(data.current)
      .attr("fill", "none")
      .attr("stroke", "hsl(var(--primary))")
      .attr("stroke-width", 2)
      .attr("d", line);

    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x).ticks(5));

    g.append("g").call(d3.axisLeft(y));

    g.append("text")
      .attr("x", innerWidth / 2)
      .attr("y", innerHeight + margin.bottom)
      .attr("text-anchor", "middle")
      .text("Time");

    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - innerHeight / 2)
      .attr("dy", "1em")
      .attr("text-anchor", "middle")
      .text("Spread ($)");
  }, [spread, timestamp]);

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium">Spread Indicator</h3>
      <div className="h-[300px] w-full">
        <svg ref={svgRef} width="100%" height="100%" />
      </div>
    </div>
  );
}