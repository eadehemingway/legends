import React from "react";

import Basic from "./BasicVisual";
import Gradient from "./GradientVisual";
import Choropleth from "./ChoroplethVisual";
import Timeline from "./TimelineVisual";
import { legendData, LegendType } from "../types";

interface Props {
  data: legendData;
  windowWidth: number;
}

export default function LegendVisual({ data, windowWidth }: Props) {
  switch (data.type) {
    case LegendType.basic:
      return <Basic data={data} windowWidth={windowWidth} />;
    case LegendType.gradient:
      return <Gradient data={data} windowWidth={windowWidth} />;
    case LegendType.choropleth:
      return <Choropleth data={data} windowWidth={windowWidth} />;
    case LegendType.timeline:
      return <Timeline data={data} windowWidth={windowWidth} />;
    default:
      return null;
  }
}
