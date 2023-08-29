import useOutsideClick from "hooks/useOutsideClick";
import useToggle from "hooks/useToggle";
import Image from "next/image";
import { ExImg1 } from "public/images";
import React from "react";
import SvgIcMenu from "src/assets/icons/components/IcMenu";
import styled, { css } from "styled-components";

import CommentDeleteModal from "./CommentDeleteModal";

interface Props {
  comment?: any;
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
    parentId,
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
        <Flex>
          <TagBox>
            {/* {gender}
            <DivideTag /> {age}
            <DivideTag /> {mbti} */}
            여 | 20대 | INTJ | 10병
          </TagBox>
          <NickName> {nickName}</NickName>
        </Flex>

        <Contents>{content}</Contents>
        <CommentInfo>
          <div>{createdDate.slice(0, 10)}</div>・
          <InteractionButton onClick={mutateLike}>❤️ 좋아요 {likeCount}</InteractionButton> ・
          <InteractionButton onClick={mutateHate}>🖤 싫어요 {hateCount}</InteractionButton>{" "}
        </CommentInfo>
      </ContentsBox>
      <div onClick={onToggleMenu} ref={targetEl}>
        <SvgIcMenu width={20} height={20} />
      </div>
      {/* {toggleMenu && <ModifyDeleteButtonBox onDelete={onToggleWarningModal} right="20px" />} */}
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
