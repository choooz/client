import { RestaurantInfo } from 'lib/apis/restaurant';
import Image from 'next/image';
import { restaurantImg } from 'public/images';
import styled, { css } from 'styled-components';

interface Props {
  onClickSelectedRestaurant: (restaurantId: RestaurantInfo) => void;
  restaurantInfo: RestaurantInfo;
}

function RestaurantItem({ restaurantInfo, onClickSelectedRestaurant }: Props) {
  const { restaurantName, treatMenu, restaurantImage } = restaurantInfo;
  return (
    <Container onClick={() => onClickSelectedRestaurant(restaurantInfo)}>
      {restaurantImage ? (
        <Image
          alt="음식점 이미지"
          src={restaurantImage}
          width={49}
          height={49}
        />
      ) : (
        <Image alt="음식점 이미지" src={restaurantImg} width={49} height={49} />
      )}
      <TextContainer>
        <Name>{restaurantName}</Name>
        <Menu>
          <>대표메뉴 : </>
          {treatMenu}
        </Menu>
      </TextContainer>
    </Container>
  );
}

const Container = styled.li`
  display: flex;
  margin: 20px 0;
  cursor: pointer;
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
