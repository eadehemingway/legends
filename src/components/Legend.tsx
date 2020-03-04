import React, { useState } from "react";
import Modal from "react-modal";
import { legendData } from "../types";
import styled from "styled-components";
import { useDrag } from "react-dnd";

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
  const [showVisualLegend, setShowVisualLegend] = useState(true);

  const [{ isDragging }, drag] = useDrag({
    item: { type: "legend", id: data.id },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  });
  const isDesktop = window.innerWidth > 768;

  Modal.setAppElement("body");
  const { description } = data;
  const parser = new DOMParser();
  const parsedDesc = parser.parseFromString(description, "text/html");
  const arrOfDescriptionNodes = [];
  parsedDesc.body.childNodes.forEach(c => arrOfDescriptionNodes.push(c));

  const arrowTransform = showVisualLegend ? "rotate(180deg)" : "rotate(0deg)";
  const largeVisual = data.type === "basic" || data.type === "gradient";

  function onChangeInfo() {
    setModalOpen(true);
  }
  function onChangeVisibility() {
    setShowMore(!showMore);
  }
  function onChangeCollapse() {
    setShowVisualLegend(!showVisualLegend);
  }
  function onOpenModal() {
    document.body.style.overflow = "hidden";
  }
  function onCloseModal() {
    document.body.style.overflow = "unset";
  }
  return (
    <LegendWrapper
      showVisualLegend={showVisualLegend}
      ref={drag}
      isDragging={isDragging}
      largeVisual={largeVisual}
    >
      <NavWrapper>
        <LeftNav>
          <IconWrapper icon={dragDots} tooltipText="drag" />
          <PStyled>{data.name}</PStyled>
        </LeftNav>
        <RightNav>
          <IconWrapper
            onClick={onChangeVisibility}
            icon={showMore ? hide : show}
            tooltipText={showMore ? "Hide layer" : "Show layer"}
          />
          <IconWrapper
            icon={info}
            onClick={onChangeInfo}
            tooltipText="Layer info"
          />
          <IconWrapper
            icon={arrowDown}
            style={{ transition: "transform 0.5s", transform: arrowTransform }}
            onClick={onChangeCollapse}
            tooltipText={showVisualLegend ? "Collapse layer" : "Expand layer"}
          />
        </RightNav>
      </NavWrapper>
      <LegendVisual data={data} isDesktop={isDesktop} />
      <Modal
        isOpen={modalOpen}
        onAfterClose={onCloseModal}
        onAfterOpen={onOpenModal}
        onRequestClose={() => setModalOpen(false)}
        className={`modal-content ${
          isDesktop ? "modal-content-desktop" : "modal-content-mobile"
        }`}
        overlayClassName="react-modal-overlay"
      >
        <ModalContent>
          <CrossIconStyled src={cross} onClick={() => setModalOpen(false)} />
          <H2Styled>{data.name}</H2Styled>
          <ModalTextContent>
            {arrOfDescriptionNodes.map((t, i) => (
              <p key={i}>{t.innerHTML}</p>
            ))}
          </ModalTextContent>
        </ModalContent>
      </Modal>
    </LegendWrapper>
  );
}

const IconStyled = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin: 15px;
`;
const H2Styled = styled.h2`
  width: 80%;
`;
const CrossIconStyled = styled(IconStyled)`
  position: absolute;
  top: 0;
  right: 20px;
  margin: 0;
  margin-top: 10px;
`;

interface LegendWrapper {
  showVisualLegend: boolean;
  isDragging: boolean;
  largeVisual: boolean;
}
const LegendWrapper = styled.div`
  background: white;
  width: 800px;
  margin: auto;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 70px 120px 30px 120px;
  height: ${({ showVisualLegend, largeVisual }: LegendWrapper) => {
    const openHeight = largeVisual ? "300px" : "150px";
    return showVisualLegend ? openHeight : "20px";
  }};
  transition: height 1s;
  overflow: hidden;
  opacity: ${({ isDragging }: LegendWrapper) => (isDragging ? 0.2 : 1)};
  @media only screen and (max-width: 768px) {
    width: 90%;
    padding: 70px 20px 30px 20px;
  }
`;
const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ModalTextContent = styled.div`
  max-height: 500px;
  width: 90%;
  padding: 10px;
  position: relative;
  overflow: scroll;
`;
const ModalContent = styled.div`
  position: relative;
`;

const LeftNav = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const RightNav = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const PStyled = styled.p`
  font-family: OpenSans;
  font-size: 18px;
  margin-top: 10px;
`;
