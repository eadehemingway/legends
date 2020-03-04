import React from "react";
import Basic from "./BasicVisual";
import Gradient from "./GradientVisual";
import Choropleth from "./ChoroplethVisual";
import Timeline from "./TimelineVisual";
import { legendData, LegendType } from "../types";

interface Props {
  data: legendData;
}

export default function LegendVisual({ data }: Props) {
  switch (data.type) {
    case LegendType.basic:
      return <Basic data={data} />;
    case LegendType.gradient:
      return <Gradient data={data} />;
    case LegendType.choropleth:
      return <Choropleth data={data} />;
    case LegendType.timeline:
      return <Timeline data={data} />;
    default:
      return null;
  }
}
