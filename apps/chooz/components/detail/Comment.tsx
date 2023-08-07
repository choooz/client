import { useOutsideClick, useToggle } from "@monorepo/hooks";
import ModifyDeleteButtonBox from "app/select/components/ModifyDeleteButtonBox";
import Image from "next/image";
import { HambergerIcon } from "public/icons";
import { PurpleMonster } from "public/images";
import React from "react";
import styled, { css } from "styled-components";
import { Comment } from "types/comments";
import CommentDeleteModal from "./CommentDeleteModal";

interface Props {
  comment: Comment;
  mutateDeleteComment(): void;
  mutateLike(): void;
  mutateHate(): void;
}

function Comment({ comment, mutateDeleteComment, mutateLike, mutateHate }: Props) {
  const {
    id,
    content,
    age,
    createdDate,
    gender,
    hateCount,
    imageUrl,
    likeCount,
    mbti,
    nickName,
    parentId,
    userId,
  } = comment;

  const [toggleMenu, onToggleMenu] = useToggle(false);
  const [toggleWarningModal, onToggleWarningModal] = useToggle(false);
  const { targetEl } = useOutsideClick<HTMLImageElement>(toggleMenu, onToggleMenu);

  return (
    <Container>
      <Image
        src={imageUrl || PurpleMonster}
        alt="댓글 프로필"
        width={40}
        height={40}
        style={{
          borderRadius: "8px",
          marginRight: "10px",
        }}
      />
      <ContentsBox>
        <Flex>
          <TagBox>
            {gender}
            <DivideTag /> {age}
            <DivideTag /> {mbti}
          </TagBox>
          <NickName> {nickName}</NickName>
        </Flex>

        <Contents>{content}</Contents>
        <CommentInfo>
          <div>{createdDate.slice(0, 10)}</div>
          <Comma />
          <InteractionButton onClick={mutateLike}>❤️ 좋아요 {likeCount}</InteractionButton>{" "}
          <Comma />
          <InteractionButton onClick={mutateHate}>🖤 싫어요 {hateCount}</InteractionButton>{" "}
          <Comma />
          <div>답글쓰기</div>
        </CommentInfo>
      </ContentsBox>
      <div onClick={onToggleMenu} ref={targetEl}>
        <Image
          src={HambergerIcon}
          alt="더보기"
          style={{
            width: "20px",
            height: "20px",
          }}
        />
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
  padding: 8px 0 8px 0;
  display: flex;
  align-items: center;
  ${({ theme }) => css`
    color: ${theme.palette.ink.darker};
  `}
`;

const TagBox = styled.div`
  display: flex;
  align-items: center;
  padding: 3px 4px;
  width: auto;
  ${({ theme }) => css`
    background-color: ${theme.palette.background.soft};
    color: ${theme.palette.ink.base};
    ${theme.textStyle.Font_Minimum}
  `}
`;

const DivideTag = styled.div`
  width: 1px;
  height: 8px;
  margin: 0 4px;
  ${({ theme }) => css`
    background-color: ${theme.palette.background.selected};
  `}
`;

const NickName = styled.div`
  font-weight: 700;
  ${({ theme }) => css`
    color: ${theme.palette.ink.darker};
    ${theme.textStyle.Font_Regular}
  `}
`;

const CommentInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  ${({ theme }) => css`
    color: ${theme.palette.ink.base};
    ${theme.textStyle.Font_Minimum}
  `}
`;

const Comma = styled.div`
  width: 2px;
  height: 2px;
  border-radius: 50%;
  ${({ theme }) => css`
    background-color: ${theme.palette.background.selected};
  `}
`;

const InteractionButton = styled.div`
  :active {
    transform: scale(1.15);
  }
`;

export default Comment;
