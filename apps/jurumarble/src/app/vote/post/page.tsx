"use client";

import ImageUploadButton from "components/ImageUploadButton";
import styled, { css } from "styled-components";
import DrinkSearchModal from "./components/DrinkSearchModal";
import { useToggle } from "@monorepo/hooks";
import { Button, Input } from "components/index";
import VoteHeader from "components/VoteHeader";
import SvgIcPrevious from "src/assets/icons/components/IcPrevious";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import Image from "next/image";
import { EmptyAImg } from "public/images";
import usePostVoteService from "./services/usePostVoteService";
import TitleAndDescriptionSection from "./components/TitleAndDescriptionSection";
import PostBottomSheet from "./components/PostBottomSheet";

const STEP_ONE = 1;
const STEP_TWO = 2;

function PostPage() {
  const [isDrinkSearchModal, onToggleDrinkSearchModal] = useToggle();
  const router = useRouter();

  const [postStep, setPostStep] = useState<number>(STEP_ONE);
  const onChangePostStep = () => {
    setPostStep((prev) => prev + 1);
  };

  const { onChangeVoteText, postVoteInfo, onUploadImage, mutateVote } = usePostVoteService();

  const isCompleted = useMemo(() => {
    return !postVoteInfo.titleA || !postVoteInfo.titleB;
  }, [postVoteInfo]);

  const { title, titleA, titleB, imageA, imageB } = postVoteInfo;

  return (
    <Container>
      <VoteHeader
        leftButton={
          <PreviousButton onClick={() => router.back()}>
            <SvgIcPrevious width={24} height={24} />
          </PreviousButton>
        }
      >
        등록하기
      </VoteHeader>
      <GuideText>고민되는 술을 선택해주세요</GuideText>
      <SubText>안내문구 안내문구 영역입니다. 안내문구 영역</SubText>
      <label htmlFor="file">
        {!imageA && !imageB ? (
          <ImageUploadButtonWrapper>
            <ImageUploadButton width="100%" height="163px" />
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
            <Image
              src={imageB || EmptyAImg}
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
      <VoteOptionText>
        <InputBox>
          <ABInput
            width="100%"
            placeholder="선택지 A 입력"
            name="titleA"
            maxLength={22}
            value={titleA}
            onChange={onChangeVoteText}
          />
        </InputBox>
        <InputBox>
          <ABInput
            width="100%"
            placeholder="선택지 B 입력"
            name="titleB"
            maxLength={22}
            value={titleB}
            onChange={onChangeVoteText}
          />
        </InputBox>
      </VoteOptionText>
      {postStep === STEP_TWO && (
        <TitleAndDescriptionSection
          title={title}
          onChangeVoteText={onChangeVoteText}
          isCompleted={isCompleted}
        />
      )}
      {postStep === STEP_ONE && (
        <PostBottomSheet
          onToggleDrinkSearchModal={onToggleDrinkSearchModal}
          onChangePostStep={onChangePostStep}
        />
      )}
      {isDrinkSearchModal && (
        <DrinkSearchModal onToggleDrinkSearchModal={onToggleDrinkSearchModal} />
      )}
    </Container>
  );
}

const Container = styled.div`
  padding: 0 20px;
`;

const PreviousButton = styled(Button)`
  ${({ theme }) => css`
    background-color: ${theme.colors.white};
  `}
`;

const GuideText = styled.div`
  ${({ theme }) =>
    css`
      ${theme.typography.body01}
      color: ${theme.colors.black_02};
      margin-top: 24px;
    `}
`;

const SubText = styled.div`
  ${({ theme }) =>
    css`
      ${theme.typography.body03}
      color: ${theme.colors.black_03};
      margin-top: 8px;
    `}
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
  background: ${({ theme }) => theme.colors.black_05};
  border-radius: 8px;
  display: flex;
  align-items: center;
  height: 290px;
  position: relative;
  justify-content: space-between;
  cursor: pointer;
`;

const VoteOptionText = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;

const ABInput = styled(Input)`
  ${({ theme }) =>
    css`
      ${theme.typography.body_long03}
      color: ${theme.colors.black_04};
      border-bottom: 1px solid ${theme.colors.line_01};
    `}
`;

const InputBox = styled.div`
  display: flex;
  gap: 12px;
  flex: 0.5;
`;

export default PostPage;
