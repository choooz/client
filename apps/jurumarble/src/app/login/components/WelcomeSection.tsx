import { transitions } from "lib/styles";
import Image from "next/image";
import { DrinkImage } from "public/images";
import { SvgLogo } from "src/assets/icons/components";
import styled, { css } from "styled-components";

function WelcomeSection() {
  return (
    <Container>
      <SvgLogo width={142} height={24} />
      <Image
        alt="전통주 이미지"
        src={DrinkImage}
        width={150}
        height={150}
        style={{
          borderRadius: 100,
          marginTop: 30,
        }}
      />
      <Slogan>
        지금 주루마블과 <br />
        우리술 여행을 시작하세요!
      </Slogan>
      <Text>여행지의 우리술 검색부터 투표까지</Text>
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 56px;
  animation: ${transitions.delaypopInFromBottom} 0.9s ease-in-out;
`;

const Slogan = styled.p`
  ${({ theme }) => css`
    ${theme.typography.headline02}
    color: ${theme.colors.black_01};
    margin-top: 30px;
    text-align: center;
  `}
`;

const Text = styled.span`
  ${({ theme }) => css`
    ${theme.typography.subhead02}
    color: ${theme.colors.black_01};
    margin-top: 8px;
  `}
`;

export default WelcomeSection;
