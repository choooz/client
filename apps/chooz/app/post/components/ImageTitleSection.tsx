import styled from "styled-components";
import Image from "next/image";
import { Input, Template, transitions } from "@monorepo/ui";
import { PostVoteRequest } from "lib/apis/vote";
import { EmptyAImg, EmptyBImg } from "public/images";
import { media } from "@monorepo/ui/styles/media";
import { FIRST_STEP, NEXT, SECOND_STEP } from "lib/constants";
import React, { useMemo, useState } from "react";
import ImageUploadButton from "components/ImageUploadButton";

interface Props {
  vote: PostVoteRequest;
  onChangeVote(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void;
  onUploadImage(e: React.ChangeEvent<HTMLInputElement>): void;
  onChangePostStep(step: number): void;
}

function ImageTitleSection({ onChangeVote, onUploadImage, vote, onChangePostStep }: Props) {
  const [step, setStep] = useState(1);

  const onNextStep = () => {
    if (step === FIRST_STEP) setStep((prev) => prev + NEXT);
    if (step === SECOND_STEP) onChangePostStep(SECOND_STEP);
    return;
  };

  const IsDisabled = useMemo(() => {
    return !vote.titleA || !vote.titleB;
  }, [vote]);

  const { title, titleA, titleB, imageA, imageB } = vote;
  return (
    <Container>
      <Template
        nextButtonText="다음"
        nextButtonProps={{ onClick: onNextStep, disabled: IsDisabled }}
      >
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
        {step === 1 && !imageA && !imageB && (
          <SubText>사진은 필수는 아니지만 선택받을 확률이 높아져요!</SubText>
        )}

        <label htmlFor="file">
          {!imageA && !imageB ? (
            <ImageUploadButtonWrapper>
              <ImageUploadButton width="100%" height="272px" />
            </ImageUploadButtonWrapper>
          ) : (
            <VoteImageWrapper>
              <Image
                src={imageA || EmptyAImg}
                alt="A이미지"
                width={272}
                height={272}
                style={{
                  objectFit: "cover",
                  width: "50%",
                  height: "auto",
                }}
              />
              <VSIcon>VS</VSIcon>
              <Image
                src={imageB || EmptyBImg}
                alt="B이미지"
                width={272}
                height={272}
                style={{
                  objectFit: "cover",
                  width: "50%",
                  height: "auto",
                }}
              />
            </VoteImageWrapper>
          )}
          <ImageUploadInput multiple type="file" id="file" onChange={onUploadImage} />
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
              maxLength={22}
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
              maxLength={22}
            />
          </InputBox>
        </VoteWrapper>
      </Template>
      <ButtonSpace />
    </Container>
  );
}

const Container = styled.div`
  animation: ${transitions.fadeIn} 0.9s ease-in-out;
`;

const QuestionText = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

const SubText = styled.div`
  margin-top: 8px;
  font-size: 16px;
  color: ${({ theme }) => theme.palette.ink.dark};
`;

const ImageUploadInput = styled.input`
  display: none;
`;

const ImageUploadButtonWrapper = styled.div`
  margin-top: 16px;
`;

const VoteImageWrapper = styled.div`
  gap: 12px;
  overflow: hidden;
  margin-top: 16px;
  width: 100%;
  background: ${({ theme }) => theme.palette.background.hard};
  border-radius: 8px;
  display: flex;
  align-items: center;
  height: 290px;
  position: relative;
  background: ${({ theme }) => theme.palette.background.white};
  justify-content: space-between;
  cursor: pointer;
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
  height: 50px;
  border: 1px solid ${({ theme }) => theme.palette.border.base};
  border-radius: 8px;
  resize: none;
  margin: 16px 0 30px 0;
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
const ButtonSpace = styled.div`
  width: 100%;
  height: 56px;
  margin-bottom: 30px;
`;
export default React.memo(ImageTitleSection);
