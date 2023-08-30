import { transitions } from "lib/styles";
import Image from "next/image";
import SvgStamp from "src/assets/icons/components/IcStamp";
import styled, { css, useTheme } from "styled-components";

interface Props {
  src: string;
  drinkName: string;
  manufacturer: string;
  stamp?: boolean;
  onClickAddDrink: (e: React.MouseEvent<HTMLButtonElement>) => void;
  selectedDrinkList: string[];
}

function DrinkItem({
  src,
  drinkName = "제품명",
  manufacturer = "제조사",
  stamp,
  onClickAddDrink,
  selectedDrinkList,
}: Props) {
  const { colors } = useTheme();
  return (
    <Container
      onClick={onClickAddDrink}
      name={manufacturer}
      selected={selectedDrinkList.includes(manufacturer)}
    >
      <ImageWrapper>
        <Image alt="임시 이미지" src={src} fill style={{ borderRadius: "10px" }} />
      </ImageWrapper>
      <InfoContainer>
        <NameStampContainer>
          <Name>{drinkName}</Name>
          {stamp && (
            <StampWrapper>
              <SvgStamp width={24} height={24} fill={colors.black_05} />
            </StampWrapper>
          )}
        </NameStampContainer>
        <ManufacturerName>{manufacturer}</ManufacturerName>
        <ChipContainer></ChipContainer>
      </InfoContainer>
    </Container>
  );
}

const Container = styled.button<{ selected: boolean }>`
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

const ChipContainer = styled.div``;

export default DrinkItem;
