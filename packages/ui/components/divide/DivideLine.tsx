import React from "react";
import styled from "styled-components";

function DivideLine() {
  return <Line />;
}

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.palette.border.base};
  margin: 24px 0;
`;

export default DivideLine;
