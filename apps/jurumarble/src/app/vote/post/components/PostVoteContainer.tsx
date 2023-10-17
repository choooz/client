"use client";

import { useMemo } from "react";

import { useToggle } from "@monorepo/hooks";
import AorBMark from "components/AorBMark";
import ImageUploadButton from "components/ImageUploadButton";
import { Button, Input } from "components/index";
import { media } from "lib/styles";
import depths from "lib/styles/depths";
import Image from "next/image";
import { SvgIcX, SvgInfo } from "src/assets/icons/components";
import { DrinkInfoType } from "src/types/drink";
import styled, { css } from "styled-components";

import DrinkSearchModal from "./DrinkSearchModal";
import TitleAndDescriptionSection from "./TitleAndDescriptionSection";
import usePostVoteService from "../services/usePostVoteService";

function PostVoteContainer() {
  const [isDrinkSearchModal, onToggleDrinkSearchModal] = useToggle();
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

  /**
   * @TODO useOutSideClick 적용
   */
  const [isTooltip, onToggleTooltip] = useToggle(true);

  return (
    <Container>
      <FlexBetween>
        <div>
          <GuideText>
            고민하고 계신 후보 2개와 <Br /> 후보 이미지를 등록해주세요.
          </GuideText>
          <SubText>
            후보 이미지는 선택 사항이에요.
            <button onClick={onToggleTooltip}>
              <SvgInfo width={24} height={24} />
            </button>
          </SubText>
          {isTooltip && (
            <Ballon>
              <BalloonText>
                술 검색하기 버튼을 클릭하면 <br />
                우리술을 편하게 등록할 수 있어요.
                <button onClick={onToggleTooltip}>
                  <SvgIcX width={16} height={16} />
                </button>
              </BalloonText>
            </Ballon>
          )}
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
      {!imageA && !imageB ? (
        <label htmlFor="no-image">
          <ImageSection>
            <ImageUploadButton width="100%" height="163px" />
            <ImageUploadInput multiple type="file" id="no-image" onChange={onUploadImage} />
          </ImageSection>
        </label>
      ) : (
        <ImageSection>
          <ImageContainer>
            <ImageWrapper>
              <label htmlFor="image-a">
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
                <ImageUploadButton width="100%" height="100%" />
                <ImageUploadInput multiple type="file" id="image-a" onChange={onUploadImage} />
              </label>
            </ImageWrapper>
            <ImageWrapper>
              <label htmlFor="image-b">
                {imageB && (
                  <Image
                    src={imageB}
                    alt="B이미지"
                    fill
                    style={{
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                )}
                <AorBMark AorB="B">B</AorBMark>
                <ImageUploadButton width="100%" height="100%" />
                <ImageUploadInput multiple type="file" id="image-b" onChange={onUploadImage} />
              </label>
            </ImageWrapper>
          </ImageContainer>
        </ImageSection>
      )}
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
      display: flex;
      align-items: center;
      gap: 4px;
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

const Ballon = styled.div`
  position: relative;
  z-index: ${depths.menu};
`;

const BalloonText = styled.div`
  ${({ theme }) => css`
    ${theme.typography.body_long03}
    color: ${theme.colors.white};
    background-color: ${theme.colors.system_black};
    border-radius: 8px;
    padding: 12px 16px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 4px;
    position: absolute;
    width: 272px;
    margin-top: 6px;
    left: 48px;

    ::after {
      content: "";
      position: absolute;
      border-top: 8px solid transparent;
      border-bottom: 8px solid ${theme.colors.system_black};
      border-right: 6px solid transparent;
      border-left: 6px solid transparent;
      bottom: 100%;
      left: 49%;
    }
  `}
`;

export default PostVoteContainer;
