import { Button, ModalTemplate } from "components/index";
import { ALCOHOL_LEVEL_LIST, GENDER_LIST } from "lib/constants";
import { SvgWarningIcon } from "src/assets/icons/components";

import styled, { css } from "styled-components";
import { useRegisterContext } from "../contexts";

function WarningModal() {
  const { drinkCapacity, gender, stringfiedMBTI, yearOfBirth, addUser, onToggleWarningModal } =
    useRegisterContext();

  const drinkCapacityLevel =
    drinkCapacity === ALCOHOL_LEVEL_LIST[0].id
      ? 0
      : drinkCapacity === ALCOHOL_LEVEL_LIST[1].id
      ? 1
      : 2;

  return (
    <ModalTemplate width="335px" height="510px" onToggleModal={onToggleWarningModal}>
      <Container>
        <WarningIconStyled width="56px" height="56px" />
        <GuideText>선택하신 항목을 확인해주세요.</GuideText>
        <UserInfoList>
          <ListItem>
            <Key>도수</Key>
            <Value>
              {ALCOHOL_LEVEL_LIST[drinkCapacityLevel].levelChip()}
              {ALCOHOL_LEVEL_LIST[drinkCapacityLevel].label.substring(4)}
            </Value>
          </ListItem>
          <ListItem>
            <Key>성별</Key>
            <Value>{GENDER_LIST.find(({ id }) => id === gender)?.label}</Value>
          </ListItem>
          <ListItem>
            <Key>출생년도</Key>
            <Value>{yearOfBirth}년</Value>
          </ListItem>
          <ListItem>
            <Key>MBTI</Key>
            <Value>{stringfiedMBTI}</Value>
          </ListItem>
        </UserInfoList>
        <WarningText>
          ※ 성별과 출생년도는 추후 변경할 수 없으며, MBTI는 설정 후 2개월마다 수정 가능합니다.
        </WarningText>
        <ButtonContainer>
          <CancelButton
            width="100%"
            height="56px"
            border-radius="10px"
            onClick={onToggleWarningModal}
          >
            취소
          </CancelButton>
          <CompleteButton width="100%" height="56px" border-radius="10px" onClick={addUser}>
            확인
          </CompleteButton>
        </ButtonContainer>
      </Container>
    </ModalTemplate>
  );
}

const Container = styled.div`
  ${({ theme }) => css`
    ${theme.typography.body02}
    padding: 40px 20px 0 20px;
  `}
`;

const WarningIconStyled = styled(SvgWarningIcon)`
  display: flex;
  margin: 0 auto;
`;

const GuideText = styled.div`
  ${({ theme }) => css`
    ${theme.typography.headline02};
    color: ${theme.colors.black_01};
    text-align: center;
    margin-top: 40px;
  `};
`;

const UserInfoList = styled.ul`
  ${({ theme }) => css`
    background-color: ${theme.colors.bg_02};
    border-radius: 8px;
    gap: 4px;
    display: flex;
    flex-direction: column;
    margin-top: 24px;
    padding: 20px;
  `}
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
`;

const Key = styled.span`
  ${({ theme }) => css`
    ${theme.typography.headline04}
    color: ${theme.colors.black_02};
    display: flex;
    justify-content: flex-end;
    padding-right: 8px;
  `};
`;

const Value = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.black_03};
    display: flex;
    padding-left: 8px;
    gap: 6px;
  `};
`;

const WarningText = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.black_02};
    margin-top: 24px;
    text-align: center;
    line-height: 24px;
  `}
`;

const ButtonContainer = styled.div`
  ${({ theme }) => css`
    ${theme.typography.body01}
    display: flex;
    gap: 8px;
    margin-top: 40px;
  `};
`;

const CancelButton = styled(Button)`
  ${({ theme }) => css`
    background-color: ${theme.colors.black_05};
    color: ${theme.colors.black_03};
  `};
`;

const CompleteButton = styled(Button)`
  ${({ theme }) => css`
    background-color: ${theme.colors.system_red};
    color: ${theme.colors.white};
  `};
`;

export default WarningModal;
