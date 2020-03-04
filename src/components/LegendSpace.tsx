import React from "react";
import styled from "styled-components";
import { useDrop } from "react-dnd";

interface DroppedItem {
  id: string;
  type: string;
}

export default function LegendSpace({ children, position, moveItem }) {
  const [{ isOver }, drop] = useDrop({
    accept: "legend",
    drop: (droppedItem: DroppedItem) => moveItem(droppedItem.id, position),
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  });

  return (
    <>
      <Wrapper ref={drop} isOver={isOver}>
        {children}
      </Wrapper>
    </>
  );
}
interface Wrapper {
  isOver: boolean;
}
const Wrapper = styled.div`
  padding: 10px;
  background: ${({ isOver }: Wrapper) => (isOver ? "#E8E8E8" : "none")};
`;
