import { useOutsideClick, useToggle } from "@chooz/hooks";
import VoteToolbar from "components/select/VoteToolbar";
import { EmptyAImg, EmptyBImg } from "public/images";
import React, { useState } from "react";
import useStatisticsService from "services/useStatisticsService";
import useVoteLoadService from "services/useVoteLoadService";
import styled from "styled-components";
import { AorB } from "types/vote";
import DetailAB from "./DetailAB";
import FilterBar from "./FilterBar";
import VoteAnalyzeBar from "./VoteAnalyzeBar";

function VoteContainer({ postId }: { postId: number }) {
  const [toggleDetail, onChangeToggleDetail] = useToggle(false);
  const [toggleMenu, onChangeToggleMenu] = useToggle(false);
  const { targetEl } = useOutsideClick<HTMLImageElement>(toggleMenu, onChangeToggleMenu);
  const { data: VoteData, isLoading, isError } = useVoteLoadService(postId);
  const { voteCountQuery, voteStatisticsQuery } = useStatisticsService(postId);
  const {
    data: statisticsData,
    isError: isStatisticsError,
    isLoading: isStatisticsLoading,
  } = voteStatisticsQuery;
  const [select, setSelect] = useState<AorB | null>(null);
  const onChangeSelect = (select: AorB) => {
    setSelect(select);
  };

  if (isLoading || isStatisticsLoading) return <div>로딩중</div>;
  if (isError || isStatisticsError) return <div>에러</div>;
  if (!VoteData || !statisticsData) return <div>데이터 없음</div>;

  const { percentageA, percentageB, totalCountA, totalCountB } = voteStatisticsQuery.data;
  const { title, titleA, titleB, imageA, imageB, description, voteCreatedDate } = VoteData;
  return (
    <>
      <VoteToolbar
        onChangeToggleDetail={onChangeToggleDetail}
        onChangeToggleMenu={onChangeToggleMenu}
        toggleMenu={toggleMenu}
        targetEl={targetEl}
        title={title}
        date={voteCreatedDate}
        totalVoteCount={voteCountQuery.data?.totalVoteCount || 0}
      />
      <DetailAB
        imageA={imageA || EmptyAImg}
        titleA={titleA}
        imageB={imageB || EmptyBImg}
        titleB={titleB}
        select={select}
        onChangeSelect={onChangeSelect}
      />
      <FilterBar />
      <VoteAnalyzeBar
        totalCountA={totalCountA}
        totalCountB={totalCountB}
        percentageA={percentageA}
        percentageB={percentageB}
      />
      <VoteDetail>{description}</VoteDetail>
    </>
  );
}

const VoteDetail = styled.div`
  ${({ theme }) => theme.fontSize.xSmall};
  padding-bottom: 36px;
`;

export default VoteContainer;
