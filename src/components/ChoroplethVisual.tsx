import React, { useEffect } from "react";
import * as d3 from "d3";

export default function Choropleth({ data }) {
  console.log("data:", data);
  useEffect(() => {
    const svg = d3
      .select("#choropleth-svg")
      .attr("width", 700)
      .attr("height", 400);

    const width = 70;
    const groups = svg
      .selectAll("g")
      .data(data.items)
      .enter()
      .append("g")
      .attr("transform", (d, i) => {
        return `translate(${width * i},50)`;
      });

    groups
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", width)
      .attr("height", 10)
      .style("fill", d => d.color);

    groups
      .append("text")
      .text(d => d.name)
      .attr("x", 20)
      .attr("y", 30);
  }, [data.items]);

  return (
    <>
      <svg id="choropleth-svg"></svg>
    </>
  );
}
