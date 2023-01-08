import Template from "@chooz/ui/components/Template";
import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { transitions } from "@chooz/ui";
import { postVoteRequest } from "lib/api/vote";
import { Camera } from "public/images";

interface Props {
  vote: postVoteRequest;
  onChangeVote(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void;
  onUploadImage(e: React.ChangeEvent<HTMLInputElement>): void;
  onChangePostStep(step: number): void;
}

function ImageTitleSection({ onChangeVote, onUploadImage, vote, onChangePostStep }: Props) {
  const [step, setStep] = useState(1);

  const onNextStep = () => {
    if (step === 1) setStep((prev) => prev + 1);
    if (step === 2) onChangePostStep(2);
    return;
  };

  const { title, titleA, titleB, imageA, imageB } = vote;
  return (
    <Template nextButtonText="다음" nextButtonProps={{ onClick: onNextStep }}>
      <Container>
        {step === 2 && (
          <DetailBox>
            <QuestionText> 질문을 입력해주세요.(선택)</QuestionText>
            <DetailInput
              placeholder="질문을 입력해주세요"
              onChange={onChangeVote}
              name="title"
              value={title}
            />
          </DetailBox>
        )}
        <QuestionText>선택지를 입력해주세요.</QuestionText>
        {!imageA && !imageB && <SubText>사진은 필수는 아니지만 선택받을 확률이 높아져요!</SubText>}

        <label htmlFor="file">
          {!imageA && !imageB ? (
            <ImageWrapper>
              <ImageCircle>
                <Image src={Camera} alt="이미지 공간" width={32} />
              </ImageCircle>
            </ImageWrapper>
          ) : (
            <VoteImageWrapper>
              {imageA && <Image src={imageA} alt="A이미지" width={272} height={290} />}
              {imageA && <Image src={imageB} alt="B이미지" width={272} height={290} />}
            </VoteImageWrapper>
          )}

          <InvisibleInput multiple type="file" id="file" onChange={onUploadImage} />
        </label>
        <VoteWrapper>
          <InputBox>
            <VoteCircle>A</VoteCircle>
            <VoteInput
              placeholder="A선택지를 입력해주세요"
              onChange={onChangeVote}
              name="titleA"
              value={titleA}
            />
          </InputBox>
          <InputBox>
            <VoteCircle>B</VoteCircle>
            <VoteInput
              placeholder="B선택지를 입력해주세요"
              onChange={onChangeVote}
              name="titleB"
              value={titleB}
            />
          </InputBox>
        </VoteWrapper>
      </Container>
    </Template>
  );
}

const Container = styled.div`
  animation: ${transitions.fadeIn} 0.9s ease-in-out;
`;

const QuestionText = styled.div`
  font-size: 20px;
  font-weight: 700;
  padding-bottom: 4px;
`;

const SubText = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.palette.border.dark};
`;

const InvisibleInput = styled.input`
  display: none;
`;

const ImageWrapper = styled.div`
  margin-top: 32px;
  width: 100%;
  height: 290px;
  background: ${({ theme }) => theme.palette.background.dark};
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const VoteImageWrapper = styled(ImageWrapper)`
  background: ${({ theme }) => theme.palette.background.lightest};
  justify-content: space-between;
`;

const ImageCircle = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.palette.background.lightest};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VoteWrapper = styled.div`
  padding-top: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;

const VoteCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.palette.border.darker};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.palette.background.lightest};
  font-size: 16px;
  font-weight: 700;
`;

const VoteInput = styled.input`
  padding: 4px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.border.base};
  ::placeholder {
    color: ${({ theme }) => theme.palette.ink.lightest};
  }
`;

const InputBox = styled.div`
  display: flex;
  gap: 12px;
`;

const DetailInput = styled.textarea`
  padding: 14px 16px;
  width: 100%;
  height: 72px;
  border: 1px solid ${({ theme }) => theme.palette.border.base};
  border-radius: 8px;
  resize: none;
  margin: 24px 0 30px 0;
`;

const DetailBox = styled.div`
  animation: ${transitions.popInFromBottom} 0.7s ease-in-out;
`;
export default React.memo(ImageTitleSection);
