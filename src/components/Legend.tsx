import React from "react";
import Basic from "./BasicLegend";
import Gradient from "./GradientLegend";
import Choropleth from "./ChoroplethLegend";
import Timeline from "./TimelineLegend";

enum LegendType {
  basic = "basic",
  gradient = "gradient",
  choropleth = "choropleth",
  timeline = "timeline"
}

interface Props {
  data: {
    id: string;
    name: string;
    type: LegendType;
    items: any[];
    description: string;
  };
}

export default function Legend({ data }: Props) {
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
