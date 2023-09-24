import { useOutsideClick, useToggle } from "@monorepo/hooks";
import ModifyDeleteButtonBox from "app/vote/components/MenuBox";
import { CommentResponse } from "lib/apis/comment";
import Image from "next/image";
import { ExImg1 } from "public/images";
import React from "react";
import SvgIcMenu from "src/assets/icons/components/IcMenu";
import styled, { css } from "styled-components";

import CommentDeleteModal from "./CommentDeleteModal";

interface Props {
  comment: {
    id: number;
    content: string;
    age: string;
    createdDate: string;
    gender: string;
    hateCount: number;
    imageUrlstring: string;
    likeCount: number;
    mbti: string;
    nickName: string;
    userId: number;
  };
  mutateDeleteComment(): void;
  mutateLike?(): void;
  mutateHate?(): void;
}

function Comment({ comment, mutateDeleteComment, mutateLike, mutateHate }: Props) {
  const {
    id,
    content,
    age,
    createdDate,
    gender,
    hateCount,
    // imageUrl,
    likeCount,
    mbti,
    nickName,
    userId,
  } = comment;

  const [toggleMenu, onToggleMenu] = useToggle(false);
  const [toggleWarningModal, onToggleWarningModal] = useToggle(false);
  const { targetEl } = useOutsideClick<HTMLImageElement>(toggleMenu, onToggleMenu);

  return (
    <Container>
      <Image
        src={ExImg1}
        alt="댓글 프로필"
        width={40}
        height={40}
        style={{
          borderRadius: "8px",
          marginRight: "10px",
        }}
      />
      <ContentsBox>
        {(age || gender || mbti) && (
          <Flex>
            <TagBox>
              {gender && gender}
              {age && (
                <>
                  <DivideTag /> {age}대
                </>
              )}
              {mbti && (
                <>
                  <DivideTag /> {mbti}
                </>
              )}
            </TagBox>
          </Flex>
        )}

        <NickName> {nickName}</NickName>

        <Contents>{content}</Contents>
        <CommentInfo>
          <div>{createdDate.slice(0, 10)}</div>・
          <InteractionButton onClick={mutateLike}>❤️ 좋아요 {likeCount ?? 0}</InteractionButton> ・
          <InteractionButton onClick={mutateHate}>🖤 싫어요 {hateCount ?? 0}</InteractionButton>{" "}
        </CommentInfo>
      </ContentsBox>
      <div onClick={onToggleMenu} ref={targetEl}>
        <SvgIcMenu width={20} height={20} />
      </div>
      {toggleMenu && <ModifyDeleteButtonBox onDelete={onToggleWarningModal} right="20px" />}
      {toggleWarningModal && (
        <CommentDeleteModal onToggleModal={onToggleWarningModal} onSubmit={mutateDeleteComment} />
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  position: relative;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const ContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
`;

const Contents = styled.div`
  padding: 12px 0 12px 0;
  display: flex;
  align-items: center;
  ${({ theme }) => css`
    color: ${theme.colors.black_02};
  `}
`;

const TagBox = styled.div`
  display: flex;
  align-items: center;
  width: auto;
  border-radius: 4px;
  padding: 6px 8px;
  ${({ theme }) => css`
    background-color: ${theme.colors.sub_02};
    color: ${theme.colors.white};
    ${theme.typography.caption}
  `};
  line-height: unset;
`;

const DivideTag = styled.div`
  width: 2px;
  height: 12px;
  margin: 0 4px;
  ${({ theme }) => css`
    background-color: ${theme.colors.white};
  `}
`;

const NickName = styled.div`
  padding-top: 6px;
  font-weight: 700;
  ${({ theme }) => css`
    color: ${theme.colors.black_02};
    ${theme.typography.button01}
  `}
`;

const CommentInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  ${({ theme }) => css`
    color: ${theme.colors.black_04};
    ${theme.typography.caption}
  `}
`;

const Comma = styled.div`
  width: 2px;
  height: 2px;
  border-radius: 50%;
  ${({ theme }) => css`
    color: ${theme.colors.black_05};
  `}
`;

const InteractionButton = styled.div`
  :active {
    transform: scale(1.15);
  }
`;

export default Comment;
