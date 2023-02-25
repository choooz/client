import { useOutsideClick, useToggle } from "@chooz/hooks";
import VoteToolbar from "components/select/VoteToolbar";
import { EmptyAImg, EmptyBImg } from "public/images";
import React, { useState } from "react";
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

  //데이터
  const [select, setSelect] = useState<AorB | null>(null);

  if (isLoading) return <div>로딩중</div>;
  if (isError) return <div>에러</div>;
  if (!VoteData) return <div>데이터 없음</div>;

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
      />
      <DetailAB
        imageA={imageA || EmptyAImg}
        titleA={titleA}
        imageB={imageB || EmptyBImg}
        titleB={titleB}
        select={select}
        setSelect={setSelect}
      />
      <FilterBar />
      <VoteAnalyzeBar A={50} B={50} select={select} />
      <VoteDetail>{description}</VoteDetail>
    </>
  );
}

const VoteDetail = styled.div`
  ${({ theme }) => theme.fontSize.xSmall};
  padding-bottom: 36px;
`;

export default VoteContainer;
