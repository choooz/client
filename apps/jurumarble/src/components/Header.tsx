"use client";

import { SvgHeaderSearch, SvgLogo, SvgNotification } from "src/assets/icons/components";
import styled from "styled-components";

function Header() {
  return (
    <Container>
      <SvgLogo width={110} height={19} />
      <IconContainer>
        <SvgNotification width={24} height={24} />
        <SvgHeaderSearch width={24} height={24} />
      </IconContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  height: 60px;
`;

const IconContainer = styled.div`
  display: flex;
  gap: 16px;
`;

export default Header;
