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

interface Props {
  data: legendData;
}

export default function Legend({ data }: Props) {
  const [showMore, setShowMore] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  Modal.setAppElement("body");
  return (
    <LegendWrapper>
      <NavWrapper>
        <IconStyled src={dragDots} />
        <PStyled>{data.name}</PStyled>
        <IconStyled
          onClick={() => setShowMore(!showMore)}
          src={showMore ? hide : show}
        />
        <IconStyled src={info} onClick={() => setModalOpen(true)} />
        <IconStyled src={arrowDown} />
      </NavWrapper>
      <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)}>
        <IconStyled src={cross} onClick={() => setModalOpen(false)} />

        <p> hiiii</p>
      </Modal>
    </LegendWrapper>
  );
}

const IconStyled = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
const LegendWrapper = styled.div`
  width: 70%;
  border: 5px solid coral;
  padding: 50px;
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
