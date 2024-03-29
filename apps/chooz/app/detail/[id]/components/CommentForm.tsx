import { Input } from "@monorepo/ui";
import Image from "next/image";
import { PurpleMonster } from "public/images";
import React from "react";
import styled, { css } from "styled-components";
import { CommentForm } from "types/comments";

interface Props {
  commentForm: CommentForm;
  onSubmitComment: () => void;
  onChangeCommentForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  profileImage?: string;
}

function CommentForm({ commentForm, onChangeCommentForm, onSubmitComment, profileImage }: Props) {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitComment();
  };

  return (
    <Container>
      <Image
        src={profileImage || PurpleMonster}
        alt="댓글 프로필"
        width={40}
        height={40}
        style={{
          borderRadius: "8px",
          marginRight: "10px",
        }}
      />
      <Form onSubmit={onSubmit}>
        <Input
          width="100%"
          height="32px"
          variant="outlined"
          placeholder="댓글을 남겨보세요."
          value={commentForm.content}
          onChange={onChangeCommentForm}
        />
        <SubmitButton type="submit">등록</SubmitButton>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Form = styled.form`
  display: flex;
  flex: 1 1 auto;
`;

const SubmitButton = styled.button`
  width: 60px;
  height: 46px;
  border-top-right-radius: 8px;
  ${({ theme }) => css`
    border: 1px solid ${theme.palette.border.light};
    color: ${theme.palette.ink.lighter};
  `}
`;

export default CommentForm;
