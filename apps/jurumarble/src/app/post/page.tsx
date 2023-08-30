"use client";

import ImageUploadButton from "components/ImageUploadButton";
import styled, { css } from "styled-components";
import DrinkSearchModal from "./components/DrinkSearchModal";
import { useToggle } from "@monorepo/hooks";
import { Button, Input } from "components/index";
import VoteHeader from "components/VoteHeader";
import SvgIcPrevious from "src/assets/icons/components/IcPrevious";
import { useRouter } from "next/navigation";

function PostPage() {
  const [isDrinkSearchModal, onToggleDrinkSearchModal] = useToggle();
  const router = useRouter();
  return (
    <>
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
          <ImageUploadButtonWrapper>
            <ImageUploadButton width="100%" height="163px" />
          </ImageUploadButtonWrapper>
          <ImageUploadInput multiple type="file" id="file" />
        </label>
        <VoteOptionText>
          <InputBox>
            <ABInput width="100%" placeholder="선택지 A 입력" name="titleA" maxLength={22} />
          </InputBox>
          <InputBox>
            <ABInput width="100%" placeholder="선택지 B 입력" name="titleB" maxLength={22} />
          </InputBox>
        </VoteOptionText>
      </Container>
      <BottomSheet>
        <ButtonStyled
          width="100%"
          height="100%"
          variant="primary"
          onClick={onToggleDrinkSearchModal}
        >
          술 검색하기
        </ButtonStyled>
        <ButtonStyled width="100%" height="100%" variant="outline">
          직접 등록하기
        </ButtonStyled>
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

const ButtonStyled = styled(Button)`
  ${({ theme }) =>
    css`
      ${theme.typography.body01}
    `}
`;

const BottomSheet = styled.div`
  ${({ theme }) =>
    css`
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 20px;
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 160px;
      max-width: 720px;
      border-radius: 16px 16px 0px 0px;
      box-shadow: 0px 0px 32px 0px ${theme.colors.modal_shadow};
    `}
`;

export default PostPage;
