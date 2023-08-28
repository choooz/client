import styled from "styled-components";

function Header() {
  return <Container />;
}

const Container = styled.header`
  height: 24px;
  margin-top: 18px;
  background-color: ${({ theme }) => theme.colors.main_01};
`;

export default Header;
