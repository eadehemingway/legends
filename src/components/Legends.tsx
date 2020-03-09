import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import TouchBackend from "react-dnd-touch-backend";
import axios from "axios";

import Legend from "./Legend";
import LegendSpace from "./LegendSpace";

export function Legends() {
  const [legendData, setLegendData] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  function calculateWindowWidth() {
    const windowWidth = window.innerWidth;
    setWindowWidth(windowWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", calculateWindowWidth);

    axios
      .get(
        "https://raw.githubusercontent.com/Vizzuality/front-end-code-challenge/master/data.json"
      )
      .then(({ data }) => setLegendData(data));
    // return window.removeEventListener("resize", calculateWindowWidth);
  }, []);

  function moveLegend(idToMove, newPosition) {
    const dataToMove = legendData.find(a => a.id === idToMove);
    const oldIndex = legendData.findIndex(a => a.id === idToMove);
    const newLegendData = [...legendData];
    newLegendData.splice(oldIndex, 1);
    newLegendData.splice(newPosition, 0, dataToMove);
    setLegendData(newLegendData);
  }

  return (
    <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
      {legendData.length
        ? legendData.map((d, i) => (
            <LegendSpace key={i} position={i} moveLegend={moveLegend}>
              <Legend data={d} windowWidth={windowWidth} />
            </LegendSpace>
          ))
        : null}
    </DndProvider>
  );
}
