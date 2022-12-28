import { transitions } from "@chooz/ui";
import { CheckRound, Chick } from "assets/images";
import Image from "next/image";
import React from "react";
import styled, { css } from "styled-components";
import { media } from "styles/media";

function InterestSection() {
  return (
    <>
      <QuestionText>
        파인애플짱 님,
        <br />
        Chooz에 오신 것을 환영합니다!
      </QuestionText>
      <DescriptionText>
        좋아하는 관심사를 선택해주세요.
        <br /> 선택사항이니 부담갖지 않아도 돼요.
      </DescriptionText>
      <VoteBox>
        <Vote>
          <Image alt="항목" src={Chick} height={32} />
          항목1
        </Vote>
        <Vote selected={true}>
          <Image alt="항목" src={Chick} height={32} />
          <VoteText>
            <Image alt="선택" src={CheckRound} width={16} />
            항목 1
          </VoteText>
        </Vote>
        <Vote selected={true}>
          <Image alt="항목" src={Chick} height={32} />
          <VoteText>
            <Image alt="선택" src={CheckRound} width={16} />
            항목 1
          </VoteText>
        </Vote>
        <Vote>
          <Image alt="항목" src={Chick} height={32} />
          항목1
        </Vote>
        <Vote>
          <Image alt="항목" src={Chick} height={32} />
          항목1
        </Vote>
        <Vote>
          <Image alt="항목" src={Chick} height={32} />
          항목1
        </Vote>
      </VoteBox>
      <ButtonWrapper>
        <Button>완료</Button>
      </ButtonWrapper>
    </>
  );
}

const QuestionText = styled.div`
  display: flex;
  font-size: 28px;
  font-weight: 400;
  font-family: NeoDunggeunmo, Pretendard Variable, -apple-system, BlinkMacSystemFont, system-ui,
    Roboto, "Helvetica Neue";
  padding-bottom: 16px;
  animation: ${transitions.delaypopInFromBottom} 0.7s ease-in-out;
`;

const DescriptionText = styled.div`
  line-height: 24px;
  font-size: 18px;
  color: ${({ theme }) => theme.palette.ink.light};
  animation: ${transitions.delaypopInFromBottom} 0.9s ease-in-out;
  padding-bottom: 32px;
`;

const VoteBox = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  animation: ${transitions.delaypopInFromBottom} 1.3s normal ease-in-out;
  height: 104px;
  ${media.medium} {
    height: 116px;
  }
`;

const Vote = styled.div<{ selected?: boolean }>`
  width: 48%;
  height: 100%;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.palette.background_color.dark};
  border: 1px solid ${({ theme }) => theme.palette.border_color.base};
  margin-bottom: 14px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 400;
  ${({ selected }) =>
    selected &&
    css`
      animation: ${transitions.blink} 0.7s ease-in-out;
      background-color: rgba(140, 130, 255, 50%);
      font-weight: 700;
      border: 1px solid ${({ theme }) => theme.palette.point_color.point_color_3};
    `}
`;

const VoteText = styled.div`
  align-items: center;
  display: flex;
  gap: 4px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  position: absolute;
  bottom: 30px;
  width: 100%;
  padding: 0 30px;
  left: 50%;
  transform: translateX(-50%);
`;

const Button = styled.button`
  width: 100%;
  height: 56px;
  background-color: #863dff;
  color: white;
  border-radius: 4px;
  animation: ${transitions.delaypopInFromBottom} 1.5s normal ease-in-out;
  font-weight: 700;
  transition: all 0.3s ease-in-out;
  :disabled {
    background-color: #e5e5ec;
    color: #999999;
  }
`;
export default InterestSection;
