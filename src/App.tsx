import React from "react";
import styled from "styled-components";

import "./App.css";

import "./assets/fonts/OpenSans-Regular.ttf";
import { Legends } from "./components/Legends";

function App() {
  return (
    <AppWrapper>
      <Legends />
      {/* rest of app */}
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 1500px;
`;
export default App;
