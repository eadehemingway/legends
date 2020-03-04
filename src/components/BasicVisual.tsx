import React, { useEffect } from "react";
import * as d3 from "d3";

export default function Basic({ data }) {
  useEffect(() => {
    const svg = d3
      .select("#basic-svg")
      .attr("width", 600)
      .attr("height", 400);

    const groups = svg
      .selectAll("g")
      .data(data.items)
      .enter()
      .append("g")
      .attr("transform", (d, i) => {
        return `translate(10,${20 * i + 50})`;
      });

    groups
      .append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 7)
      .attr("fill", d => d.color);

    groups
      .append("text")
      .text(d => d.name)
      .attr("x", 18)
      .attr("y", 5)
      .attr("font-family", "OpenSans");
  }, [data.items]);

  return (
    <>
      <svg id="basic-svg"></svg>
    </>
  );
}
