import React, { useEffect } from "react";
import * as d3 from "d3";

import getSvgWidth from "./getSvgWidth";

export default function Choropleth({ data, isDesktop, windowWidth }) {
  useEffect(() => {
    const svgWidth = getSvgWidth(isDesktop, windowWidth);
    const svgHeight = 100;
    const margin = isDesktop ? 50 : 20;
    const chloroplethWidth = svgWidth - margin;
    const svg = d3
      .select("#choropleth-svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    const rectWidth = chloroplethWidth / data.items.length;

    const groupsSelection = svg.selectAll("g").data(data.items);
    const groupEnterSelection = groupsSelection.enter().append("g");
    const groupUpdateSelection = groupEnterSelection.merge(groupsSelection);

    groupUpdateSelection.attr(
      "transform",
      (d, i) => `translate(${rectWidth * i + margin / 2},${margin})`
    );

    const rectEnterSelection = groupEnterSelection
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("height", 10)
      .style("fill", d => (d.color === "#FFFFFF" ? "#F0F0F0" : d.color));

    const rectSelection = svg.selectAll("rect");
    const rectUpdateSelection = rectSelection.merge(rectEnterSelection);
    rectUpdateSelection.attr("width", rectWidth);

    const textEnterSelection = groupEnterSelection
      .append("text")
      .text(d => d.name)
      .attr("x", margin / 2)
      .attr("y", 30);

    const textSelection = svg.selectAll("text");
    const textUpdateSelection = textSelection.merge(textEnterSelection);
    textUpdateSelection.attr("font-size", () => (isDesktop ? "14" : "12"));
  }, [data.items, isDesktop, windowWidth]);

  return (
    <>
      <svg id="choropleth-svg"></svg>
    </>
  );
}
