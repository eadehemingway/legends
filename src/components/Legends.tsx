import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import TouchBackend from "react-dnd-touch-backend";
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
        setLegendData(data);
      });
  }, []);

  function moveLegend(id, newPosition) {
    const data = legendData.find(a => a.id === id);
    const oldIndex = legendData.findIndex(a => a.id === id);
    const newLegendData = [...legendData];
    newLegendData.splice(oldIndex, 1);
    newLegendData.splice(newPosition, 0, data);
    setLegendData(newLegendData);
  }

  return (
    <DndProvider backend={TouchBackend}>
      {legendData.length
        ? legendData.map((d, i) => {
            return (
              <LegendSpace key={i} position={i} moveLegend={moveLegend}>
                <Legend data={d} />
              </LegendSpace>
            );
          })
        : null}
    </DndProvider>
  );
}
