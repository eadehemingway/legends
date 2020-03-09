import React from "react";
import styled from "styled-components";

import "./App.css";
import "./assets/fonts/OpenSans-Regular.ttf";
import { Legends } from "./components/Legends";

export default function App() {
  return (
    <AppWrapper>
      <Legends />
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media only screen and (max-width: 768px) {
    margin-top: 0px;
  }
`;
