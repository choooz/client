"use client";

import ImageUploadButton from "components/ImageUploadButton";
import styled, { css } from "styled-components";
import { useToggle } from "@monorepo/hooks";
import { Button, Input } from "components/index";
import VoteHeader from "components/VoteHeader";
import SvgIcPrevious from "src/assets/icons/components/IcPrevious";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import Image from "next/image";

import { DrinkInfoType } from "src/types/vote";
import AorBMark from "components/AorBMark";

import TitleAndDescriptionSection from "app/vote/post/components/TitleAndDescriptionSection";
import PostBottomSheet from "app/vote/post/components/PostBottomSheet";
import DrinkSearchModal from "app/vote/post/components/DrinkSearchModal";
import useUpdateVoteForm from "../hook/useUpdataVoteForm";

const STEP_ONE = 1;
const STEP_TWO = 2;

function UpdateVoteContainer() {
  const [isDrinkSearchModal, onToggleDrinkSearchModal] = useToggle();
  const router = useRouter();

  const [postStep, setPostStep] = useState<number>(STEP_ONE);
  const onChangePostStep = () => {
    setPostStep((prev) => prev + 1);
  };

  const {
    onChangeVoteText,
    postVoteInfo,
    onUploadImage,
    onClickPostVoteComplete,
    updatePostVoteInfo,
  } = useUpdateVoteForm();

  const isCompleted = useMemo(() => {
    return !postVoteInfo.titleA || !postVoteInfo.titleB;
  }, [postVoteInfo]);

  const onClickSearchDrinkComplete = (selectedDrinkList: DrinkInfoType[]) => {
    onToggleDrinkSearchModal();
    updatePostVoteInfo(selectedDrinkList);
    onChangePostStep();
  };

  const { title, detail, titleA, titleB, imageA, imageB } = postVoteInfo;

  return (
    <Container>
      <VoteHeader
        leftButton={
          <PreviousButton onClick={() => router.back()}>
            <SvgIcPrevious width={24} height={24} />
          </PreviousButton>
        }
      >
        수정하기
      </VoteHeader>
      <GuideText>고민되는 술을 선택해주세요</GuideText>
      <SubText>안내문구 안내문구 영역입니다. 안내문구 영역</SubText>
      <label htmlFor="file">
        <ImageSection>
          {!imageA && !imageB ? (
            <ImageUploadButton width="100%" height="163px" />
          ) : (
            <ImageContainer>
              <ImageWrapper>
                {imageA ? (
                  <Image
                    src={imageA}
                    alt="A이미지"
                    fill
                    style={{
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                ) : (
                  <ImageBox />
                )}
                <AorBMark AorB="A">A</AorBMark>
              </ImageWrapper>
              <ImageWrapper>
                {imageB ? (
                  <Image
                    src={imageB}
                    alt="B이미지"
                    fill
                    style={{
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                ) : (
                  <ImageBox />
                )}
                <AorBMark AorB="B">B</AorBMark>
              </ImageWrapper>
            </ImageContainer>
          )}
        </ImageSection>
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
          detail={detail}
          onChangeVoteText={onChangeVoteText}
          isCompleted={isCompleted}
          onClickPostVoteComplete={onClickPostVoteComplete}
        />
      )}
      {postStep === STEP_ONE && (
        <PostBottomSheet
          onToggleDrinkSearchModal={onToggleDrinkSearchModal}
          onChangePostStep={onChangePostStep}
        />
      )}
      {isDrinkSearchModal && (
        <DrinkSearchModal
          onToggleDrinkSearchModal={onToggleDrinkSearchModal}
          onClickSearchDrinkComplete={onClickSearchDrinkComplete}
        />
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

const ImageSection = styled.section`
  margin-top: 24px;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  width: 100%;
  gap: 9px;
  display: flex;
`;

const ImageWrapper = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    position: relative;
    width: 50%;
    aspect-ratio: 1;
  `}
`;

const ImageBox = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.black_05};
    border-radius: 10px;
    height: 100%;
  `}
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

export default UpdateVoteContainer;
