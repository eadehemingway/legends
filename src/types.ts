export interface legendData {
  id: string;
  name: string;
  type: LegendType;
  items: any[];
  description: string;
}

export enum LegendType {
  basic = "basic",
  gradient = "gradient",
  choropleth = "choropleth",
  timeline = "timeline"
}
