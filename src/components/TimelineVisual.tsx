import React, { useEffect, useState } from "react";
import * as d3 from "d3";

export default function Timeline({ data }) {
  const { minDate, maxDate, step } = data.timeline;
  const minYearInRange = new Date(minDate).getFullYear();
  const maxYearInRange = new Date(maxDate).getFullYear();
  const [minYear, setMinYear] = useState(2004);
  const [maxYear, setMaxYear] = useState(2009);

  useEffect(() => {
    const rangeValues = d3.range(minYearInRange, maxYearInRange + step, step);
    const svgWidth = 700;
    const svgHeight = 400;
    const sliderWidth = svgWidth - 200;
    const xScale = d3
      .scaleLinear()
      .domain([minYearInRange, maxYearInRange])
      .range([0, sliderWidth])
      .clamp(true);

    const grey = "#CCCCCC";
    const purple = "#CAB1D6";

    const svg = d3
      .select("#Timeline-svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    const sliderGroup = svg.append("g").attr("transform", "translate(70,100)");

    const lineStrokeWidth = 4;
    const trackLine = sliderGroup
      .append("line")
      .attr("x1", xScale(minYearInRange))
      .attr("x2", xScale(maxYearInRange))
      .attr("stroke", grey)
      .attr("stroke-width", lineStrokeWidth)
      .attr("stroke-linecap", "round");

    const innerTrack = sliderGroup
      .append("line")
      .attr("x1", xScale(minYear))
      .attr("x2", xScale(maxYear))
      .attr("class", "inner-track")
      .attr("stroke", purple)
      .attr("stroke-width", lineStrokeWidth);

    const drag = d3.drag().on("drag", function() {
      const handleClass = d3.select(this).attr("class");
      const minMax = handleClass.split("-")[0];
      dragged(d3.event.x, minMax);
    });

    const handleRadius = 8;
    const minHandle = sliderGroup
      .append("circle")
      .attr("class", "min-handle")
      .attr("r", handleRadius)
      .attr("cx", xScale(minYear))
      .attr("fill", purple)
      .attr("cursor", "pointer")
      .call(e => drag(e, "min"));

    const maxHandle = sliderGroup
      .append("circle")
      .attr("class", "max-handle")
      .attr("r", handleRadius)
      .attr("cx", xScale(maxYear))
      .attr("fill", purple)
      .attr("cursor", "pointer")
      .call(e => drag(e, "max"));

    const textOpacity = 0.7;
    const minText = sliderGroup
      .append("text")
      .attr("class", "min-text")
      .attr("opacity", textOpacity)
      .attr("transform", "translate(0, 30)")
      .text(minYear);

    const maxText = sliderGroup
      .append("text")
      .attr("class", "max-text")
      .attr("opacity", textOpacity)
      .attr("transform", `translate(${sliderWidth - 30},30)`)
      .text(maxYear);

    function dragged(xCoordinate, minMax) {
      const xDate = xScale.invert(xCoordinate);

      const indexOfNewVal = rangeValues.findIndex(val => {
        const minVal = val - 0.5;
        const maxVal = val + 0.5;
        return minVal < xDate && xDate < maxVal;
      });

      const cx = xScale(rangeValues[indexOfNewVal]);
      const textVal = rangeValues[indexOfNewVal];

      const innerTrack = d3.selectAll(".inner-track");
      const text = d3.selectAll(`.${minMax}-text`);
      const handle = d3.selectAll(`.${minMax}-handle`);

      if (minMax === "min" && maxYear > textVal) {
        setMinYear(textVal);
        innerTrack.attr("x1", cx);
        handle.attr("cx", cx);
        text.text(textVal);
      }
      if (minMax === "max" && minYear < textVal) {
        setMaxYear(textVal);
        innerTrack.attr("x2", cx);
        handle.attr("cx", cx);
        const text = d3.selectAll(`.${minMax}-text`);
        text.text(textVal);
      }
    }
  }, [data.items, maxYear, maxYearInRange, minYear, minYearInRange, step]);

  return (
    <>
      <svg id="Timeline-svg"></svg>
    </>
  );
}
