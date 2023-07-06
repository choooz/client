import { Portal, transitions } from "@chooz/ui";
import React from "react";
import styled from "styled-components";

/**
 * @description
 * 검은 배경에 특정 컴포넌트만 띄워주는 모달
 *
 */

interface Props {
  onToggleModal: () => void;
  children: React.ReactNode;
}

function FloatComponentTemplate({ onToggleModal, children }: Props) {
  return (
    <Portal selector="#portal">
      <ModalTemplateBlock onMouseDown={onToggleModal}>
        <Inner>{children}</Inner>
        <ModalBackground />
      </ModalTemplateBlock>
    </Portal>
  );
}

const Inner = styled.div`
  position: absolute;
  background-color: unset;
  z-index: 2000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
`;

const ModalTemplateBlock = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1000000;
`;

const ModalBackground = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  background-color: black;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0.4;
  z-index: 1100;
`;

export default FloatComponentTemplate;
