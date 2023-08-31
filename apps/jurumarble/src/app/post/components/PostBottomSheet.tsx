import { Button, Portal } from "components/index";
import styled, { css } from "styled-components";

interface Props {
  onToggleDrinkSearchModal: () => void;
  onChangePostStep: () => void;
}

function PostBottomSheet({ onToggleDrinkSearchModal, onChangePostStep }: Props) {
  return (
    <Portal selector="#portal">
      <BottomSheet>
        <ButtonStyled
          width="100%"
          height="100%"
          variant="primary"
          onClick={onToggleDrinkSearchModal}
        >
          술 검색하기
        </ButtonStyled>
        <ButtonStyled width="100%" height="100%" onClick={onChangePostStep}>
          직접 등록하기
        </ButtonStyled>
      </BottomSheet>
    </Portal>
  );
}

const ButtonStyled = styled(Button)`
  ${({ theme }) =>
    css`
      ${theme.typography.body01}
    `}
`;

const BottomSheet = styled.div`
  ${({ theme }) =>
    css`
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 20px;
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 160px;
      max-width: 720px;
      border-radius: 16px 16px 0px 0px;
      box-shadow: 0px 0px 32px 0px ${theme.colors.modal_shadow};
    `}
`;

export default PostBottomSheet;
