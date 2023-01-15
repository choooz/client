import { Portal, transitions } from "@chooz/ui";
import Image from "next/image";
import { Success } from "public/images";
import React from "react";
import styled from "styled-components";

interface Props {
  onToggleModal: () => void;
}

const GuideTextModal = ({ onToggleModal }: Props) => {
  return (
    <Portal selector="#portal">
      <ModalTemplateBlock onMouseDown={onToggleModal}>
        <Inner>
          <Image alt="체크" src={Success} width={56} height={56} />
          <GuideText>선택결정이 등록되었어요.</GuideText>
        </Inner>
        <ModalBackground />
      </ModalTemplateBlock>
    </Portal>
  );
};

const GuideText = styled.div`
  color: ${({ theme }) => theme.palette.background.white};
  ${({ theme }) => theme.textStyle.Title_Large}
  font-weight: 700;
`;

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
  z-index: 1000;
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

export default GuideTextModal;
