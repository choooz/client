import styled from 'styled-components';

function DivideLine() {
  return <Line />;
}

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.line_01};
  margin: 24px 0;
`;

export default DivideLine;
