import React, { useEffect } from "react";
import * as d3 from "d3";

import getSvgWidth from "../utils/getSvgWidth";
import getIsDesktop from "../utils/getIsDesktop";
import getFontSize from "../utils/getFontSize";

export default function Choropleth({ data, windowWidth }) {
  useEffect(() => {
    const isDesktop = getIsDesktop(windowWidth);
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

    const rectHeight = 10;
    const rectEnterSelection = groupEnterSelection
      .append("rect")
      .attr("height", rectHeight)
      .style("fill", d => (d.color === "#FFFFFF" ? "#F0F0F0" : d.color));

    const rectSelection = svg.selectAll("rect");
    const rectUpdateSelection = rectSelection.merge(rectEnterSelection);
    rectUpdateSelection.attr("width", rectWidth);

    const fontSize = getFontSize(isDesktop);
    const padding = 7;
    const textYOffset = rectHeight + fontSize + padding;
    const textEnterSelection = groupEnterSelection
      .append("text")
      .text(d => d.name)
      .attr("y", textYOffset)
      .style("text-anchor", "middle");

    const textSelection = svg.selectAll("text");
    const textUpdateSelection = textSelection.merge(textEnterSelection);

    textUpdateSelection.attr("font-size", fontSize).attr("x", rectWidth / 2);
  }, [data.items, windowWidth]);

  return (
    <>
      <svg id="choropleth-svg"></svg>
    </>
  );
}
