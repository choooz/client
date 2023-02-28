import { Button, ModalTemplate } from "@chooz/ui";
import { WarningIcon } from "public/icons";
import styled from "styled-components";

interface Props {
  onToggleModal: () => void;
}

function CommentDeleteModal({ onToggleModal }: Props) {
  return (
    <ModalTemplate width="311px" height="250px" onToggleModal={onToggleModal}>
      <WarningIconStyled width="40px" height="40px" />
      <GuideText>정말로 삭제하시겠습니까?</GuideText>
      <DetailText>댓글은 삭제후 다시 복구할 수 없습니다.</DetailText>
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
        <Button variant="warning" width="156px" height="48px" borderRadius="0 0 4px 0">
          확인
        </Button>
      </ButtonWrapper>
    </ModalTemplate>
  );
}

export default CommentDeleteModal;

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

const DetailText = styled.div`
  margin-top: 22px;
  text-align: center;
  letter-spacing: -1px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
`;
