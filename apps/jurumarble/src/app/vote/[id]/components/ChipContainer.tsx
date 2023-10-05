import { UseMutateFunction } from "@tanstack/react-query";
import Chip from "components/Chip";
import React from "react";
import SvgIcBookmarkActive from "src/assets/icons/components/IcBookmarkActive";
import SvgIcBookmark from "src/assets/icons/components/IcBookmark";
import SvgIcMenu from "src/assets/icons/components/IcMenu";
import styled from "styled-components";
import { useOutsideClick, useToggle } from "@monorepo/hooks";
import ModifyDeleteButtonBox from "app/vote/components/MenuBox";
import useGetUserInfo from "services/useGetUserInfo";
import { useRouter } from "next/navigation";
import Path from "lib/Path";
import useVoteDeleteService from "../services/useVoteDeleteService";

interface Props {
  title: string;
  date: string;
  description: string;
  region: string;
  mutateBookMark: UseMutateFunction;
  isBookmark: boolean;
  postedUserId: number;
  voteId: number;
}

const ChipContainer = ({
  voteId,
  date,
  description,
  title,
  region,
  mutateBookMark,
  isBookmark,
  postedUserId,
}: Props) => {
  const { userInfo } = useGetUserInfo();
  const { onDelete } = useVoteDeleteService(voteId);
  const router = useRouter();
  const [toggleMenu, onToggleMenu] = useToggle();
  const { targetEl } = useOutsideClick<HTMLDivElement>(toggleMenu, onToggleMenu);
  return (
    <>
      <TagRow>
        <FlexRow>
          {region && <Chip variant="region">{region}</Chip>}
          {/* <Chip variant="numberOfParticipants">122명이 즐겼어요</Chip> */}
        </FlexRow>
        <FlexRow>
          {isBookmark ? (
            <SvgIcBookmarkActive width={26} height={26} onClick={() => mutateBookMark()} />
          ) : (
            <SvgIcBookmark width={20} height={20} onClick={() => mutateBookMark()} />
          )}
          {userInfo?.userId === postedUserId && (
            <div ref={targetEl} onClick={onToggleMenu}>
              <SvgIcMenu width={20} height={20} />
            </div>
          )}
        </FlexRow>
      </TagRow>
      <TitleRow>
        {title}
        {/* <DateText>{date.slice(0, 10)}</DateText> */}
      </TitleRow>
      <DateText>{date}</DateText>
      <Description>{description}</Description>
      {toggleMenu && (
        <ModifyDeleteButtonBox
          top="70px"
          right="41px"
          onDelete={() => {
            if (confirm("정말 삭제하시겠습니까?")) {
              onDelete();
              alert("삭제되었습니다.");
            }
          }}
          onModify={() => {
            router.push(`${Path.VOTE_DETAIL_PAGE}/${voteId}/update`);
          }}
        />
      )}
    </>
  );
};

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
  margin-top: 20px;
  ${({ theme }) => theme.typography.body01};
`;

const DateText = styled.div`
  color: ${({ theme }) => theme.colors.black_04};
  ${({ theme }) => theme.typography.body_long03}
  text-align: right;
  margin: 8px 0;
`;

const FlexRow = styled.div`
  display: flex;
  gap: 8px;
`;

const Description = styled.div`
  padding-bottom: 20px;
  ${({ theme }) => theme.typography.body_long03}
  color: ${({ theme }) => theme.colors.black_02};
`;

export default ChipContainer;
