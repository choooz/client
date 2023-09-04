import Image from "next/image";
import { EmptyAImg } from "public/images";
import styled, { css } from "styled-components";

function RestaurantItem() {
  return (
    <Container>
      <Image alt="음식점 이미지" src={EmptyAImg} width={49} height={49} />
      <TextContainer>
        <Name>이름</Name>
        <Menu>
          <>대표메뉴 : </>
          ㅇㄴㅁㅇㄴㅁ
        </Menu>
      </TextContainer>
    </Container>
  );
}

const Container = styled.li`
  display: flex;
  margin: 20px 0;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
`;

const Name = styled.div`
  ${({ theme }) => css`
    ${theme.typography.button01}
    color: ${theme.colors.black_02};
  `}
`;

const Menu = styled.div`
  ${({ theme }) => css`
    ${theme.typography.body_long03}
    color: ${theme.colors.black_03};
  `}
`;

export default RestaurantItem;
