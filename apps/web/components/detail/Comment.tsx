import Image from "next/image";
import { HambergerIcon } from "public/icons";
import { Eximg1 } from "public/images";
import React from "react";
import styled, { css } from "styled-components";
import { Comment } from "types/comments";

interface Props {
  comment: Comment;
}

function Comment({ comment }: Props) {
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

  return (
    <Container>
      <Image
        src={Eximg1}
        alt="댓글 프로필"
        style={{
          width: "40px",
          height: "40px",
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
          <div>❤️ 좋아요 {likeCount}</div> <Comma />
          <div>🖤 싫어요 {hateCount}</div> <Comma />
          <div>답글쓰기</div>
        </CommentInfo>
      </ContentsBox>
      <div>
        <Image
          src={HambergerIcon}
          alt="더보기"
          style={{
            width: "20px",
            height: "20px",
          }}
        />
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
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
    color: ${theme.palette.ink.dark};
  `}
`;

const TagBox = styled.div`
  display: flex;
  align-items: center;
  padding: 3px 4px;
  width: auto;
  ${({ theme }) => css`
    background-color: ${theme.palette.background.soft};
    color: ${theme.palette.ink.light};
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
    color: ${theme.palette.ink.dark};
    ${theme.textStyle.Font_Regular}
  `}
`;

const CommentInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  ${({ theme }) => css`
    color: ${theme.palette.ink.light};
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

export default Comment;
