'use client';

import { useMemo } from 'react';

import { media } from '@monorepo/ui/styles/media';
import TitleAndDescriptionSection from 'app/vote/post/components/TitleAndDescriptionSection';
import AorBMark from 'components/AorBMark';
import { Input } from 'components/index';
import Image from 'next/image';
import { DrinkImage } from 'public/images';
import styled, { css } from 'styled-components';

import useUpdateVoteForm from '../hook/useUpdataVoteForm';

function UpdateVoteContainer() {
  const { onChangeVoteText, postVoteInfo, onClickPostVoteComplete } =
    useUpdateVoteForm();

  const isCompleted = useMemo(() => {
    return !postVoteInfo.titleA || !postVoteInfo.titleB;
  }, [postVoteInfo]);

  const { title, detail, titleA, titleB, imageA, imageB } = postVoteInfo;

  return (
    <Container>
      <FlexBetween>
        <div>
          <GuideText>
            수정하실 제목과 <Br /> 내용을 등록해주세요.
          </GuideText>
          <SubText>등록된 후보는 수정할 수 없어요.</SubText>
        </div>
      </FlexBetween>
      <ImageSection>
        <ImageContainer>
          <ImageWrapper>
            <Image
              src={imageA || DrinkImage}
              alt="A이미지"
              fill
              style={{
                objectFit: 'cover',
                borderRadius: '10px',
              }}
            />
            <AorBMark AorB="A">A</AorBMark>
          </ImageWrapper>
          <ImageWrapper>
            <Image
              src={imageB || DrinkImage}
              alt="B이미지"
              fill
              style={{
                objectFit: 'cover',
                borderRadius: '10px',
              }}
            />
            <AorBMark AorB="B">B</AorBMark>
          </ImageWrapper>
        </ImageContainer>
      </ImageSection>
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
            disabled
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
            disabled
          />
        </InputBox>
      </VoteOptionText>
      <TitleAndDescriptionSection
        title={title}
        detail={detail}
        onChangeVoteText={onChangeVoteText}
        isCompleted={isCompleted}
        onClickPostVoteComplete={onClickPostVoteComplete}
      />
    </Container>
  );
}

const Container = styled.div`
  padding: 0 20px 20px 20px;
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

const ABInput = styled(Input)<{ AorB: 'A' | 'B' }>`
  ${({ theme, AorB }) =>
    css`
      ${theme.typography.body_long03}
      color: ${theme.colors.black_04};
      border-bottom: 1px solid ${theme.colors.line_01};
      :focus {
        border-bottom: 1px solid
          ${AorB === 'A' ? theme.colors.sub_01 : theme.colors.sub_02};
      }
    `}
`;

const InputBox = styled.div`
  display: flex;
  gap: 12px;
  flex: 0.5;
`;

export default UpdateVoteContainer;
