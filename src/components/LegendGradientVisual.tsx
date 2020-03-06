import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import styled from "styled-components";
import getSvgWidth from "../utils/getSvgWidth";

export default function Gradient({ data, isDesktop, windowWidth }) {
  const [showInput, setShowInput] = useState(false);
  const [text, setText] = useState("");

  function initialDrawing() {
    const svg = d3.select("#gradient-svg");
    svg.append("rect").attr("class", "legend-bar");
  }

  useEffect(() => {
    const text = localStorage.getItem("text");
    setText(text);
    initialDrawing();
  }, []);
  useEffect(() => {
    const svgWidth = getSvgWidth(isDesktop, windowWidth);
    const svgHeight = 100;
    const margin = isDesktop ? 50 : 20;
    const gradientWidth = svgWidth - margin;

    const svg = d3
      .select("#gradient-svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    const linearGradient = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "linear-gradient");

    linearGradient
      .selectAll("stop")
      .data(data.items)
      .enter()
      .append("stop")
      .attr("offset", (d, i) => {
        const offset = i * (100 / data.items.length);
        return `${offset}%`;
      })
      .attr("stop-color", d => d.color);

    svg
      .selectAll(".legend-bar")
      .attr("x", margin / 2)
      .attr("y", margin)
      .attr("height", 10)
      .attr("width", gradientWidth)
      .style("fill", "url(#linear-gradient)");

    const textSelection = svg.selectAll("text").data(data.items);

    const enterSelection = textSelection
      .enter()
      .append("text")
      .text(d => d.name);

    const textUpdateSelection = textSelection.merge(enterSelection);

    textUpdateSelection
      .attr("x", (d, i) => {
        const wordWidth = 30;
        if (i === 0) return wordWidth;
        return gradientWidth - wordWidth;
      })
      .attr("y", margin + 30)
      .attr("font-size", () => (isDesktop ? "14" : "12"));
  }, [data.items, isDesktop, windowWidth]);

  function handleSubmit() {
    setShowInput(false);
    localStorage.setItem("text", text);
  }
  return (
    <>
      <svg id="gradient-svg"></svg>
      {!showInput && (
        <TextContainer>
          <PStyled>{text}</PStyled>
          <ButtonStyled onClick={() => setShowInput(true)}>
            {" "}
            {text ? "edit" : "add"} text
          </ButtonStyled>
        </TextContainer>
      )}
      {showInput && (
        <TextContainer>
          <InputStyled
            value={text}
            onChange={({ target }) => setText(target.value)}
            ref={input => input && input.focus()}
          />
          <ButtonStyled onClick={handleSubmit}>submit</ButtonStyled>
        </TextContainer>
      )}
    </>
  );
}

const ButtonStyled = styled.button`
  outline: none;
  cursor: pointer;
  border: none;
  background: none;
  text-decoration: underline;
  font-size: 16px;
  color: blue;
  padding: 0;
  padding-left: 15px;
  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const InputStyled = styled.input`
  outline: none;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 20px;
  padding: 15px;
  border: none;
  border-bottom: 1px solid grey;
  box-sizing: border-box;
  @media only screen and (max-width: 768px) {
    font-size: 12px;
    margin-top: 0;
  }
`;

const PStyled = styled.p`
  font-size: 16px;
  margin-top: 30px;
  margin-bottom: 20px;
  padding: 15px;
  @media only screen and (max-width: 768px) {
    font-size: 12px;
    margin-top: 0;
  }
`;

const TextContainer = styled.div`
  width: 100%;
  max-width: 100%;
`;
