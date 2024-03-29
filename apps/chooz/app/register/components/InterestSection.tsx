import { Button, transitions } from "@monorepo/ui";
import Image from "next/image";
import React from "react";
import styled, { css } from "styled-components";
import { media } from "@monorepo/ui/styles/media";
import { CheckRound } from "public/images";
import { CategoryNameType, IMAGE_CATEGORY_LIST } from "types/vote";

interface Props {
  categoryList: CategoryNameType[];
  onClickCategory: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClickComplete: () => void;
}

function InterestSection({ categoryList, onClickCategory, onClickComplete }: Props) {
  return (
    <>
      <WelcomeText>Chooz에 오신 것을 환영합니다!</WelcomeText>
      <DescriptionText>
        좋아하는 관심사를 선택해주세요.
        <br /> 선택사항이니 부담갖지 않아도 돼요.
      </DescriptionText>
      <VoteBox>
        {IMAGE_CATEGORY_LIST.map(({ image, value, label }) => (
          <Vote
            width="48%"
            height="100%"
            borderRadius="10px"
            key={value}
            selected={categoryList.includes(value)}
            onClick={onClickCategory}
            name={value}
          >
            <Image alt="항목" src={image} height={32} />
            <VoteText>
              {categoryList.includes(value) && (
                <CheckBoxWrapper>
                  <Image alt="선택" src={CheckRound} width={16} />
                </CheckBoxWrapper>
              )}
              {label}
            </VoteText>
          </Vote>
        ))}
      </VoteBox>
      <ButtonWrapper>
        <CompleteButton variant="primary" width="100%" height="56px" onClick={onClickComplete}>
          완료
        </CompleteButton>
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
  color: ${({ theme }) => theme.palette.ink.base};
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

const Vote = styled(Button)<{ selected: boolean }>`
  position: relative;
  background-color: ${({ theme }) => theme.palette.background.soft};
  border: 1px solid ${({ theme }) => theme.palette.border.base};
  margin-bottom: 14px;
  flex-direction: column;
  gap: 8px;
  font-weight: 400;
  ${({ theme }) => theme.textStyle.Title_Small};
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

const CompleteButton = styled(Button)`
  animation: ${transitions.delaypopInFromBottom} 1.5s normal ease-in-out;
`;

const CheckBoxWrapper = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
`;
export default InterestSection;
