import React, { useState } from "react";
import styled from "styled-components";

import Tooltip, { Alignment } from "./Tooltip";

interface Props {
  icon: string;
  tooltipText: string;
  onClick?: () => void;
  style?: any;
  tooltipAlign: Alignment;
}
export default function IconWrapper({
  icon,
  tooltipText,
  onClick,
  style,
  tooltipAlign
}: Props) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <Wrapper>
      <Tooltip
        text={tooltipText}
        showTooltip={showTooltip}
        alignment={tooltipAlign}
      />
      <IconStyled
        src={icon}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseOut={() => setShowTooltip(false)}
        onClick={onClick ? onClick : null}
        style={style}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const IconStyled = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin: 15px;
  @media only screen and (max-width: 768px) {
    margin: 5px;
    width: 15px;
    height: 15px;
  }
`;
