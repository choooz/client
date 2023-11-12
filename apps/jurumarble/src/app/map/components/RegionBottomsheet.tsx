import { Button, Portal } from 'components/index';
import { REGION_LIST } from 'lib/constants';
import { transitions } from 'lib/styles';
import { SvgIcClose, SvgIcPrev } from 'src/assets/icons/components';
import styled, { css } from 'styled-components';

interface Props {
  on: boolean;
  onToggleDrinkSearchModal: () => void;
  setChangeMapCenter: (lat: number, lng: number) => void;
  onChangeNowIn: (nowIn: string) => void;
}

const RegionBottomSheet = ({
  on,
  onToggleDrinkSearchModal,
  setChangeMapCenter,
  onChangeNowIn,
}: Props) => {
  if (!on) {
    return null;
  }

  return (
    <Portal selector="#portal">
      <BottomSheet>
        <Inner>
          <Title>지역 설정</Title>
          <Exit>
            <SvgIcClose />
          </Exit>

          <SelectBox>
            지역을 선택해주세요{' '}
            <SvgIcPrev
              style={{
                transform: 'rotate(-90deg)',
              }}
            />{' '}
          </SelectBox>
          <List>
            {REGION_LIST.map(({ label, lat, long }) => (
              <RegionItem
                key={label}
                onClick={() => {
                  setChangeMapCenter(lat, long);
                  onToggleDrinkSearchModal();
                  onChangeNowIn(label);
                }}
              >
                {label}
              </RegionItem>
            ))}
          </List>
          <ButtonWrapper>
            <Button variant="primary" width="100%" height="56px">
              확인
            </Button>
          </ButtonWrapper>
        </Inner>
        <Background onClick={onToggleDrinkSearchModal} />
      </BottomSheet>
    </Portal>
  );
};

const BottomSheet = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 9999;
`;

const Inner = styled.div`
  position: absolute;
  z-index: 9999;
  background-color: white;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  width: 100%;
  max-width: 720px;
  height: 90%;
  animation: ${transitions.popInFromBottom} 0.4s ease-in-out;
  border-radius: 16px 16px 0px 0px;
  padding: 26px 20px 20px 20px;
`;

const Background = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  background-color: black;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0.4;
`;

const Title = styled.div`
  display: flex;
  ${({ theme }) => css`
    ${theme.typography.headline03}
  `}
  justify-content: center;
  padding-bottom: 36px;
`;

const Exit = styled.div`
  position: absolute;
  top: 26px;
  right: 20px;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const SelectBox = styled.div`
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.black_05};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 16px;
  color: ${({ theme }) => theme.colors.black_03};
  ${({ theme }) => theme.typography.button01}
  gap: 4px;
  margin-bottom: 8px;
`;

const List = styled.div`
  width: 100%;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.line_01};
  overflow-y: scroll;
  height: calc(90% - 134px);
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const RegionItem = styled.div`
  padding: 16px;
  text-align: center;
  color: ${({ theme }) => theme.colors.black_02};
  ${({ theme }) => theme.typography.button02}
  border-bottom: 1px solid ${({ theme }) => theme.colors.line_01};
  :active {
    background-color: ${({ theme }) => theme.colors.bg_01};
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 20px;
`;

export default RegionBottomSheet;
