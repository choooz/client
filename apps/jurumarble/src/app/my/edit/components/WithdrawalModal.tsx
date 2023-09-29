import { Button, ModalTemplate } from "components/index";
import VoteHeader from "components/VoteHeader";
import { SvgIcX } from "src/assets/icons/components";
import styled, { css } from "styled-components";
import { useToggle } from "@monorepo/hooks";

interface Props {
  onToggleWithdrawalModal: () => void;
  deleteUser: () => void;
}

function WithdrawalModal({ onToggleWithdrawalModal, deleteUser }: Props) {
  const [isChecked, onToggleIsChecked] = useToggle(true);
  return (
    <ModalTemplate width="375px" height="100%" onToggleModal={onToggleWithdrawalModal}>
      <VoteHeader
        rightButton={
          <CloseButton onClick={onToggleWithdrawalModal}>
            <SvgIcX width={24} height={24} />
          </CloseButton>
        }
      >
        <TitleStyled>탈퇴하기</TitleStyled>
      </VoteHeader>
      <WarningMessage>
        ※탈퇴한 계정은 재가입 및 복구가 불가하오니 신중하게 선택하시길 바랍니다.
      </WarningMessage>
      <GuideSection>
        <div>
          1. 회원 정보 및 서비스 이용기록은 즉시 삭제되며, 삭제된 데이터는 복구되지 않습니다.
          <DetailMessage>• 필요한 데이터는 미리 백업을 해주세요.</DetailMessage>
        </div>
        <div>
          2. 주루마블에 올린 게시글, 댓글, 북마크 등의 콘텐츠는 탈퇴 시 자동으로 삭제되지 않고
          그대로 남아있습니다.
          <DetailMessage>
            • 삭제를 원하는 콘텐츠가 있다면 반드시 탈퇴 전 삭제하시기 바랍니다.
          </DetailMessage>
          <DetailMessage>
            • 탈퇴 후에는 본인 여부를 확인하기 어려워 콘텐츠를 임의로 삭제해드릴 수 없습니다.{" "}
          </DetailMessage>
        </div>
      </GuideSection>
      <CheckBoxWrapper>
        <CheckBox type="checkbox" onChange={onToggleIsChecked} />위 내용을 모두 확인하였으며, 이에
        동의합니다.*
      </CheckBoxWrapper>
      <WithdrawalButtonWrapper>
        <Button
          variant="primary"
          width="100%"
          height="56px"
          disabled={isChecked}
          onClick={deleteUser}
        >
          탈퇴하기
        </Button>
      </WithdrawalButtonWrapper>
    </ModalTemplate>
  );
}

const TitleStyled = styled.div`
  margin-top: 14px;
`;

const CloseButton = styled(Button)`
  margin: 14px 12px 0 0;
`;

const WarningMessage = styled.div`
  ${({ theme }) => css`
    ${theme.typography.body01}
    color: ${theme.colors.system_red};
    margin-top: 20px;
    padding: 0 20px;
  `}
`;

const GuideSection = styled.section`
  ${({ theme }) => css`
    ${theme.typography.headline04}
    color: ${theme.colors.black_02};
    background-color: ${theme.colors.bg_02};
    margin-top: 20px;
    padding: 20px;
    > div + div {
      margin-top: 30px;
    }
  `}
`;

const DetailMessage = styled.p`
  ${({ theme }) => css`
    ${theme.typography.body_long03}
    margin-top: 12px;
  `}
`;

const CheckBoxWrapper = styled.label`
  ${({ theme }) => css`
    ${theme.typography.body_long03}
    margin-top: 20px;
    padding: 0 20px;
    display: flex;
    align-items: center;
  `}
`;

const CheckBox = styled.input`
  ${({ theme }) => css`
    width: 24px;
    height: 24px;
    appearance: none;
    transition: background 0.2s;
    border-radius: 8px;
    border: solid 1px ${theme.colors.black_05};
    margin-right: 8px;
    :checked {
      border: none;
      background-color: ${theme.colors.black_01};
      /**
       * @TODO 더 좋은 방법 찾아보기
       */
      background-image: url("/icCheck.svg");
    }
  `}
`;

const WithdrawalButtonWrapper = styled.div`
  margin: 187px 20px 0 20px;
`;

export default WithdrawalModal;
