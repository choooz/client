import { RegisterTemplate, transitions } from "@chooz/ui";
import { Arm } from "public/images";
import Image from "next/image";
import React, { useState } from "react";
import styled from "styled-components";

interface Props {
  onAddProgress(number: number): void;
  navigater(): void;
}

const Array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const AgeSelection = ({ onAddProgress, navigater }: Props) => {
  const [age, setAge] = useState("");

  const onChangeAge = (e: React.MouseEvent<HTMLDivElement>) => {
    const { innerText } = e.currentTarget;
    if (innerText === "전체 지움") {
      setAge("");
      return;
    }
    setAge(age + innerText);
  };
  return (
    <RegisterTemplate
      welcomeText={
        <>
          <Image src={Arm} alt="캐릭터" width={30} />몇 살인가요?
        </>
      }
      questionText={
        <>
          Lv.3 당신의&nbsp;<StrongText>나이</StrongText>는?
        </>
      }
      buttonBox={
        <>
          <Back onClick={() => onAddProgress(-1)}>이전</Back>
          <Button onClick={navigater}>다음</Button>
        </>
      }
    >
      <Container>
        <InputBox>
          <Input type="text" inputMode="none" placeholder="0" defaultValue={age} />세
        </InputBox>
        <NumberBox>
          {Array.map((number) => (
            <NumberDiv key={number} onClick={onChangeAge}>
              {number}
            </NumberDiv>
          ))}
          <DeleteNumver onClick={onChangeAge}>전체 지움</DeleteNumver>
        </NumberBox>
      </Container>
    </RegisterTemplate>
  );
};

const StrongText = styled.strong`
  color: ${({ theme }) => theme.palette.point.purple};
`;

const Back = styled.button`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.ink.lightest};
  height: 56px;
  width: 24%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${transitions.delaypopInFromBottom} 1.5s normal ease-in-out;
`;

const Button = styled.button`
  width: 76%;
  height: 56px;
  background-color: ${({ theme }) => theme.palette.point.purple};
  color: white;
  border-radius: 4px;
  animation: ${transitions.delaypopInFromBottom} 1.5s normal ease-in-out;
  font-weight: 700;
  transition: all 0.3s ease-in-out;
  :disabled {
    background-color: ${({ theme }) => theme.palette.border.base};
    color: ${({ theme }) => theme.palette.ink.lightest};
  }
`;

const InputBox = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 50px;
  font-weight: 700;
`;

const Input = styled.input`
  padding: 10px;
  width: 152px;
  height: 80px;
  border: 1px solid ${({ theme }) => theme.palette.border.base};
  border-radius: 4px;
  animation: ${transitions.fadeIn} 1.5s normal ease-in-out;
  color: #863dff;
  ::placeholder {
    color: ${({ theme }) => theme.palette.ink.lightest};
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NumberBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`;

const NumberDiv = styled.div`
  font-family: NeoDunggeunmo, Pretendard Variable, -apple-system, BlinkMacSystemFont, system-ui,
    Roboto, "Helvetica Neue";
  display: flex;
  justify-content: center;
  font-size: 28px;
  align-items: center;
  width: 70px;
  height: 70px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.palette.border.base};
  background: ${({ theme }) => theme.palette.background.base};
`;

const DeleteNumver = styled(NumberDiv)`
  font-size: 24px;
  width: 152px;
  grid-column: span 2;
`;
export default AgeSelection;
