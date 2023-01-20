import { Template } from "@chooz/ui";
import { PostVoteRequest } from "lib/api/vote";
import { AGE_LIST, MBTI_LIST } from "lib/constants";
import React from "react";
import styled from "styled-components";

interface Props {
  vote: PostVoteRequest;
  onChangeVoteByClick(e: React.ChangeEvent<HTMLInputElement>): void;
  onChangeVoteBySelect(e: React.ChangeEvent<HTMLSelectElement>): void;
  mutateVote(): void;
  onChangePostStep(step: number): void;
}

function TargetSection({
  onChangePostStep,
  onChangeVoteBySelect,
  onChangeVoteByClick,
  vote,
  mutateVote,
}: Props) {
  const { filteredAge, filteredGender } = vote;

  return (
    <Template
      prevButtonText="이전"
      prevButtonProps={{
        onClick: () => onChangePostStep(-1),
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
      <Select name="mbti" onChange={onChangeVoteBySelect}>
        <option value="" hidden>
          MBTI를 선택해주세요
        </option>
        {MBTI_LIST.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </Select>
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
  user-select: none;
  width: 128px;
  height: 54px;
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

const Select = styled.select`
  padding: 8px 16px;
  border-radius: 4px;
  width: 100%;
  height: 54px;
  border: 1px solid ${({ theme }) => theme.palette.border.base};
`;

export default TargetSection;
