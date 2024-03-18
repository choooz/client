import { transitions } from 'lib/styles';
import { isLogin } from 'lib/utils/auth';
import { classifyImageUrl } from 'lib/utils/classifyImageUrl';
import Image from 'next/image';
import useDrinkStampService from 'services/useDrinkStampService';
import SvgStamp from 'src/assets/icons/components/IcStamp';
import { DrinkInfo } from 'src/types/drink';
import styled, { css, useTheme } from 'styled-components';

interface Props {
  drinkInfo:
    | DrinkInfo
    | {
        id: number;
        name: string;
        manufacturer: string;
        image: string;
      };
  onClickReplaceDrinkInfo: (e: React.MouseEvent<HTMLButtonElement>) => void;
  selectedDrinkList?: string[];
  onToggleReplaceLoginPageModal: () => void;
}

function DrinkItem({
  drinkInfo,
  onClickReplaceDrinkInfo,
  selectedDrinkList,
  onToggleReplaceLoginPageModal,
}: Props) {
  const { id, name, manufacturer, image } = drinkInfo;

  const imageUrl = classifyImageUrl(image);

  const { colors } = useTheme();

  const { isStampedDrink, postDrinkEnjoy } = useDrinkStampService(id);

  const stampColor = isStampedDrink?.enjoyed ? colors.main_01 : colors.black_05;

  return (
    <Container
      onClick={onClickReplaceDrinkInfo}
      name={name}
      selected={selectedDrinkList?.includes(name)}
    >
      <ImageWrapper>
        <Image
          alt={name}
          src={imageUrl}
          width={88}
          height={88}
          style={{ borderRadius: '10px' }}
        />
      </ImageWrapper>
      <InfoContainer>
        <NameStampContainer>
          <Name>{name}</Name>
          <StampWrapper
            onClick={(e) => {
              e.stopPropagation();
              isLogin() ? postDrinkEnjoy(id) : onToggleReplaceLoginPageModal();
            }}
          >
            <SvgStamp width={24} height={24} fill={stampColor} />
          </StampWrapper>
        </NameStampContainer>
        <ManufacturerName>{manufacturer}</ManufacturerName>
      </InfoContainer>
    </Container>
  );
}

const Container = styled.button<{ selected: boolean | undefined }>`
  display: flex;
  box-shadow: 0px 2px 8px 0px rgba(235, 235, 235, 0.4),
    0px 8px 20px 0px rgba(235, 235, 235, 0.4);
  height: 120px;
  padding: 16px;
  border-radius: 16px;
  cursor: pointer;
  width: 100%;
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

export default DrinkItem;
