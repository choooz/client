"use client";

import ImageUploadButton from "components/ImageUploadButton";
import SvgIcPrev from "src/assets/icons/components/IcPrev";
import styled, { css } from "styled-components";
import DrinkSearchModal from "./components/DrinkSearchModal";
import { useToggle } from "@monorepo/hooks";
import { Button } from "components/index";

function PostPage() {
  const [isDrinkSearchModal, onToggleDrinkSearchModal] = useToggle(false);
  return (
    <>
      <DetailHeader>
        <PreviousButton>
          <SvgIcPrev width={24} height={24} />
        </PreviousButton>
        등록하기
        <EmptySpace />
      </DetailHeader>
      <Container>
        <GuideText>고민되는 술을 선택해주세요</GuideText>
        <SubText>안내문구 안내문구 영역입니다. 안내문구 영역</SubText>
        <label htmlFor="file">
          <ImageUploadButtonWrapper>
            <ImageUploadButton width="100%" height="163px" />
          </ImageUploadButtonWrapper>
          <ImageUploadInput multiple type="file" id="file" />
        </label>
        <VoteOptionText>
          <InputBox>
            <input width="100%" placeholder="선택지1을 입력" name="titleA" maxLength={22} />
          </InputBox>
          <InputBox>
            <input width="100%" placeholder="선택지2를 입력" name="titleB" maxLength={22} />
          </InputBox>
        </VoteOptionText>
      </Container>
      <BottomSheet>
        <button>술 검색하기</button>
        <button>직접 등록하기</button>
      </BottomSheet>
      {isDrinkSearchModal && (
        <DrinkSearchModal onToggleDrinkSearchModal={onToggleDrinkSearchModal} />
      )}
    </>
  );
}

const Container = styled.div`
  padding: 0 20px;
`;

const DetailHeader = styled.header`
  ${({ theme }) =>
    css`
      ${theme.typography.headline03}
      color: ${theme.colors.black_01};
      display: flex;
      align-items: center;
      justify-content: center;
      height: 48px;
    `}
`;

const PreviousButton = styled.button`
  margin-left: 12px;
`;

const EmptySpace = styled.div`
  width: 24px;
  height: 24px;
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

const VoteOptionText = styled.div`
  margin-top: 12px;
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

const BottomSheet = styled.div`
  ${({ theme }) =>
    css`
      display: flex;
      flex-direction: column;
      align-items: center;
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 160px;
      max-width: 720px;
      border-radius: 16px 16px 0px 0px;
      box-shadow: 0px 0px 32px 0px ${theme.colors.modal};
    `}
`;

export default PostPage;
