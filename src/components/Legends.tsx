import React, { useState, useEffect } from "react";
import axios from "axios";
import Legend from "./Legend";

export function Legends() {
  const [legendData, setLegendData] = useState([]);
  console.log("legendData:", legendData);
  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/Vizzuality/front-end-code-challenge/master/data.json"
      )
      .then(({ data }) => setLegendData(data));
  }, []);

  return (
    <div>{legendData.length && legendData.map(d => <Legend data={d} />)}</div>
  );
}
