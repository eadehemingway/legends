import React from "react";
import styled from "styled-components";

export default function Tooltip({ text, showTooltip, orientation }) {
  if (!showTooltip) return null;
  return (
    <TooltipWrapper orientation={orientation}>
      <PStyled>{text}</PStyled>
      <Tag orientation={orientation} />
    </TooltipWrapper>
  );
}

export enum Orientation {
  right = "right",
  left = "left"
}

interface TooltipWrapper {
  orientation: Orientation;
}

const TooltipWrapper = styled.div`
  border: 1px solid grey;
  z-index: 1;
  position: absolute;
  top: -55px;
  padding: 0 20px;
  width: fit-content;
  border-radius: 2px;
  ${({ orientation }: TooltipWrapper) =>
    orientation === "left" ? "right: 10px" : "left: 10px"}
`;

const Tag = styled.div`
  border-bottom: 1px solid grey;
  border-right: 1px solid grey;
  width: 10px;
  height: 10px;
  transform: rotate(45deg);
  position: absolute;
  background: white;
  bottom: -7px;
  ${({ orientation }: TooltipWrapper) =>
    orientation === "left" ? "right: 7px" : "left: 7px"}
`;

const PStyled = styled.p`
  white-space: nowrap;
`;
