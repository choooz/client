import { LogoWhite } from "public/images";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

function Header() {
  return (
    <Container>
      <Link href="/">
        <Image alt="chooz 로고" height={25} src={LogoWhite} />
      </Link>
    </Container>
  );
}

const Container = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 55px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.border.dark};
`;

export default Header;
