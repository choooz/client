import { DivideLine, Input, ModalTemplate, Template } from "@chooz/ui";
import { AGE_LIST } from "lib/constants";
import React from "react";
import styled from "styled-components";

// 임시용 카테고리
const CATEGIORY_LIST = [
  { id: "1", name: "영화" },
  { id: "2", name: "음악" },
  { id: "3", name: "책" },
  { id: "4", name: "게임" },
  { id: "5", name: "스포츠" },
  { id: "6", name: "음식" },
];

interface Props {
  onToggleModal(): void;
}

function AddDetailModal({ onToggleModal }: Props) {
  return (
    <ModalTemplate width="480px" height="698px" onToggleModal={onToggleModal}>
      <Template nextButtonProps={{}} nextButtonText="작성 완료">
        <ModalWrapper>
          <TitleRow>
            <div>수정하기</div>
            <div>x</div>
          </TitleRow>
          <QuestionText> 질문을 입력해주세요.(선택)</QuestionText>
          <TitleInput placeholder="질문을 입력해주세요" />
          <QuestionText>선택지를 입력해주세요.</QuestionText>
          <FlexRow>
            <Input width="auto" />
            <VSText>VS</VSText>
            <Input width="auto" />
          </FlexRow>
          <DivideLine />
          <QuestionText>나이</QuestionText>
          <ChipWrapper>
            {CATEGIORY_LIST.map(({ id, name }) => (
              <div key={id}>
                <InvisibleInput type="radio" />
                <Chip htmlFor={id}>{name}</Chip>
              </div>
            ))}
          </ChipWrapper>
          <QuestionText>상세사항 </QuestionText>
          <TitleInput placeholder="상세사항을 입력해주세요" />
        </ModalWrapper>
      </Template>
    </ModalTemplate>
  );
}

const ModalWrapper = styled.div`
  padding: 24px;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${({ theme }) => theme.textStyle.Title_Medium}
  font-weight: 700;
  margin-bottom: 12px;
`;

const QuestionText = styled.div`
  ${({ theme }) => theme.textStyle.Title_Small}
  font-weight: 700;
  padding-bottom: 8px;
  color: ${({ theme }) => theme.palette.ink.base};
`;

const TitleInput = styled.textarea`
  padding: 14px 16px;
  width: 100%;
  height: 72px;
  border: 1px solid ${({ theme }) => theme.palette.border.base};
  border-radius: 8px;
  resize: none;
  margin-bottom: 32px;
`;

const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const VSText = styled.div`
  ${({ theme }) => theme.textStyle.Title_Small}
  font-weight: 700;
`;

const InvisibleInput = styled.input`
  width: 0;
  height: 0;
  position: absolute;
  left: -9999px;

  &[type="radio"]:checked + label {
    background: ${({ theme }) => theme.palette.background.selected};
    color: ${({ theme }) => theme.palette.main.sub};
    border: 1px solid ${({ theme }) => theme.palette.main.point};
    font-weight: 700;
  }
`;

const ChipWrapper = styled.div`
  display: flex;
  gap: 16px;
  padding-bottom: 32px;
  flex-wrap: wrap;
`;

const Chip = styled.label`
  user-select: none;
  width: 128px;
  height: 40px;
  color: ${({ theme }) => theme.palette.border.dark};
  background: ${({ theme }) => theme.palette.background.soft};
  border: 1px solid ${({ theme }) => theme.palette.border.base};
  border-radius: 100px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  :hover {
    background: ${({ theme }) => theme.palette.background.selected};
    color: ${({ theme }) => theme.palette.main.sub};
  }
`;

export default AddDetailModal;
