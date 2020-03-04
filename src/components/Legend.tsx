import React, { useState } from "react";
import Modal from "react-modal";
import { legendData } from "../types";
import styled from "styled-components";

import dragDots from "../assets/icons/drag-dots.svg";
import arrowDown from "../assets/icons/arrow-down.svg";
import hide from "../assets/icons/hide.svg";
import info from "../assets/icons/info.svg";
import show from "../assets/icons/show.svg";
import cross from "../assets/icons/cross.svg";
import LegendVisual from "./LegendVisual";
import IconWrapper from "./IconWrapper";

interface Props {
  data: legendData;
}

export default function Legend({ data }: Props) {
  const [showMore, setShowMore] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [showVisualLegend, setShowVisualLegend] = useState(false);

  Modal.setAppElement("body");
  const { description } = data;
  const parser = new DOMParser();
  const parsedDesc = parser.parseFromString(description, "text/html");
  const arrOfDescriptionNodes = [];
  parsedDesc.body.childNodes.forEach(c => arrOfDescriptionNodes.push(c));

  const modalContentStyle = { width: 600, margin: "auto", padding: 40 };
  const arrowTransform = showVisualLegend ? "rotate(180deg)" : "rotate(0deg)";
  return (
    <LegendWrapper showVisualLegend={showVisualLegend}>
      <NavWrapper>
        <IconWrapper icon={dragDots} tooltipText="drag" />
        <PStyled>{data.name}</PStyled>
        <IconWrapper
          onClick={() => setShowMore(!showMore)}
          icon={showMore ? hide : show}
          tooltipText={showMore ? "hide" : "show"}
        />
        <IconWrapper
          icon={info}
          onClick={() => setModalOpen(true)}
          tooltipText="more info"
        />
        <IconWrapper
          icon={arrowDown}
          style={{ transition: "transform 0.5s", transform: arrowTransform }}
          onClick={() => setShowVisualLegend(!showVisualLegend)}
          tooltipText="show legend"
        />
      </NavWrapper>
      <LegendVisual data={data} />
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        style={{ content: modalContentStyle }}
      >
        <CrossIconStyled src={cross} onClick={() => setModalOpen(false)} />
        <h2>{data.name}</h2>
        {arrOfDescriptionNodes.map(t => (
          <p>{t.innerHTML}</p>
        ))}
      </Modal>
    </LegendWrapper>
  );
}

const IconStyled = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  border: 2px solid pink;
`;
const CrossIconStyled = styled(IconStyled)`
  position: absolute;
  right: 30px;
`;

interface LegendWrapper {
  showVisualLegend: boolean;
}
const LegendWrapper = styled.div`
  width: 70%;
  border: 5px solid coral;
  padding: 50px;
  height: ${({ showVisualLegend }: LegendWrapper) =>
    showVisualLegend ? "300px" : "20px"};
  transition: height 1s;
  overflow: hidden;
`;
const NavWrapper = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const PStyled = styled.p`
  font-family: OpenSans;
`;
