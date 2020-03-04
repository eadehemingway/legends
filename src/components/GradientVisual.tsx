import React, { useEffect } from "react";
import * as d3 from "d3";

export default function Gradient({ data }) {
  useEffect(() => {
    const svgWidth = 850;
    const svgHeight = 200;
    const margin = 50;
    const gradientWidth = svgWidth - margin;
    const svg = d3
      .select("#Gradient-svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);

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
      .attr("x", margin / 2)
      .attr("y", margin)
      .attr("width", gradientWidth)
      .attr("height", 10)
      .style("fill", "url(#linear-gradient)");

    svg
      .selectAll("text")
      .data(data.items)
      .enter()
      .append("text")
      .text(d => d.name)
      .attr("x", (d, i) => {
        const wordLength = 30;
        return i ? gradientWidth - wordLength : wordLength;
      })
      .attr("y", margin + 30);
  }, [data.items]);

  return (
    <>
      <svg id="Gradient-svg"></svg>
    </>
  );
}
