import { ModalTemplate } from "components/index";
import SvgIcX from "src/assets/icons/components/IcX";
import styled from "styled-components";

interface Props {
  onToggleDrinkSearchModal: () => void;
}

function DrinkSearchModal({ onToggleDrinkSearchModal }: Props) {
  return (
    <ModalTemplate width="375px" height="100%" onToggleModal={onToggleDrinkSearchModal}>
      <TopBar>
        술 검색하기
        <SvgIcX width={24} height={24} />
      </TopBar>
    </ModalTemplate>
  );
}

const ModalWrapper = styled.div`
  max-width: 720px;
`;

const TopBar = styled.div``;

export default DrinkSearchModal;
