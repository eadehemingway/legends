import React from "react";
import styled from "styled-components";

export default function Tooltip({ text, showTooltip }) {
  if (!showTooltip) return null;
  return (
    <TooltipWrapper>
      <p>{text}</p>
      <Tag />
    </TooltipWrapper>
  );
}

const TooltipWrapper = styled.div`
  border: 1px solid grey;
  z-index: 1;
  position: absolute;
  top: -70px;
  padding: 0 20px;
  width: 100px;
  border-radius: 2px;
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
  left: 7px;
`;
