import React from "react";
import styled from "styled-components";

export default function Tooltip({ text, showTooltip, alignment }) {
  if (!showTooltip) return null;
  return (
    <TooltipWrapper alignment={alignment}>
      <PStyled>{text}</PStyled>
      <Tag alignment={alignment} />
    </TooltipWrapper>
  );
}

export enum Alignment {
  right = "right",
  left = "left"
}

interface TooltipWrapper {
  alignment: Alignment;
}

const TooltipWrapper = styled.div`
  border: 1px solid grey;
  z-index: 1;
  position: absolute;
  top: -55px;
  padding: 0 20px;
  width: fit-content;
  border-radius: 2px;
  ${({ alignment }: TooltipWrapper) => `${alignment}: 10px`};
  @media only screen and (max-width: 768px) {
    top: -60px;
    ${({ alignment }: TooltipWrapper) => `${alignment}: -1px`};
  }
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
  ${({ alignment }: TooltipWrapper) => `${alignment}: 7px`}
`;

const PStyled = styled.p`
  white-space: nowrap;
`;
