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
      return <Basic />;
    case LegendType.gradient:
      return <Gradient />;
    case LegendType.choropleth:
      return <Choropleth />;
    case LegendType.timeline:
      return <Timeline />;
    default:
      return <p>no legend</p>;
  }
}
