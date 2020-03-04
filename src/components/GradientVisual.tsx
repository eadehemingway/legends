import React, { useEffect } from "react";
import * as d3 from "d3";

export default function Gradient({ data }) {
  useEffect(() => {
    const svg = d3
      .select("#Gradient-svg")
      .attr("width", 700)
      .attr("height", 400);

    const linearGradient = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "linear-gradient");

    linearGradient
      .selectAll("stop")
      .data(data.items)
      .enter()
      .append("stop")
      .attr("offset", (d, i) => {
        const offset = i * (100 / data.items.length);
        return `${offset}%`;
      })
      .attr("stop-color", d => d.color);

    svg
      .append("rect")
      .attr("x", 0)
      .attr("y", 50)
      .attr("width", 700)
      .attr("height", 10)
      .style("fill", "url(#linear-gradient)");

    svg
      .selectAll("text")
      .data(data.items)
      .enter()
      .append("text")
      .text(d => d.name)
      .attr("x", (d, i) => {
        const x = i * (100 / data.items.length + 1);
        return `${x}%`;
      })
      .attr("y", 80);
  }, [data.items]);

  return (
    <>
      <svg id="Gradient-svg"></svg>
    </>
  );
}
