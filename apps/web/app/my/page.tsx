"use client";

import { media } from "@chooz/ui/styles/media";
import { useQuery } from "@tanstack/react-query";
import ImageUploadButton from "components/common/ImageUploadButton";
import TabContainer from "components/my/TabContainer";
import VoteList from "components/my/VoteList";
import { useGetUserInfo } from "hooks/useGetUserInfo";
import { getVoteCount, VoteListType } from "lib/apis/user";
import { MY_PAGE_VOTE_TYPE } from "lib/constants";
import Path from "lib/Path";
import { reactQueryKeys } from "lib/queryKeys";
import Link from "next/link";
import { useState } from "react";
import useInfiniteMyPageVoteListService from "services/useInfiniteMyPageVoteListService";
import styled, { css } from "styled-components";
import { Gender } from "types/user";

function MyPage() {
  const [selectedTab, setSelectedTab] = useState<VoteListType>("created");

  const onClickSelectedTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedTab(e.currentTarget.value as VoteListType);
  };

  const loadVoteCount = () => {
    const { data } = useQuery(reactQueryKeys.myPageVoteCount(), getVoteCount);
    return { data };
  };

  const { voteList, subscribe } = useInfiniteMyPageVoteListService({
    size: 7,
    voteType: selectedTab,
  });

  const { data: userInfo } = useGetUserInfo();
  const { data: voteCount } = loadVoteCount();

  if (!userInfo) return <div>데이터 없음</div>;
  if (!voteCount) return <div>데이터 없음</div>;

  const { gender, username, age, mbti } = userInfo;
  const { countCreatedVote, countParticipatedVote, countBookmarkedVote } = voteCount;

  return (
    <PageWrapper>
      <PageInner>
        <AddImageButtonWrapper>
          <ImageUploadButton width="107px" height="107px" />
        </AddImageButtonWrapper>
        <Profile>
          <UserInfo>
            <>
              {gender === Gender.MALE ? "남" : "여"}
              <Divider />
              {age}
              <Divider />
              {mbti}
            </>
          </UserInfo>
          <Nickname>{username}</Nickname>
          <ProfileModifyButton>
            <Link href={Path.PROFILE_EDIT}>프로필 수정</Link>
          </ProfileModifyButton>
        </Profile>
        {/* @TODO api 연결하면 map 사용 */}
        <NumberOfVoteSection>
          <NumberOfVoteContainer>
            <NumberOfVote>{countCreatedVote}</NumberOfVote>
            <NumberOfVoteText>작성한 투표</NumberOfVoteText>
          </NumberOfVoteContainer>
          <NumberOfVoteContainer>
            <NumberOfVote>{countParticipatedVote}</NumberOfVote>
            <NumberOfVoteText>참여한 투표</NumberOfVoteText>
          </NumberOfVoteContainer>
          <NumberOfVoteContainer>
            <NumberOfVote>{countBookmarkedVote}</NumberOfVote>
            <NumberOfVoteText>북마크 투표</NumberOfVoteText>
          </NumberOfVoteContainer>
        </NumberOfVoteSection>
      </PageInner>
      <TabContainerWrapper>
        <TabContainer
          tabList={MY_PAGE_VOTE_TYPE}
          selectedTab={selectedTab}
          onClickSelectedTab={onClickSelectedTab}
        />
      </TabContainerWrapper>
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
      background-color: ${theme.palette.background.darkest};
      color: ${theme.palette.ink.lightest};
    `};
  ${media.medium} {
    padding: 20px 40px;
  }
`;

const AddImageButtonWrapper = styled.div`
  float: left;
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 17px;

  ${media.medium} {
    padding-left: 28px;
  }
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

const TabContainerWrapper = styled.div`
  position: relative;
  top: -8px;
`;

const VoteListSection = styled.section`
  position: relative;
  bottom: 9px;
  background-color: ${({ theme }) => theme.palette.background.white};
  height: 100%;
  max-width: 640px;
  margin: 0 auto;
  /* 55px은 헤더 높이이고 그 뒤의 값을 해당 섹션의 높이로 할려고 했는데, 해더의 높이가 작아져서 큰 값으로 설정  */
  height: calc(100vh - 55px - 280px);
  overflow-y: scroll;
  padding: 0 20px 20px;
  ${media.medium} {
    padding: 20px 40px 40px;
  }
`;

export default MyPage;
