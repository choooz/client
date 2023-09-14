import Chip from "components/Chip";
import { DrinkInfo } from "lib/apis/drink";
import Path from "lib/Path";
import { transitions } from "lib/styles";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SvgStamp from "src/assets/icons/components/IcStamp";
import styled, { css, useTheme } from "styled-components";

interface Props {
  drinkInfo: DrinkInfo;
  stamp?: boolean;
  onClickAddDrink?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  selectedDrinkList?: string[];
}

function DrinkItem({ drinkInfo, stamp, onClickAddDrink, selectedDrinkList }: Props) {
  const { id, name, productName, image } = drinkInfo;

  const { colors } = useTheme();

  const router = useRouter();
  const onClickDrinkItem = () => {
    router.push(`${Path.DRINK_INFO_PAGE}/${id}`);
  };

  return (
    <Container
      onClick={onClickAddDrink || onClickDrinkItem}
      name={productName}
      selected={selectedDrinkList?.includes(productName)}
    >
      <ImageWrapper>
        <Image alt="임시 이미지" src={image} fill style={{ borderRadius: "10px" }} />
      </ImageWrapper>
      <InfoContainer>
        <NameStampContainer>
          <Name>{name}</Name>
          {stamp && (
            <StampWrapper>
              <SvgStamp width={24} height={24} fill={colors.black_05} />
            </StampWrapper>
          )}
        </NameStampContainer>
        <ManufacturerName>{productName}</ManufacturerName>
        <ChipContainer>
          <Chip variant="region">서울</Chip>
          <Chip variant="numberOfParticipants">213명이 즐겼어요</Chip>
        </ChipContainer>
      </InfoContainer>
    </Container>
  );
}

const Container = styled.button<{ selected: boolean | undefined }>`
  display: flex;
  box-shadow: 0px 2px 8px 0px rgba(235, 235, 235, 0.4), 0px 8px 20px 0px rgba(235, 235, 235, 0.4);
  height: 120px;
  padding: 16px;
  border-radius: 16px;
  cursor: pointer;
  ${({ theme, selected }) =>
    selected &&
    css`
      animation: ${transitions.blink} 0.7s ease-in-out;
      border: 1px solid ${theme.colors.black_01};
    `};
`;

const ImageWrapper = styled.div`
  width: 88px;
  height: 88px;
  position: relative;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-left: 12px;
`;

const NameStampContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StampWrapper = styled.div`
  margin-right: 1px;
`;

const Name = styled.div`
  ${({ theme }) =>
    css`
      ${theme.typography.body01}
      color: ${theme.colors.black_01};
      display: flex;
      flex-direction: column;
    `}
`;

const ManufacturerName = styled.span`
  ${({ theme }) =>
    css`
      ${theme.typography.body03}
      color: ${theme.colors.black_03};
      margin-top: 4px;
      display: inherit;
    `}
`;

const ChipContainer = styled.div`
  display: flex;
  margin-top: 13px;
  gap: 4px;
`;

export default DrinkItem;
