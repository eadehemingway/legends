import React, { useEffect } from "react";
import * as d3 from "d3";

import getSvgWidth from "../utils/getSvgWidth";
import getIsDesktop from "../utils/getIsDesktop";
import getFontSize from "../utils/getFontSize";

export default function Basic({ data, windowWidth }) {
  useEffect(() => {
    const isDesktop = getIsDesktop(windowWidth);
    const svgWidth = getSvgWidth(isDesktop, windowWidth);
    const svgHeight = 400;
    const margin = isDesktop ? 50 : 20;
    const svg = d3
      .select("#basic-svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    const radius = 7;
    const padding = 6;
    const lineHeight = radius * 2 + padding;
    const groups = svg
      .selectAll("g")
      .data(data.items)
      .enter()
      .append("g")
      .attr(
        "transform",
        (d, i) => `translate(${margin},${lineHeight * i + margin})`
      );

    groups
      .append("circle")
      .attr("r", radius)
      .attr("fill", d => d.color);

    const fontSize = getFontSize(isDesktop);
    groups
      .append("text")
      .text(d => d.name)
      .attr("x", radius * 2 + padding)
      .attr("y", radius / 2)
      .attr("font-family", "OpenSans")
      .attr("font-size", fontSize);
  }, [data.items, windowWidth]);

  return <svg id="basic-svg" />;
}
