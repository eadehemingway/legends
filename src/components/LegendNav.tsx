import React, { useState } from "react";
import { legendData } from "../types";
import styled from "styled-components";

import dragDots from "../assets/icons/drag-dots.svg";
import arrowDown from "../assets/icons/arrow-down.svg";
import hide from "../assets/icons/hide.svg";
import info from "../assets/icons/info.svg";
import show from "../assets/icons/show.svg";
import IconWrapper from "./IconWrapper";
import { Alignment } from "./Tooltip";

interface Props {
  data: legendData;
  setModalOpen: (a: boolean) => void;
  setShowVisualLegend: (a: boolean) => void;
  showVisualLegend: boolean;
}

export default function Legend({
  data,
  setModalOpen,
  setShowVisualLegend,
  showVisualLegend
}: Props) {
  const [showMore, setShowMore] = useState(false);

  const { name } = data;
  const arrowTransform = showVisualLegend ? "rotate(180deg)" : "rotate(0deg)";

  function onChangeInfo() {
    setModalOpen(true);
  }
  function onChangeVisibility() {
    setShowMore(!showMore);
  }
  function onChangeCollapse() {
    setShowVisualLegend(!showVisualLegend);
  }

  return (
    <NavWrapper>
      <LeftNav>
        <IconWrapper
          icon={dragDots}
          tooltipText="drag"
          tooltipAlign={Alignment.left}
        />
        <PStyled>{name}</PStyled>
      </LeftNav>
      <RightNav>
        <IconWrapper
          onClick={onChangeVisibility}
          icon={showMore ? hide : show}
          tooltipText={showMore ? "Hide layer" : "Show layer"}
          tooltipAlign={Alignment.right}
        />
        <IconWrapper
          icon={info}
          onClick={onChangeInfo}
          tooltipText="Layer info"
          tooltipAlign={Alignment.right}
        />
        <IconWrapper
          icon={arrowDown}
          style={{ transition: "transform 0.5s", transform: arrowTransform }}
          onClick={onChangeCollapse}
          tooltipText={showVisualLegend ? "Collapse layer" : "Expand layer"}
          tooltipAlign={Alignment.right}
        />
      </RightNav>
    </NavWrapper>
  );
}

const NavWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  min-height: 100px;
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
  margin: 10px 10px 0 10px;
  @media only screen and (max-width: 768px) {
    font-size: 12px;
    margin-top: 0;
  }
`;
