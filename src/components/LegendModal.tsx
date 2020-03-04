import React, { useState } from "react";
import Modal from "react-modal";
import { legendData } from "../types";
import styled from "styled-components";

import cross from "../assets/icons/cross.svg";

interface Props {
  data: legendData;
  modalOpen: boolean;
  setModalOpen: (a: boolean) => void;
}

export default function LegendModal({ data, modalOpen, setModalOpen }: Props) {
  const isDesktop = window.innerWidth > 768;

  Modal.setAppElement("body");
  const { description } = data;
  const parser = new DOMParser();
  const parsedDesc = parser.parseFromString(description, "text/html");
  const arrOfDescriptionNodes = [];
  parsedDesc.body.childNodes.forEach(c => arrOfDescriptionNodes.push(c));

  function onOpenModal() {
    document.body.style.overflow = "hidden";
  }
  function onCloseModal() {
    document.body.style.overflow = "unset";
  }
  return (
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
