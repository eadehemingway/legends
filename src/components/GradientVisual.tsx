import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import styled from "styled-components";
import getSvgWidth from "../utils/getSvgWidth";
import getIsDesktop from "../utils/getIsDesktop";
import getFontSize from "../utils/getFontSize";

export default function Gradient({ data, windowWidth }) {
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
    const isDesktop = getIsDesktop(windowWidth);
    const svgWidth = getSvgWidth(isDesktop, windowWidth);
    const svgHeight = 100;
    const margin = isDesktop ? 50 : 20;
    const gradientWidth = svgWidth - margin;
    const leftMargin = margin / 2;
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

    const barHeight = 10;
    svg
      .selectAll(".legend-bar")
      .attr("x", leftMargin)
      .attr("y", margin)
      .attr("height", barHeight)
      .attr("width", gradientWidth)
      .style("fill", "url(#linear-gradient)");

    const labels = data.items.filter(i => i.name).map(d => d.name);

    const textSelection = svg.selectAll("text").data(labels);

    const enterSelection = textSelection
      .enter()
      .append("text")
      .text(d => d);

    const textUpdateSelection = textSelection.merge(enterSelection);
    const fontSize = getFontSize(isDesktop);
    const padding = 5;
    const lineHeight = barHeight + fontSize + padding;

    textUpdateSelection
      .attr("x", (d, i) => i * gradientWidth + leftMargin)
      .attr("y", margin + lineHeight)
      .attr("font-size", fontSize)
      .style("text-anchor", (d, i) => (i === 0 ? "start" : "end"));
  }, [data.items, windowWidth]);

  function handleSubmit() {
    setShowInput(false);
    localStorage.setItem("text", text);
  }
  return (
    <>
      <svg id="gradient-svg" />
      {!showInput && (
        <TextContainer>
          <PStyled>{text}</PStyled>
          <ButtonStyled onClick={() => setShowInput(true)}>
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
