// import { Input } from "@monorepo/ui";
import React from "react";

import styled, { css } from "styled-components";

interface Props {
  commentForm: string;
  onChangeCommentForm(e: React.ChangeEvent<HTMLTextAreaElement>): void;
  onSubmitComment(content: string): void;
}

function CommentPutForm({ commentForm, onChangeCommentForm, onSubmitComment }: Props) {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitComment(commentForm);
  };

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <Input placeholder="댓글을 남겨주세요" value={commentForm} onChange={onChangeCommentForm} />
        <SubmitButton type="submit">수정</SubmitButton>
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

const Input = styled.textarea`
  border-right: none;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  width: 100%;
  padding: 14px;
  resize: none;
  ${({ theme }) => css`
    border: 1px solid ${theme.colors.black_05};
    color: ${theme.colors.black_02};
  `}
`;

const SubmitButton = styled.button`
  width: 60px;
  padding: 16px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  white-space: nowrap;
  ${({ theme }) => css`
    border: 1px solid ${theme.colors.black_05};
    color: ${theme.colors.main_01};
    background-color: ${theme.colors.white};
  `}
`;

export default CommentPutForm;
