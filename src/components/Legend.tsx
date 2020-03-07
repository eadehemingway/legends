import React, { useState, useEffect } from "react";
import { legendData } from "../types";
import styled from "styled-components";
import { useDrag } from "react-dnd";

import LegendToolbar from "./LegendToolbar";
import LegendVisual from "./LegendVisual";
import LegendModal from "./LegendModal";

interface Props {
  data: legendData;
}

export default function Legend({ data }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [showVisualLegend, setShowVisualLegend] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [{ isDragging }, drag] = useDrag({
    item: { type: "legend", id: data.id },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  });

  function calculateWindowWidth() {
    const windowWidth = window.innerWidth;
    setWindowWidth(windowWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", calculateWindowWidth);

    // return () => {
    //   window.removeEventListener("resize", calculateIsDesktop);
    // };
  }, []);

  const largeVisual = data.type === "basic" || data.type === "gradient";
  const openHeight = largeVisual ? "350px" : "200px";
  const closedHeight = "60px";
  const height = showVisualLegend ? openHeight : closedHeight;

  return (
    <LegendWrapper ref={drag} isDragging={isDragging} style={{ height }}>
      <LegendToolbar
        data={data}
        setModalOpen={setModalOpen}
        setShowVisualLegend={setShowVisualLegend}
        showVisualLegend={showVisualLegend}
      />
      <LegendVisual data={data} windowWidth={windowWidth} />
      <LegendModal
        data={data}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        windowWidth={windowWidth}
      />
    </LegendWrapper>
  );
}

interface LegendWrapper {
  isDragging: boolean;
}

const LegendWrapper = styled.div`
  background: white;
  width: 800px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 70px 120px 30px 120px;
  transition: height 1s;
  overflow: hidden;
  opacity: ${({ isDragging }: LegendWrapper) => (isDragging ? 0.2 : 1)};
  @media only screen and (max-width: 768px) {
    width: 90%;
    padding: 30px 20px 30px 20px;
  }
`;
