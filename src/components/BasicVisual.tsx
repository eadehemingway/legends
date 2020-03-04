import React, { useEffect } from "react";
import * as d3 from "d3";

export default function Basic({ data, isDesktop }) {
  useEffect(() => {
    const svgWidth = isDesktop ? 850 : 300;
    const svgHeight = 400;
    const margin = isDesktop ? 50 : 20;
    const svg = d3
      .select("#basic-svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    const radius = 7;
    const groups = svg
      .selectAll("g")
      .data(data.items)
      .enter()
      .append("g")
      .attr("transform", (d, i) => {
        return `translate(${margin},${20 * i + margin})`;
      });

    groups
      .append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", radius)
      .attr("fill", d => d.color);

    groups
      .append("text")
      .text(d => d.name)
      .attr("x", 18)
      .attr("y", 5)
      .attr("font-family", "OpenSans")
      .attr("font-size", () => {
        return isDesktop ? "14" : "12";
      });
  }, [data.items, isDesktop]);

  return (
    <>
      <svg id="basic-svg"></svg>
    </>
  );
}
