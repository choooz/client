import { useOutsideClick, useToggle } from "@chooz/hooks";
import ModifyVoteModal from "app/select/components/ModifyVoteModal";
import ChipContainer from "components/ChipContainer";
import { EmptyAImg, EmptyBImg } from "public/images";
import React from "react";
import useMutateVotingService from "services/useMutateVotingService";
import useStatisticsService from "services/useStatisticsService";
import useVoteLoadService from "services/useVoteLoadService";
import styled from "styled-components";
import DetailAB from "./DetailAB";
import FilterBar from "./FilterBar";
import useFilterStatistics from "./hooks/useFilterStatistics";
import VoteAnalyzeBar from "./VoteAnalyzeBar";
import VoteWriterBox from "./VoteWriterBox";

function VoteContainer({ postId }: { postId: number }) {
  const [isModifyModal, onToggleModifyModal] = useToggle(false);
  const [isModifyDeleteButtonBox, onToggleModifyDeleteButtonBox] = useToggle(false);
  const { targetEl } = useOutsideClick<HTMLImageElement>(
    isModifyDeleteButtonBox,
    onToggleModifyDeleteButtonBox,
  );
  const { data: VoteData, isLoading, isError } = useVoteLoadService(postId);
  const { voteCountQuery, voteStatisticsQuery } = useStatisticsService(postId);
  const {
    filter,
    onChangeFilter,
    onDeleteFilter,
    voteStatisticsQuery: voteFilteredStatisticsQuery,
  } = useFilterStatistics(postId);
  const {
    data: statisticsData,
    isError: isStatisticsError,
    isLoading: isStatisticsLoading,
  } = voteStatisticsQuery;

  const {
    data: filteredStatisticsData,
    isError: isFilteredStatisticsError,
    isLoading: isFilteredStatisticsLoading,
  } = voteFilteredStatisticsQuery;

  const { select, onMutateVoting } = useMutateVotingService(postId);

  if (isLoading || isStatisticsLoading || isFilteredStatisticsLoading) return <div>로딩중</div>;
  if (isError || isStatisticsError || isFilteredStatisticsError) return <div>에러</div>;
  if (!VoteData || !statisticsData || !filteredStatisticsData) return <div>데이터 없음</div>;

  const { percentageA, percentageB, totalCountA, totalCountB } = voteStatisticsQuery.data;
  const {
    percentageA: filteredPercentageA,
    percentageB: filteredPercentageB,
    totalCountA: filteredTotalCountA,
    totalCountB: filteredTotalCountB,
  } = voteFilteredStatisticsQuery.data;
  const { title, titleA, titleB, imageA, imageB, description, voteCreatedDate, category, writer } =
    VoteData;

  return (
    <>
      <VoteWriterBox writer={writer} />
      <ChipContainer
        onToggleModifyModal={onToggleModifyModal}
        onToggleModifyDeleteButtonBox={onToggleModifyDeleteButtonBox}
        isModifyDeleteButtonBox={isModifyDeleteButtonBox}
        targetEl={targetEl}
        title={title}
        date={voteCreatedDate}
        writer={writer}
        voteId={postId}
        /*
         * @Todo 이렇게 해야하나?
         */
        countVoted={voteCountQuery.data?.totalVoteCount || 0}
      />
      <DetailAB
        imageA={imageA || EmptyAImg}
        titleA={titleA}
        imageB={imageB || EmptyBImg}
        titleB={titleB}
        select={select.choice}
        onMutateVoting={onMutateVoting}
        totalCountA={filteredTotalCountA}
        totalCountB={filteredTotalCountB}
        percentageA={filteredPercentageA}
        percentageB={filteredPercentageB}
      />
      <FilterBar filter={filter} onChangeFilter={onChangeFilter} onDeleteFilter={onDeleteFilter} />
      <VoteAnalyzeBar
        totalCountA={totalCountA}
        totalCountB={totalCountB}
        percentageA={percentageA}
        percentageB={percentageB}
      />
      <VoteDetail>{description}</VoteDetail>
      {isModifyModal && (
        <ModifyVoteModal
          onToggleModal={onToggleModifyModal}
          prevVoteValue={{
            title,
            detail: description,
            titleA,
            titleB,
            category,
          }}
          voteId={postId}
        />
      )}
    </>
  );
}

const VoteDetail = styled.div`
  ${({ theme }) => theme.fontSize.xSmall};
  padding-bottom: 36px;
`;

export default VoteContainer;
