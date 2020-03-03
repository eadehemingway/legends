import React from "react";
import { legendData } from "../types";
import styled from "styled-components";

interface Props {
  data: legendData;
}

export default function Legend({ data }: Props) {
  return (
    <LegendWrapper>
      <PStyled>{data.name}</PStyled>
      <p>{data.name}</p>
      <p> {data.type}</p>
      <p>{data.description}</p>
    </LegendWrapper>
  );
}

const LegendWrapper = styled.div`
  width: 70%;
  border: 5px solid coral;
  padding: 50px;
`;

const PStyled = styled.p`
  font-family: OpenSans;
`;
