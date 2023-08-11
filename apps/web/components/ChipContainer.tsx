import NumberOfSolver from "components/common/NumberOfSolver";
import TargetMessage from "components/common/TargetMessage";
import { useGetUserInfo } from "hooks/useGetUserInfo";
import { deleteVoteAPI } from "lib/apis/vote";
import Image from "next/image";
import { HambergerIcon, InactiveBookmarkIcon, ActiveBookmarkIcon } from "public/icons";
import React from "react";
import useBookMarkService from "services/useVoteBookMarkService";
import styled from "styled-components";
import { Writer } from "types/vote";
import ModifyDeleteButtonBox from "../app/select/components/ModifyDeleteButtonBox";

interface Props {
  onToggleModifyModal(): void;
  onToggleModifyDeleteButtonBox(): void;
  isModifyDeleteButtonBox: boolean;
  targetEl: React.RefObject<HTMLImageElement>;
  title: string;
  date: string;
  countVoted: number;
  writer: Writer;
  voteId: number;
}

function ChipContainer({
  onToggleModifyModal,
  onToggleModifyDeleteButtonBox,
  title,
  isModifyDeleteButtonBox,
  targetEl,
  date,
  countVoted,
  writer,
  voteId,
}: Props) {
  const { userInfo } = useGetUserInfo();

  const { bookMarkCheckQuery, mutateBookMark } = useBookMarkService(voteId);
  const { data } = bookMarkCheckQuery;

  /*
   * @Todo 여러 곳에서 쓰이고 있는데, 한 곳에서 관리하면 좋지 않을까?
   * */
  const amIWriter = userInfo?.userId === writer?.userid;

  const onDeleteVote = async () => {
    await deleteVoteAPI(voteId);
  };

  return (
    <>
      <TagRow>
        <FlexRow>
          <NumberOfSolver>🔥{countVoted.toLocaleString()}명 해결중!</NumberOfSolver>
          <TargetMessage>당신을 기다렸어요</TargetMessage>
        </FlexRow>
        <FlexRow>
          {data?.bookmarked && (
            <button onClick={() => mutateBookMark()}>
              <ActiveBookmarkIcon />
            </button>
          )}
          {(!data || !data?.bookmarked) && (
            <button onClick={() => mutateBookMark()}>
              <InactiveBookmarkIcon />
            </button>
          )}

          {amIWriter && (
            <Image
              ref={targetEl}
              src={HambergerIcon}
              alt="매뉴"
              width={32}
              height={32}
              onClick={onToggleModifyDeleteButtonBox}
            />
          )}
        </FlexRow>
      </TagRow>
      <TitleRow>
        {title}
        <DateText>{date.slice(0, 10)}</DateText>
      </TitleRow>
      {isModifyDeleteButtonBox && (
        <ModifyDeleteButtonBox
          top="70px"
          right="41px"
          onDelete={onDeleteVote}
          onModify={onToggleModifyModal}
        />
      )}
    </>
  );
}

const TagRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
`;

const TitleRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 8px 0 11px 0;
  ${({ theme }) => theme.textStyle.Title_Small}
  font-weight: 700;
`;

const DateText = styled.div`
  color: ${({ theme }) => theme.palette.ink.base};
  font-weight: 400;
  font-family: NeoDunggeunmo, Pretendard Variable, -apple-system, BlinkMacSystemFont, system-ui,
    Roboto, "Helvetica Neue";
`;

const FlexRow = styled.div`
  display: flex;
  gap: 4px;
`;

export default ChipContainer;
