import { Button, Template } from "@chooz/ui";
import { PostVote } from "lib/apis/vote";
import { AGE_LIST, FIRST_STEP, MBTI_LIST } from "lib/constants";
import React from "react";
import styled, { css } from "styled-components";

interface Props {
  vote: PostVote;
  onChangeVoteByClick(e: React.ChangeEvent<HTMLInputElement>): void;
  onChangeVoteBySelect(e: React.ChangeEvent<HTMLSelectElement>): void;
  mutateVote(): void;
  onChangePostStep(step: number): void;
  filteredMbti: string;
  onResetVoteFilter(): void;
}

function TargetSection({
  onChangePostStep,
  onChangeVoteBySelect,
  onChangeVoteByClick,
  vote,
  mutateVote,
  filteredMbti,
  onResetVoteFilter,
}: Props) {
  const { filteredAge, filteredGender } = vote;

  return (
    <Template
      prevButtonText="이전"
      prevButtonProps={{
        onClick: () => onChangePostStep(FIRST_STEP),
      }}
      nextButtonText="다음"
      nextButtonProps={{
        onClick: mutateVote,
      }}
    >
      <QuestionText>선택지를 입력해주세요.</QuestionText>
      <SubText>사진은 필수는 아니지만 선택받을 확률이 높아져요!</SubText>
      <QuestionText>성별</QuestionText>
      <ChipWrapper>
        <InvisibleInput
          type="radio"
          name="filteredGender"
          id="MALE"
          value="MALE"
          checked={filteredGender === "MALE"}
          onChange={onChangeVoteByClick}
        />
        <Chip htmlFor="MALE">남성</Chip>
        <InvisibleInput
          type="radio"
          name="filteredGender"
          id="FEMALE"
          value="FEMALE"
          checked={filteredGender === "FEMALE"}
          onChange={onChangeVoteByClick}
        />
        <Chip htmlFor="FEMALE">여성</Chip>
      </ChipWrapper>
      <QuestionText>나이</QuestionText>
      <ChipWrapper>
        {AGE_LIST.map(({ id, name }) => (
          <div key={id}>
            <InvisibleInput
              type="radio"
              name="filteredAge"
              id={id}
              value={id}
              checked={filteredAge === id}
              onChange={onChangeVoteByClick}
            />
            <Chip htmlFor={id}>{name}</Chip>
          </div>
        ))}
      </ChipWrapper>
      <QuestionText>MBTI</QuestionText>

      {/* 추가적으로 나중에 밑쪽 화살표 추가하기 */}
      <Select name="filteredMbti" onChange={onChangeVoteBySelect} value={filteredMbti}>
        <option value="" hidden>
          MBTI를 선택해주세요
        </option>
        {MBTI_LIST.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>
      <ResetButtonWrapper>
        <Button width="100px" height="42px" variant="warning" onClick={onResetVoteFilter}>
          초기화
        </Button>
      </ResetButtonWrapper>
    </Template>
  );
}

const QuestionText = styled.div`
  font-size: 20px;
  font-weight: 700;
  padding-bottom: 8px;
`;

const SubText = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.palette.border.dark};
  line-height: 22px;
  padding-bottom: 32px;
`;

const Chip = styled.label`
  ${({ theme }) => css`
    background: ${theme.palette.background.soft};
    color: ${theme.palette.border.dark};
    border: 1px solid ${theme.palette.border.base};
  `}
  user-select: none;
  width: 128px;
  height: 54px;
  border-radius: 100px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  :hover {
    ${({ theme }) => css`
      background: ${theme.palette.background.selected};
      color: ${theme.palette.main.sub};
    `}
  }
`;

const InvisibleInput = styled.input`
  width: 0;
  height: 0;
  position: absolute;
  left: -9999px;

  &[type="radio"]:checked + label {
    font-weight: 700;
    ${({ theme }) => css`
      background: ${theme.palette.background.selected};
      color: ${theme.palette.main.sub};
      border: 1px solid ${theme.palette.main.point};
    `}
  }
`;

const ChipWrapper = styled.div`
  display: flex;
  gap: 16px;
  padding-bottom: 32px;
  flex-wrap: wrap;
`;

const Select = styled.select`
  padding: 8px 16px;
  border-radius: 4px;
  width: 100%;
  height: 54px;
  ${({ theme }) => css`
    border: 1px solid ${theme.palette.border.base};
    color: ${theme.palette.ink.lighter};
  `};
`;

const ResetButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 32px;
`;

export default TargetSection;
