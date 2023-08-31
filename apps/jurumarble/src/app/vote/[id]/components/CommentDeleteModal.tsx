import { Button, ModalTemplate } from "components/index";
import styled from "styled-components";

interface Props {
  onToggleModal: () => void;
  onSubmit: () => void;
}

function CommentDeleteModal({ onToggleModal, onSubmit }: Props) {
  const onClickDelete = () => {
    onToggleModal();
    onSubmit();
  };
  return (
    <ModalTemplate width="311px" height="250px" onToggleModal={onToggleModal}>
      <GuideText>정말로 삭제하시겠습니까?</GuideText>
      <DetailText>댓글은 삭제후 다시 복구할 수 없습니다.</DetailText>
      <ButtonWrapper>
        <Button width="156px" height="48px" borderRadius="0 0 0 4px" onClick={onToggleModal}>
          취소
        </Button>
        <Button width="156px" height="48px" borderRadius="0 0 4px 0" onClick={onClickDelete}>
          확인
        </Button>
      </ButtonWrapper>
    </ModalTemplate>
  );
}

export default CommentDeleteModal;

// const WarningIconStyled = styled.div`
//   margin: 0 auto;
//   margin-top: 40px;
// `;

const GuideText = styled.div`
  text-align: center;
  margin-top: 20px;
  ${({ theme }) => theme.typography.subhead01};
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
