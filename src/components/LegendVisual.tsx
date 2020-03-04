import React from "react";
import Basic from "./BasicVisual";
import Gradient from "./GradientVisual";
import Choropleth from "./ChoroplethVisual";
import Timeline from "./TimelineVisual";
import { legendData, LegendType } from "../types";

interface Props {
  data: legendData;
  isDesktop: boolean;
}

export default function LegendVisual({ data, isDesktop }: Props) {
  switch (data.type) {
    case LegendType.basic:
      return <Basic data={data} isDesktop={isDesktop} />;
    case LegendType.gradient:
      return <Gradient data={data} isDesktop={isDesktop} />;
    case LegendType.choropleth:
      return <Choropleth data={data} isDesktop={isDesktop} />;
    case LegendType.timeline:
      return <Timeline data={data} isDesktop={isDesktop} />;
    default:
      return null;
  }
}
