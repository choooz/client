import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { LogoWhite } from "../../assets";
import { palette } from "../../styles/palette";

function Header() {
  return (
    <Container>
      <Link href="/">
        <Image src={LogoWhite} alt="chooz 로고" height={25} />
      </Link>
    </Container>
  );
}

const Container = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 55px;
  border-bottom: 1px solid ${palette.border.base};
`;

export default Header;
