import { styled } from "styled-components";

function BottomBar() {
  return <Container />;
}

const Container = styled.section`
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.main_01};
`;

export default BottomBar;
