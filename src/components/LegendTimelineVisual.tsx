import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import moment from "moment";
import getSvgWidth from "../utils/getSvgWidth";
import getIsDesktop from "../utils/getIsDesktop";
import getFontSize from "../utils/getFontSize";

export default function Timeline({ data, windowWidth }) {
  const { minDate, maxDate, step, speed, dateFormat } = data.timeline;
  const minYearInRange = moment(minDate).format(dateFormat);
  const maxYearInRange = moment(maxDate).format(dateFormat);
  const [minYear, setMinYear] = useState(2004);
  const [maxYear, setMaxYear] = useState(2009);

  function initialDrawing() {
    const svg = d3.select("#timeline-svg");
    const sliderGroup = svg.append("g").attr("class", "slider-group");
    sliderGroup.append("line").attr("class", "outer-track");
    sliderGroup.append("line").attr("class", "inner-track");
    sliderGroup.append("circle").attr("class", "min-handle");
    sliderGroup.append("circle").attr("class", "max-handle");
    sliderGroup.append("text").attr("class", "min-text");
    sliderGroup.append("text").attr("class", "max-text");
  }

  useEffect(() => {
    initialDrawing();
  }, []);

  useEffect(() => {
    const rangeValues = d3.range(minYearInRange, maxYearInRange + step, step);
    const isDesktop = getIsDesktop(windowWidth);
    const svgWidth = getSvgWidth(isDesktop, windowWidth);
    const svgHeight = 100;
    const margin = isDesktop ? 50 : 20;
    const sliderWidth = svgWidth - margin;
    const xScale = d3
      .scaleLinear()
      .domain([minYearInRange, maxYearInRange])
      .range([0, sliderWidth])
      .clamp(true);

    const grey = "#CCCCCC";
    const purple = "#CAB1D6";

    const svg = d3
      .select("#timeline-svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    const sliderGroup = svg
      .selectAll(".slider-group")
      .attr("transform", `translate(${margin / 2},${margin})`);

    const lineStrokeWidth = 4;

    sliderGroup
      .selectAll(".outer-track")
      .attr("x1", xScale(minYearInRange))
      .attr("x2", xScale(maxYearInRange))
      .attr("stroke", grey)
      .attr("class", "outer-track")
      .attr("stroke-linecap", "round");

    sliderGroup
      .selectAll(".inner-track")
      .attr("x1", xScale(minYear))
      .attr("x2", xScale(maxYear))
      .attr("class", "inner-track")
      .attr("stroke", purple);

    svg.selectAll("line").attr("stroke-width", lineStrokeWidth);

    function dragHandle(selection) {
      const handleClass = selection.attr("class");
      const minMax = handleClass.split("-")[0];
      dragged(d3.event.x, minMax);
    }

    const drag = d3
      .drag()
      .on("start", function() {
        dragHandle(d3.select(this));
      })
      .on("drag", function() {
        dragHandle(d3.select(this));
      })
      .on("end", function() {
        dragHandle(d3.select(this));
      });

    const handleRadius = 8;
    sliderGroup
      .selectAll(".min-handle")
      .attr("class", "min-handle")
      .attr("cx", xScale(minYear))
      .call(e => drag(e, "min"));

    sliderGroup
      .selectAll(".max-handle")
      .attr("class", "max-handle")
      .attr("cx", xScale(maxYear))
      .call(e => drag(e, "max"));

    svg
      .selectAll("circle")
      .attr("cursor", "pointer")
      .attr("fill", purple)
      .attr("r", handleRadius);

    const textOpacity = 0.7;
    sliderGroup
      .selectAll(".min-text")
      .attr("class", "min-text")
      .attr("transform", "translate(0, 30)")
      .text(minYear);

    sliderGroup
      .selectAll(".max-text")
      .attr("class", "max-text")
      .attr("transform", `translate(${sliderWidth - 30},30)`)
      .text(maxYear);
    const fontSize = getFontSize(isDesktop);

    svg
      .selectAll("text")
      .attr("opacity", textOpacity)
      .attr("font-size", fontSize);

    function dragged(oldXCoordinate, minOrMax) {
      const oldDateVal = xScale.invert(oldXCoordinate);

      const indexOfNewVal = rangeValues.findIndex(val => {
        const bottomMidPoint = val - step / 2;
        const topMidPoint = val + step / 2;
        return bottomMidPoint < oldDateVal && oldDateVal < topMidPoint;
      });

      const newXCoordinate = xScale(rangeValues[indexOfNewVal]);
      const newDateVal = rangeValues[indexOfNewVal];

      const innerTrack = d3.selectAll(".inner-track");
      const text = d3.selectAll(`.${minOrMax}-text`);
      const handle = d3.selectAll(`.${minOrMax}-handle`);

      function updateHandleAndText() {
        handle
          .transition()
          .duration(speed)
          .attrTween("cx", () =>
            d3.interpolate(oldXCoordinate, newXCoordinate)
          );
        text.text(newDateVal);
      }
      const minimumLessThanMaximum = minOrMax === "min" && maxYear > newDateVal;

      if (minimumLessThanMaximum) {
        setMinYear(newDateVal);
        innerTrack
          .transition()
          .duration(speed)
          .attr("x1", newXCoordinate);
        updateHandleAndText();
      }

      const maximumGreaterThanMinimum =
        minOrMax === "max" && minYear < newDateVal;

      if (maximumGreaterThanMinimum) {
        setMaxYear(newDateVal);
        innerTrack
          .transition()
          .duration(speed)
          .attr("x2", newXCoordinate);
        updateHandleAndText();
      }
    }
  }, [
    data.items,
    maxYear,
    maxYearInRange,
    minYear,
    minYearInRange,
    speed,
    step,
    windowWidth
  ]);

  return (
    <>
      <svg id="timeline-svg"></svg>
    </>
  );
}
