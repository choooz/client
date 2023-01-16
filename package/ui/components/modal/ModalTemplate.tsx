import React from "react";
import styled from "styled-components";
import { transitions } from "../../styles";
import Portal from "./Portal";

interface ModalInnerStyled {
  width: `${number}px` | `${number}%`;
  height: `${number}px` | `${number}%`;
}

interface ModalTemplateProps extends ModalInnerStyled {
  children: React.ReactNode;
  onToggleModal: () => void;
}

function ModalTemplate({ width, height, children, onToggleModal, ...rest }: ModalTemplateProps) {
  return (
    <Portal selector="#portal">
      <ModalTemplateBlock onMouseDown={onToggleModal} {...rest}>
        <ModalInner width={width} height={height} onMouseDown={(e) => e.stopPropagation()}>
          {children}
        </ModalInner>
        <ModalBackground />
      </ModalTemplateBlock>
    </Portal>
  );
}

const ModalTemplateBlock = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 9999;
`;

const ModalInner = styled.div<ModalInnerStyled>`
  position: absolute;
  z-index: 9999;
  background-color: white;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: 12px;
  animation: ${transitions.fadeIn} 0.4s ease-in-out;
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
`;

export default ModalTemplate;
