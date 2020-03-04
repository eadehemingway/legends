import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import styled from "styled-components";

export default function Gradient({ data }) {
  const [showInput, setShowInput] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    const text = localStorage.getItem("text");
    setText(text);
  }, []);
  useEffect(() => {
    const svgWidth = 850;
    const svgHeight = 100;
    const margin = 50;
    const gradientWidth = svgWidth - margin;
    const svg = d3
      .select("#Gradient-svg")
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
      .append("rect")
      .attr("x", margin / 2)
      .attr("y", margin)
      .attr("width", gradientWidth)
      .attr("height", 10)
      .style("fill", "url(#linear-gradient)");

    svg
      .selectAll("text")
      .data(data.items)
      .enter()
      .append("text")
      .text(d => d.name)
      .attr("x", (d, i) => {
        const wordLength = 30;
        return i ? gradientWidth - wordLength : wordLength;
      })
      .attr("y", margin + 30);
  }, [data.items]);

  function handleSubmit() {
    setShowInput(false);
    localStorage.setItem("text", text);
  }
  return (
    <>
      <svg id="Gradient-svg"></svg>

      {!showInput && (
        <div>
          <PStyled>{text}</PStyled>
          <ButtonStyled onClick={() => setShowInput(true)}>
            {" "}
            {text ? "edit" : "add"} text
          </ButtonStyled>
        </div>
      )}

      {showInput && (
        <div>
          <InputStyled
            value={text}
            onChange={({ target }) => setText(target.value)}
          />

          <ButtonStyled onClick={handleSubmit}>submit</ButtonStyled>
        </div>
      )}
    </>
  );
}

const ButtonStyled = styled.button`
  outline: none;
  cursor: pointer;
  border: none;
  text-decoration: underline;
  font-size: 16px;
  color: blue;
  padding: 0;
  padding-left: 15px;
`;

const InputStyled = styled.input`
  outline: none;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 20px;
  padding: 15px;
`;

const PStyled = styled.p`
  font-size: 16px;
  margin-top: 30px;
  margin-bottom: 20px;

  padding: 15px;
`;
