import { RegisterTemplate, transitions } from "@chooz/ui";
import { Arm } from "public/images";
import { media } from "@chooz/ui/styles/media";
import Image from "next/image";
import React, { useState } from "react";
import styled from "styled-components";

interface Props {
  onAddProgress(number: number): void;
  navigater(): void;
}

const Array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

function AgeSelection({ onAddProgress, navigater }: Props) {
  const [age, setAge] = useState("");

  const onChangeAge = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { innerText } = e.currentTarget;
    if (age.length >= 2) return;
    setAge(age + innerText);
  };

  return (
    <RegisterTemplate
      welcomeText={
        <>
          <Image src={Arm} alt="캐릭터" width={30} />몇 살인가요?
        </>
      }
      question="Lv.3 당신의&nbsp나이는?"
      search="나이"
      nextButtonText="다음"
      nextButtonProps={{
        onClick: navigater,
        disabled: age.length < 1,
      }}
      prevButtonText="이전"
      prevButtonProps={{
        onClick: () => onAddProgress(-1),
      }}
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
          <DeleteNumver onClick={() => setAge("")}>전체 지움</DeleteNumver>
        </NumberBox>
      </Container>
    </RegisterTemplate>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  ${media.medium} {
    justify-content: space-between;
    flex-direction: row;
    align-items: unset;
  }
`;

const StrongText = styled.strong`
  color: ${({ theme }) => theme.palette.point.purple};
`;

const InputBox = styled.div`
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  font-size: 28px;
  font-weight: 700;
  ${media.medium} {
    height: 80px;
    font-size: 50px;
    gap: 12px;
  }
`;

const Input = styled.input`
  padding: 10px;
  width: 105px;
  height: 56px;
  border: 1px solid ${({ theme }) => theme.palette.border.base};
  border-radius: 4px;
  animation: ${transitions.fadeIn} 1.5s normal ease-in-out;
  color: #863dff;
  ::placeholder {
    color: ${({ theme }) => theme.palette.ink.lightest};
  }
  ${media.medium} {
    width: 152px;
    height: 80px;
  }
`;

const NumberBox = styled.div`
  width: auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 9px;
  place-items: center;
  ${media.medium} {
    gap: 12px;
  }
`;

const NumberDiv = styled.button`
  font-family: NeoDunggeunmo, Pretendard Variable, -apple-system, BlinkMacSystemFont, system-ui,
    Roboto, "Helvetica Neue";
  display: flex;
  justify-content: center;
  font-size: 20px;
  align-items: center;
  width: 48px;
  height: 48px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.palette.border.base};
  background: ${({ theme }) => theme.palette.background.base};
  ${media.medium} {
    width: 70px;
    height: 70px;
    font-size: 28px;
  }
  :active {
    border: 1px solid ${({ theme }) => theme.palette.point.purple};
    background-color: ${({ theme }) => theme.palette.main.light};
  }
`;

const DeleteNumver = styled(NumberDiv)`
  font-size: 14px;
  width: 105px;
  grid-column: span 2;
  ${media.medium} {
    font-size: 24px;
    width: 152px;
  }
`;
export default AgeSelection;
