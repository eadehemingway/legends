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

  return (
    <LegendWrapper showVisualLegend={showVisualLegend}>
      <NavWrapper>
        <IconStyled src={dragDots} />
        <PStyled>{data.name}</PStyled>
        <IconStyled
          onClick={() => setShowMore(!showMore)}
          src={showMore ? hide : show}
        />
        <IconStyled src={info} onClick={() => setModalOpen(true)} />
        <ArrowIconStyled
          src={arrowDown}
          showVisualLegend={showVisualLegend}
          onClick={() => setShowVisualLegend(!showVisualLegend)}
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
`;
const CrossIconStyled = styled(IconStyled)`
  position: absolute;
  right: 30px;
`;

interface ArrowIconStyled {
  showVisualLegend: boolean;
}

const ArrowIconStyled = styled(IconStyled)`
  transform: ${({ showVisualLegend }: ArrowIconStyled) =>
    showVisualLegend ? "rotate(180deg)" : "rotate(0deg)"};
  transition: transform 0.5s;
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
