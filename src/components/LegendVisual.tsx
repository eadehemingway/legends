import React from "react";

import Basic from "./LegendBasicVisual";
import Gradient from "./LegendGradientVisual";
import Choropleth from "./LegendChoroplethVisual";
import Timeline from "./LegendTimelineVisual";
import { legendData, LegendType } from "../types";

interface Props {
  data: legendData;
  isDesktop: boolean;
  windowWidth: number;
}

export default function LegendVisual({ data, isDesktop, windowWidth }: Props) {
  switch (data.type) {
    case LegendType.basic:
      return (
        <Basic data={data} isDesktop={isDesktop} windowWidth={windowWidth} />
      );
    case LegendType.gradient:
      return (
        <Gradient data={data} isDesktop={isDesktop} windowWidth={windowWidth} />
      );
    case LegendType.choropleth:
      return (
        <Choropleth
          data={data}
          isDesktop={isDesktop}
          windowWidth={windowWidth}
        />
      );
    case LegendType.timeline:
      return (
        <Timeline data={data} isDesktop={isDesktop} windowWidth={windowWidth} />
      );
    default:
      return null;
  }
}
