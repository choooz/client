"use client";

import { Button, transitions } from "@chooz/ui";
import ImageUploadButton from "components/common/ImageUploadButton";
import MbtiSelect from "components/my/MbtiSelect";
import TabContainer from "components/my/TabContainer";
import { useGetUserInfo } from "hooks/useGetUserInfo";
import { uploadProfileImageAPI } from "lib/apis/upload";
import { updateUserInfo } from "lib/apis/user";
import { PostVote } from "lib/apis/vote";
import { IMAGE_CATEGORY_LIST, PROFILE_EDIT_PAGE_TAB_LIST } from "lib/constants";
import Image from "next/image";
import { CheckRound } from "public/images";
import React, { useCallback, useState } from "react";
import useRegisterService from "services/useRegisterService";
import styled, { css } from "styled-components";
import { media } from "styles/media";
import { Gender } from "types/user";

function ProfileEditPage() {
  const [selectedTab, setSelectedTab] = useState("profile_modify");

  const onClickSelectedTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedTab(e.currentTarget.value);
  };

  const { categoryLists, onClickCategory } = useRegisterService();

  return (
    <PageContainer>
      <TabContainer
        tabList={PROFILE_EDIT_PAGE_TAB_LIST}
        selectedTab={selectedTab}
        onClickSelectedTab={onClickSelectedTab}
      />
      <PageInner>
        <FlexSpaceBetween>
          <label htmlFor="file">
            <ImageUploadButton width="107px" height="107px" />
          </label>
          <WithdrawalButton>회원 탈퇴</WithdrawalButton>
        </FlexSpaceBetween>
        <UserInfoTitle>닉네임</UserInfoTitle>
        <NicknameInput type="text" value="목욕하는 리트리버" />
        <UserInfoTitle>성별 및 나이</UserInfoTitle>
        <FlexSpaceBetween>
          <GenderAndAgeInput type="text" value="남성" disabled />
          <GenderAndAgeInput type="text" value="27세" disabled />
        </FlexSpaceBetween>
        <UserInfoTitle>MBTI</UserInfoTitle>
        <WarningMessage>MBTI 수정시 2개월간 바꿀 수 없습니다.</WarningMessage>
        <UserInfoTitle>카테고리</UserInfoTitle>
        {IMAGE_CATEGORY_LIST.map(({ image, value, label }) => {
          return (
            <>
              <Vote
                width="50%"
                height="104px"
                borderRadius="10px"
                key={value}
                selected={categoryLists.includes(value)}
                onClick={onClickCategory}
                name={value}
              >
                <Image alt="항목" src={image} height={32} />
                <VoteText>
                  {categoryLists.includes(value) && (
                    <CheckBoxWrapper>
                      <Image alt="선택" src={CheckRound} width={16} />
                    </CheckBoxWrapper>
                  )}
                  {label}
                </VoteText>
              </Vote>
            </>
          );
        })}
        <CompleteButton variant="primary" width="100%" height="56px">
          완료
        </CompleteButton>
      </PageInner>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  width: 100%;
  ${({ theme }) => theme.textStyle.Font_Regular};
`;

const PageInner = styled.div`
  position: relative;
  top: -1px;
  margin: 0 auto;
  border-radius: 0 0 4px 4px;
  max-width: 640px;
  overflow-y: scroll;
  /* @Todo 값을 어떻게 설정하는건지 모르겠다. 일단 임의로 설정 */
  height: calc(100vh - 100px);
  padding: 24px 20px 20px 20px;
  ${({ theme }) =>
    css`
      background-color: ${theme.palette.background.white};
    `};
  ${media.medium} {
    padding: 34px 40px;
  }
`;

const FlexSpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;

const WithdrawalButton = styled.button`
  display: contents;
  ${({ theme }) =>
    css`
      color: ${theme.palette.ink.light};
      ${media.medium} {
        ${theme.textStyle.Title_Small}
      }
    `};
`;

const UserInfoTitle = styled.h3`
  font-weight: 700;
  margin: 30px 0 8px;
`;

const NicknameInput = styled.input`
  width: 100%;
  height: 40px;
  margin-bottom: 30px;
  padding: 10px 186px 10px 10px;
  border-radius: 4px;
  border: solid 1px ${({ theme }) => theme.palette.border.base};
`;

const GenderAndAgeInput = styled.input`
  width: 50%;
  height: 40px;
  margin: 0 9px 30px 0;
  padding: 10px 111px 10px 10px;
  border-radius: 4px;
  color: ${({ theme }) => theme.palette.ink.light};
`;

const WarningMessage = styled.div`
  color: ${({ theme }) => theme.palette.system.danger};
  margin-top: 6px;
`;

const Vote = styled(Button)<{ selected: boolean }>`
  position: relative;
  background-color: ${({ theme }) => theme.palette.background.soft};
  border: 1px solid ${({ theme }) => theme.palette.border.base};
  margin: 8px 0 14px 0;
  flex-direction: column;
  gap: 8px;
  font-weight: 400;
  ${({ theme }) => theme.textStyle.Title_Small};
  ${({ selected }) =>
    selected &&
    css`
      animation: ${transitions.blink} 0.7s ease-in-out;
      background-color: ${({ theme }) => theme.palette.background.selected};
      border: 1px solid ${({ theme }) => theme.palette.main.point};
      font-weight: 700;
    `}
`;

const VoteText = styled.div`
  align-items: center;
  display: flex;
  gap: 4px;
`;

const CheckBoxWrapper = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
`;

const CompleteButton = styled(Button)`
  margin-top: 40px;
`;

const InvisibleInput = styled.input`
  display: none;
`;
export default ProfileEditPage;
