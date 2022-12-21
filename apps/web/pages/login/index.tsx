import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { Female, Male, PurpleMonster } from "../../assets";
import Header from "../../components/header/Header";
import { palette } from "../../styles/palette";

function LoginPage() {
  return (
    <PageWrapper>
      <WelcomeText>
        <Image src={PurpleMonster} alt="캐릭터" width={30} />
        반가워요!
      </WelcomeText>
      <QuestionText>Lv.1 당신의 성별은? _</QuestionText>
      <VoteBox>
        <Vote>
          <ImageWrapper>
            <Image src={Male} alt="남성" height={100} />
          </ImageWrapper>
          <div>남성</div>
        </Vote>
        <Vote>
          <ImageWrapper>
            <Image src={Female} alt="여성" height={100} />
          </ImageWrapper>
          여성
        </Vote>
      </VoteBox>
      <ButtonWrapper>
        <Button>다음</Button>
      </ButtonWrapper>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  width: 100%;
  border-radius: 4px;
  background-color: white;
  height: 558px;
  padding: 30px;
  position: relative;
`;

const WelcomeText = styled.div`
  display: flex;
  font-size: 18px;
  font-weight: 700;
  color: ${palette.ink.light};
  gap: 6px;
  line-height: 26px;
  padding-bottom: 24px;
`;

const QuestionText = styled.div`
  font-size: 28px;
  font-weight: 400;
  font-family: NeoDunggeunmo, Pretendard Variable, -apple-system, BlinkMacSystemFont, system-ui,
    Roboto, "Helvetica Neue";
  padding-bottom: 40px;
`;

const VoteBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const Vote = styled.div`
  width: 48%;
  height: 265px;
  border-radius: 4px;
  background-color: ${palette.border.lighter};
  border: 1px solid ${palette.border.lightest};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 18px;
`;

const ImageWrapper = styled.div`
  flex: 0.8;
  display: flex;
  align-items: center;
`;

const ButtonWrapper = styled.div`
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
  background-color: #5f0e8f;
  color: white;
  border-radius: 4px;
`;
export default LoginPage;
