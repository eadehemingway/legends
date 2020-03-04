import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";

import axios from "axios";
import Legend from "./Legend";
import LegendSpace from "./LegendSpace";

export function Legends() {
  const [legendData, setLegendData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/Vizzuality/front-end-code-challenge/master/data.json"
      )
      .then(({ data }) => {
        const sortedData = data.sort((a, b) =>
          a.type < b.type ? -1 : a.type > b.type ? 1 : 0
        );
        setLegendData(sortedData);
      });
  }, []);

  function moveItem(id, position) {
    const data = legendData.find(a => a.id === id);
    const oldIndex = legendData.findIndex(a => a.id === id);
    const newLegendData = [...legendData];
    newLegendData.splice(oldIndex, 1);
    newLegendData.splice(position, 0, data);
    setLegendData(newLegendData);
  }

  return (
    <DndProvider backend={Backend}>
      {legendData.length &&
        legendData.map((d, i) => {
          return (
            <LegendSpace key={i} position={i} moveItem={moveItem}>
              <Legend data={d} />
            </LegendSpace>
          );
        })}
    </DndProvider>
  );
}
