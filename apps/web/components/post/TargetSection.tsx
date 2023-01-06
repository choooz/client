import { Template } from "@chooz/ui";
import React, { useCallback, useState } from "react";
import styled from "styled-components";

const AGE_LIST = [
  { id: "10", name: "10대" },
  { id: "20", name: "20대" },
  { id: "30", name: "30대" },
  { id: "40", name: "40대" },
  { id: "50", name: "50대" },
];

function TargetSection() {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");

  const onClickChip = useCallback((e: React.MouseEvent<HTMLLabelElement>) => {
    setValue1(e.currentTarget.htmlFor);
  }, []);

  const onClickChip2 = useCallback((e: React.MouseEvent<HTMLLabelElement>) => {
    setValue2(e.currentTarget.htmlFor);
  }, []);

  return (
    <Template prevButtonText="이전" nextButtonText="다음">
      <QuestionText>선택지를 입력해주세요.</QuestionText>
      <SubText>사진은 필수는 아니지만 선택받을 확률이 높아져요!</SubText>
      <QuestionText>성별</QuestionText>
      <ChipWrapper>
        <InvisibleInput
          type="radio"
          name="gender"
          id="MALE"
          value="MALE"
          defaultChecked={value1 === "MALE"}
        />
        <Chip htmlFor="MALE" onClick={onClickChip}>
          남성
        </Chip>
        <InvisibleInput
          type="radio"
          name="gender"
          id="FEMALE"
          defaultChecked={value1 === "FEMALE"}
        />
        <Chip htmlFor="FEMALE" onClick={onClickChip}>
          여성
        </Chip>
      </ChipWrapper>
      <QuestionText>나이</QuestionText>
      <ChipWrapper>
        {AGE_LIST.map(({ id, name }) => (
          <div key={id}>
            <InvisibleInput type="radio" name="age" id={id} defaultChecked={value2 === id} />
            <Chip htmlFor={id} onClick={onClickChip2}>
              {name}
            </Chip>
          </div>
        ))}
      </ChipWrapper>
      <QuestionText>MBTI</QuestionText>

      {/* 추가적으로 나중에 밑쪽 화살표 추가하기 */}
      <Select>
        <option value="" hidden>
          MBTI를 선택해주세요
        </option>
        <option value="ISTJ">ISTJ</option>
        <option value="ISFJ">ISFJ</option>
        <option value="INFJ">INFJ</option>
        <option value="INTJ">INTJ</option>
        <option value="ISTP">ISTP</option>
        <option value="ISFP">ISFP</option>
        <option value="INFP">INFP</option>
        <option value="INTP">INTP</option>
        <option value="ESTP">ESTP</option>
        <option value="ESFP">ESFP</option>
        <option value="ENFP">ENFP</option>
        <option value="ENTP">ENTP</option>
        <option value="ESTJ">ESTJ</option>
        <option value="ESFJ">ESFJ</option>
        <option value="ENFJ">ENFJ</option>
        <option value="ENTJ">ENTJ</option>
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
  background: ${({ theme }) => theme.palette.background.base};
  border: 1px solid ${({ theme }) => theme.palette.border.base};
  border-radius: 100px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  :hover {
    background: ${({ theme }) => theme.palette.main.light};
    color: ${({ theme }) => theme.palette.main.darkest};
  }
`;

const InvisibleInput = styled.input`
  width: 0;
  height: 0;
  position: absolute;
  left: -9999px;

  &[type="radio"]:checked + label {
    background: ${({ theme }) => theme.palette.main.light};
    color: ${({ theme }) => theme.palette.main.darkest};
    border: 1px solid ${({ theme }) => theme.palette.point.purple};
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
`;

export default TargetSection;
