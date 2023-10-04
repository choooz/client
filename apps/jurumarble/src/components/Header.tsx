"use client";

import Path from "lib/Path";
import Link from "next/link";
import { SvgHeaderSearch, SvgLogo, SvgNotification } from "src/assets/icons/components";
import styled from "styled-components";

function Header() {
  return (
    <Container>
      <Link href={Path.MAIN_PAGE}>
        <SvgLogo width={110} height={19} />
      </Link>
      <IconContainer>
        <Link href={Path.NOTIFICATION_PAGE}>
          <SvgNotification width={24} height={24} />
        </Link>
        <Link href={Path.SEARCH_PAGE}>
          <SvgHeaderSearch width={24} height={24} />
        </Link>
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
