import { Button, ModalTemplate } from "@chooz/ui";
import { WarningIcon } from "public/icons";
import styled from "styled-components";
import { UserModel } from "types/auth";

interface Props {
  userInfo: UserModel;
  onToggleModal: () => void;
  onCompleteRegister: (userInfo: UserModel) => void;
}

function WarningSmallModal({ userInfo, onToggleModal, onCompleteRegister }: Props) {
  const { gender, MBTI, age } = userInfo;

  return (
    <ModalTemplate width="311px" height="357px" onToggleModal={onToggleModal}>
      <WarningIconStyled width="40px" height="40px" />
      <GuideText>선택하신 항목을 확인해주세요.</GuideText>
      <InfoList>
        <ListItem>
          <Key>성별</Key>
          <Divider />
          <Value>{gender}</Value>
        </ListItem>
        <ListItem>
          <Key>MBTI</Key>
          <Divider />
          <Value>
            {MBTI.M}
            {MBTI.B}
            {MBTI.T}
            {MBTI.I}
          </Value>
        </ListItem>
        <ListItem>
          <Key>나이</Key>
          <Divider />
          <Value>{age}</Value>
        </ListItem>
      </InfoList>
      <DetailText>
        성별과 나이는 변경할 수 없으며, <br />
        MBTI는 선택 후 2개월마다 수정하실 수 있습니다.
      </DetailText>
      <ButtonWrapper>
        <Button
          variant="inactive"
          width="156px"
          height="48px"
          borderRadius="0 0 0 4px"
          onClick={onToggleModal}
        >
          취소
        </Button>
        <Button
          variant="warning"
          width="156px"
          height="48px"
          borderRadius="0 0 4px 0"
          onClick={() => onCompleteRegister(userInfo)}
        >
          확인
        </Button>
      </ButtonWrapper>
    </ModalTemplate>
  );
}

export default WarningSmallModal;

const WarningIconStyled = styled(WarningIcon)`
  margin: 0 auto;
  margin-top: 40px;
`;

const GuideText = styled.div`
  text-align: center;
  margin-top: 20px;
  ${({ theme }) => theme.textStyle.Title_Medium};
  font-weight: bold;
`;

const InfoList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 16px;
  height: 70px;
  text-align: center;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.textStyle.Font_Regular};
`;

const Key = styled.span`
  display: flex;
  flex-basis: 50%;
  justify-content: flex-end;
  color: ${({ theme }) => theme.palette.ink.lighter};
  padding-right: 8px;
`;

const Value = styled.span`
  display: flex;
  flex-basis: 50%;
  font-weight: bold;
  padding-left: 8px;
`;

const Divider = styled.div`
  display: flex;
  width: 1px;
  height: 11px;
  flex-grow: 0;
  background-color: ${({ theme }) => theme.palette.border.base};
`;

const DetailText = styled.div`
  margin-top: 22px;
  text-align: center;
  letter-spacing: -1px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 40px;
`;
