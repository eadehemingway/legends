import React, { useEffect } from "react";
import * as d3 from "d3";

export default function Choropleth({ data, isDesktop }) {
  useEffect(() => {
    const windowWidth = window.innerWidth;
    const outerMargin = isDesktop ? 100 : 50;
    const svgWidth = windowWidth - outerMargin;
    const svgHeight = 100;
    const margin = isDesktop ? 50 : 20;
    const chloroplethWidth = svgWidth - margin;
    const svg = d3
      .select("#choropleth-svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    const rectWidth = chloroplethWidth / data.items.length;

    const groups = svg
      .selectAll("g")
      .data(data.items)
      .enter()
      .append("g")
      .attr("transform", (d, i) => {
        return `translate(${rectWidth * i + margin / 2},${margin})`;
      });

    groups
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", rectWidth)
      .attr("height", 10)
      .style("fill", d => {
        if (d.color === "#FFFFFF") {
          return "#F0F0F0";
        }
        return d.color;
      });

    groups
      .append("text")
      .text(d => d.name)
      .attr("x", margin / 2)
      .attr("y", 30)
      .attr("font-size", () => {
        return isDesktop ? "14" : "12";
      });
  }, [data.items, isDesktop]);

  return (
    <>
      <svg id="choropleth-svg"></svg>
    </>
  );
}
