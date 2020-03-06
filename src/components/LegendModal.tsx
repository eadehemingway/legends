import React from "react";
import Modal from "react-modal";
import { legendData } from "../types";
import styled from "styled-components";

import cross from "../assets/icons/cross.svg";

interface Props {
  data: legendData;
  modalOpen: boolean;
  setModalOpen: (a: boolean) => void;
  isDesktop: boolean;
}

export default function LegendModal({
  data,
  modalOpen,
  setModalOpen,
  isDesktop
}: Props) {
  Modal.setAppElement("body");
  const { description } = data;
  const parser = new DOMParser();
  const parsedDescription = parser.parseFromString(description, "text/html");
  const arrOfDescriptionNodes = [];
  parsedDescription.body.childNodes.forEach(c => arrOfDescriptionNodes.push(c));
  const innerTextDescriptions = arrOfDescriptionNodes.map(d => d.innerText);

  function onOpenModal() {
    document.body.style.overflow = "hidden";
  }
  function onCloseModal() {
    document.body.style.overflow = "unset";
  }

  const modalClass = isDesktop
    ? "modal-content-desktop"
    : "modal-content-mobile";

  return (
    <Modal
      isOpen={modalOpen}
      onAfterClose={onCloseModal}
      onAfterOpen={onOpenModal}
      onRequestClose={() => setModalOpen(false)}
      className={`modal-content ${modalClass}`}
      overlayClassName="react-modal-overlay"
    >
      <ModalContent>
        <CrossIconStyled src={cross} onClick={() => setModalOpen(false)} />
        <H2Styled>{data.name}</H2Styled>
        <ModalTextContent>
          {innerTextDescriptions.map((t, i) => (
            <p key={i}>{t}</p>
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

const ModalTextContent = styled.div`
  max-height: 500px;
  width: 90%;
  padding: 10px;
  padding-bottom: 60px;
  box-sizing: border-box;
  position: relative;
  overflow: scroll;
`;

const ModalContent = styled.div`
  position: relative;
`;
