import React, { useState } from "react";
import styled from "styled-components";
import Tooltip from "./Tooltip";

interface Props {
  icon: string;
  tooltipText: string;
  onClick?: () => void;
  style?: any;
}
export default function IconWrapper({
  icon,
  tooltipText,
  onClick,
  style
}: Props) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <Wrapper>
      <Tooltip text={tooltipText} showTooltip={showTooltip} />
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
`;

const IconStyled = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
