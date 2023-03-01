"use client";

import { media } from "@chooz/ui/styles/media";
import VoteList from "components/my/VoteList";
import { MY_PAGE_VOTE_TYPE } from "lib/constants";
import Path from "lib/Path";
import Image from "next/image";
import Link from "next/link";
import { Camera } from "public/images";
import { useState } from "react";
import useInfiniteVoteListService from "services/useInfiniteVoteListService";
import styled, { css } from "styled-components";

function MyPage() {
  const [selectedTab, setSelectedTab] = useState("created");

  const onClickSelectedTab = (e: any) => {
    setSelectedTab(e.target.value);
  };

  const { voteList, subscribe } = useInfiniteVoteListService({
    size: 3,
    sortBy: "ByTime",
  });

  return (
    <PageWrapper>
      <PageInner>
        <ImageWrapper>
          <ImageCircle>
            <Image src={Camera} alt="이미지 공간" width={32} height={32} />
          </ImageCircle>
        </ImageWrapper>
        <FlexColumn>
          <UserInfo>
            여
            <Divider />
            20대
            <Divider />
            INTJ
          </UserInfo>
          <Nickname>목욕하는 리트리버</Nickname>
          <ProfileModifyButton>
            <Link href={Path.PROFILE_EDIT}>프로필 수정</Link>
          </ProfileModifyButton>
        </FlexColumn>
        {/* @TODO api 연결하면 map 사용 */}
        <NumberOfVoteSection>
          <NumberOfVoteContainer>
            <NumberOfVote>134</NumberOfVote>
            <NumberOfVoteText>작성한 투표</NumberOfVoteText>
          </NumberOfVoteContainer>
          <NumberOfVoteContainer>
            <NumberOfVote>243</NumberOfVote>
            <NumberOfVoteText>참여한 투표</NumberOfVoteText>
          </NumberOfVoteContainer>
          <NumberOfVoteContainer>
            <NumberOfVote>2134</NumberOfVote>
            <NumberOfVoteText>북마크 투표</NumberOfVoteText>
          </NumberOfVoteContainer>
        </NumberOfVoteSection>
      </PageInner>
      <TabList>
        {MY_PAGE_VOTE_TYPE.map(({ id, name }) => (
          <SelectedButton
            key={`my_page_tab_${id}`}
            value={id}
            onClick={onClickSelectedTab}
            selected={id === selectedTab}
          >
            {name}
          </SelectedButton>
        ))}
      </TabList>
      <VoteListSection>
        <VoteList voteList={voteList} />
        <div ref={subscribe} />
      </VoteListSection>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  width: 100%;
  ${({ theme }) => theme.textStyle.Font_Minimum};
`;

const PageInner = styled.div`
  margin: 0 auto;
  border-radius: 4px;
  max-width: 640px;
  position: relative;
  padding: 20px;
  padding-bottom: 40px;

  ${({ theme }) =>
    css`
      background-color: ${theme.palette.background.myPage};
      color: ${theme.palette.ink.lightest};
    `};
  ${media.medium} {
    padding: 20px 40px;
  }
`;

const ImageWrapper = styled.div`
  width: 107px;
  height: 107px;
  background: ${({ theme }) => theme.palette.background.hard};
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  float: left;
  margin-right: 17px;
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

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserInfo = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 86px;
  background-color: ${({ theme }) => theme.palette.background.black};
  border-radius: 4px;
`;

const Divider = styled.div`
  width: 1px;
  height: 8px;
  margin: 0 4px;
  background-color: ${({ theme }) => theme.palette.ink.base};
`;

const Nickname = styled.span`
  margin-top: 8px;
  ${({ theme }) => css`
    ${theme.textStyle.Title_Small};
    color: ${theme.palette.ink.lighter};
  `};
`;

const ProfileModifyButton = styled.button`
  width: 71px;
  height: 30px;
  border: 1px solid ${({ theme }) => theme.palette.border.light};
  border-radius: 4px;
  margin-top: 25px;
`;

const NumberOfVoteSection = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  margin-top: 24px;
`;

const NumberOfVoteContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const NumberOfVote = styled.span`
  ${({ theme }) => theme.textStyle.Title_Large};
  font-family: NeoDunggeunmo, Pretendard Variable, -apple-system, BlinkMacSystemFont, system-ui,
    Roboto, "Helvetica Neue";
`;

const NumberOfVoteText = styled.span`
  color: ${({ theme }) => theme.palette.ink.light};
`;

const VoteListSection = styled.section`
  position: relative;
  bottom: 9px;
  background-color: ${({ theme }) => theme.palette.background.white};
  height: 100%;
  max-width: 640px;
  margin: 0 auto;
  padding: 0 20px 20px;
  /* 55px은 헤더 높이이고 그 뒤의 값을 해당 섹션의 높이로 할려고 했는데, 해더의 높이가 작아져서 큰 값으로 설정  */
  height: calc(100vh - 55px - 280px);
  overflow-y: scroll;
`;

const TabList = styled.div`
  display: flex;
  position: relative;
  bottom: 8px;
  max-width: 640px;
  margin: 0 auto;
`;

const SelectedButton = styled.button<{ selected: boolean }>`
  font-family: NeoDunggeunmo, Pretendard Variable, -apple-system, BlinkMacSystemFont, system-ui,
    Roboto, "Helvetica Neue";
  width: 100%;
  height: 50px;
  border-radius: 10px 10px 0 0;
  z-index: 9;
  ${({ selected, theme }) =>
    selected
      ? css`
          background-color: ${theme.palette.background.white};
          color: ${theme.palette.ink.darker};
        `
      : css`
          color: ${theme.palette.ink.light};
          background-color: ${theme.palette.background.myPageInactve};
        `};
`;

export default MyPage;
