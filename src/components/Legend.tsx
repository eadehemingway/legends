import React, { useState } from "react";
import { legendData } from "../types";
import styled from "styled-components";
import { useDrag } from "react-dnd";

import LegendNav from "./LegendNav";
import LegendVisual from "./LegendVisual";
import LegendModal from "./LegendModal";

interface Props {
  data: legendData;
}

export default function Legend({ data }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [showVisualLegend, setShowVisualLegend] = useState(true);

  const [{ isDragging }, drag] = useDrag({
    item: { type: "legend", id: data.id },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  });
  const isDesktop = window.innerWidth > 768;
  const largeVisual = data.type === "basic" || data.type === "gradient";

  return (
    <LegendWrapper
      showVisualLegend={showVisualLegend}
      ref={drag}
      isDragging={isDragging}
      largeVisual={largeVisual}
      isDesktop={isDesktop}
    >
      <LegendNav
        data={data}
        setModalOpen={setModalOpen}
        setShowVisualLegend={setShowVisualLegend}
        showVisualLegend={showVisualLegend}
      />
      <LegendVisual data={data} isDesktop={isDesktop} />
      <LegendModal
        data={data}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </LegendWrapper>
  );
}

interface LegendWrapper {
  showVisualLegend: boolean;
  isDragging: boolean;
  largeVisual: boolean;
  isDesktop: boolean;
}

const LegendWrapper = styled.div`
  background: white;
  width: 800px;
  margin: auto;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 70px 120px 30px 120px;
  transition: height 1s;
  overflow: hidden;
  opacity: ${({ isDragging }: LegendWrapper) => (isDragging ? 0.2 : 1)};
  height: ${({ showVisualLegend, largeVisual, isDesktop }: LegendWrapper) => {
    const openHeight = largeVisual ? "350px" : "200px";
    const closedHeight = isDesktop ? "60px" : "60px";
    return showVisualLegend ? openHeight : closedHeight;
  }};
  @media only screen and (max-width: 768px) {
    width: 90%;
    padding: 70px 20px 30px 20px;
  }
`;
