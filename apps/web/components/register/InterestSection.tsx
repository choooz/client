import { transitions } from "@chooz/ui";
import Image from "next/image";
import React, { useState } from "react";
import styled, { css } from "styled-components";
import { media } from "styles/media";

import { CheckRound, Chick } from "public/images";

type CategoryNameType =
  | "category1"
  | "category2"
  | "category3"
  | "category4"
  | "category5"
  | "category6";

function InterestSection() {
  // @Note 카테고리 상수화해서 쓰고 싶은데 가능한가?
  const CATEGORY_NAMES: CategoryNameType[] = [
    "category1",
    "category2",
    "category3",
    "category4",
    "category5",
    "category6",
  ];

  const [categorys, setCategorys] = useState({
    category1: false,
    category2: false,
    category3: false,
    category4: false,
    category5: false,
    category6: false,
  });

  // @Todo 타입 지정해주기
  const onClickCategory = (e: any) => {
    const categoryName: CategoryNameType = e.target.dataset.name;
    setCategorys({
      ...categorys,
      [categoryName]: !categorys[categoryName],
    });
  };

  return (
    <>
      <WelcomeText>Chooz에 오신 것을 환영합니다!</WelcomeText>
      <DescriptionText>
        좋아하는 관심사를 선택해주세요.
        <br /> 선택사항이니 부담갖지 않아도 돼요.
      </DescriptionText>
      <VoteBox>
        {CATEGORY_NAMES.map((categoryName: CategoryNameType) => {
          return (
            <Vote
              key={categoryName}
              selected={categorys[categoryName]}
              onClick={onClickCategory}
              data-name={categoryName}
            >
              <Image alt="항목" src={Chick} height={32} />
              <VoteText>
                {categorys[categoryName] && <Image alt="선택" src={CheckRound} width={16} />}
                {categoryName}
              </VoteText>
            </Vote>
          );
        })}
      </VoteBox>
      <ButtonWrapper>
        <Button>완료</Button>
      </ButtonWrapper>
    </>
  );
}

const WelcomeText = styled.div`
  display: flex;
  font-family: NeoDunggeunmo, Pretendard Variable, -apple-system, BlinkMacSystemFont, system-ui,
    Roboto, "Helvetica Neue";
  letter-spacing: -0.5px;
  padding-bottom: 16px;
  animation: ${transitions.delaypopInFromBottom} 0.7s ease-in-out;
  ${({ theme }) => theme.textStyle.Title_Large};
`;

const DescriptionText = styled.div`
  padding-bottom: 32px;
  animation: ${transitions.delaypopInFromBottom} 0.9s ease-in-out;
  color: ${({ theme }) => theme.palette.ink.lighter};
  ${({ theme }) => theme.textStyle.Title_Small};
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
  background-color: ${({ theme }) => theme.palette.background.soft};
  border: 1px solid ${({ theme }) => theme.palette.border.base};
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
      background-color: ${({ theme }) => theme.palette.background.selected};
      border: 1px solid ${({ theme }) => theme.palette.main.point};
      font-weight: 700;
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
    color: ${({ theme }) => theme.palette.ink.lightest};
  }
`;
export default InterestSection;
