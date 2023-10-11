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
import TitleAndDescriptionSection from "./TitleAndDescriptionSection";
import DrinkSearchModal from "./DrinkSearchModal";
import usePostVoteService from "../services/usePostVoteService";
import { DrinkInfoType } from "src/types/vote";
import AorBMark from "components/AorBMark";
import { media } from "lib/styles";

function PostVoteContainer() {
  const [isDrinkSearchModal, onToggleDrinkSearchModal] = useToggle();
  const router = useRouter();

  const {
    onChangeVoteText,
    postVoteInfo,
    onUploadImage,
    onClickPostVoteComplete,
    updatePostVoteInfo,
  } = usePostVoteService();

  const isCompleted = useMemo(() => {
    return !postVoteInfo.titleA || !postVoteInfo.titleB;
  }, [postVoteInfo]);

  const onClickSearchDrinkComplete = (selectedDrinkList: DrinkInfoType[]) => {
    onToggleDrinkSearchModal();
    updatePostVoteInfo(selectedDrinkList);
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
        등록하기
      </VoteHeader>
      <FlexBetween>
        <div>
          <GuideText>
            고민하고 계신 후보 2개와 <Br /> 후보 이미지를 등록해주세요.
          </GuideText>
          <SubText>후보 이미지는 선택 사항이에요.</SubText>
        </div>
        <ButtonStyled
          width="96px"
          height="40px"
          variant="primary"
          onClick={onToggleDrinkSearchModal}
        >
          술 검색하기
        </ButtonStyled>
      </FlexBetween>
      <label htmlFor="file">
        <ImageSection>
          {!imageA && !imageB ? (
            <ImageUploadButton width="100%" height="163px" />
          ) : (
            <ImageContainer>
              <ImageWrapper>
                <Image
                  src={imageA}
                  alt="A이미지"
                  fill
                  style={{
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
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
                  <ImageUploadButton width="100%" height="100%" />
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
            placeholder="후보 A 입력"
            name="titleA"
            maxLength={22}
            value={titleA}
            onChange={onChangeVoteText}
            AorB="A"
          />
        </InputBox>
        <InputBox>
          <ABInput
            width="100%"
            placeholder="후보 B 입력"
            name="titleB"
            maxLength={22}
            value={titleB}
            onChange={onChangeVoteText}
            AorB="B"
          />
        </InputBox>
      </VoteOptionText>
      {postVoteInfo.titleA && postVoteInfo.titleB && (
        <TitleAndDescriptionSection
          title={title}
          detail={detail}
          onChangeVoteText={onChangeVoteText}
          isCompleted={isCompleted}
          onClickPostVoteComplete={onClickPostVoteComplete}
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

const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
`;

const GuideText = styled.div`
  ${({ theme }) =>
    css`
      ${theme.typography.body01}
      color: ${theme.colors.black_02};
    `}
`;

const Br = styled.br`
  ${media.medium} {
    display: none;
  }
`;

const SubText = styled.div`
  ${({ theme }) =>
    css`
      ${theme.typography.body03}
      color: ${theme.colors.black_03};
      margin-top: 11px;
    `}
`;

const ButtonStyled = styled(Button)`
  ${({ theme }) =>
    css`
      ${theme.typography.button01}
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

const VoteOptionText = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;

const ABInput = styled(Input)<{ AorB: "A" | "B" }>`
  ${({ theme, AorB }) =>
    css`
      ${theme.typography.body_long03}
      color: ${theme.colors.black_04};
      border-bottom: 1px solid ${theme.colors.line_01};
      :focus {
        border-bottom: 1px solid ${AorB === "A" ? theme.colors.sub_01 : theme.colors.sub_02};
      }
    `}
`;

const InputBox = styled.div`
  display: flex;
  gap: 12px;
  flex: 0.5;
`;

export default PostVoteContainer;
