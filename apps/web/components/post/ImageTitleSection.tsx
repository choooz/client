import styled from "styled-components";
import Image from "next/image";
import { Input, Template, transitions } from "@chooz/ui";
import { postVoteRequest } from "lib/api/vote";
import { Camera } from "public/images";
import { media } from "@chooz/ui/styles/media";
import React, { useState } from "react";

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
          <TitleBox>
            <QuestionText> 질문을 입력해주세요.(선택)</QuestionText>
            <TitleInput
              placeholder="질문을 입력해주세요"
              onChange={onChangeVote}
              name="title"
              value={title}
            />
          </TitleBox>
        )}
        <QuestionText>선택지를 입력해주세요.</QuestionText>
        {!imageA && !imageB && <SubText>사진은 필수는 아니지만 선택받을 확률이 높아져요!</SubText>}

        <label htmlFor="file">
          {!imageA && !imageB ? (
            <ImageWrapper>
              <ImageCircle>
                <Image src={Camera} alt="이미지 공간" width={32} height={32} />
              </ImageCircle>
            </ImageWrapper>
          ) : (
            <VoteImageWrapper>
              {imageA && (
                <Image
                  src={imageA}
                  alt="A이미지"
                  width={272}
                  height={272}
                  style={{
                    objectFit: "cover",
                    width: "272px",
                    height: "auto",
                  }}
                />
              )}

              <VSIcon>VS</VSIcon>

              {imageA && (
                <Image
                  src={imageB}
                  alt="B이미지"
                  width={272}
                  height={272}
                  style={{
                    objectFit: "cover",
                    width: "272px",
                    height: "auto",
                  }}
                />
              )}
            </VoteImageWrapper>
          )}

          <InvisibleInput multiple type="file" id="file" onChange={onUploadImage} />
        </label>
        <VoteWrapper>
          <InputBox>
            <Input
              width="100%"
              variant="standard"
              placeholder="선택지1을 입력"
              onChange={onChangeVote}
              name="titleA"
              value={titleA}
            />
          </InputBox>
          <InputBox>
            <Input
              width="100%"
              variant="standard"
              placeholder="선택지2를 입력"
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
  gap: 12px;
  overflow: hidden;
  margin-top: 32px;
  width: 100%;
  background: ${({ theme }) => theme.palette.background.hard};
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 290px;
`;

const VoteImageWrapper = styled(ImageWrapper)`
  position: relative;
  background: ${({ theme }) => theme.palette.background.white};
  justify-content: space-between;
  cursor: pointer;
`;

const ImageCircle = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.palette.background.white};
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

const InputBox = styled.div`
  display: flex;
  gap: 12px;
  flex: 0.5;
`;

const TitleInput = styled.textarea`
  padding: 14px 16px;
  width: 100%;
  height: 72px;
  border: 1px solid ${({ theme }) => theme.palette.border.base};
  border-radius: 8px;
  resize: none;
  margin: 24px 0 30px 0;
`;

const TitleBox = styled.div`
  animation: ${transitions.popInFromBottom} 0.7s ease-in-out;
`;

const VSIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: black;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 14px;
  font-weight: 700;
  z-index: 9999;
  width: 32px;
  height: 32px;
  ${media.medium} {
    width: 40px;
    height: 40px;
  }
`;
export default React.memo(ImageTitleSection);
