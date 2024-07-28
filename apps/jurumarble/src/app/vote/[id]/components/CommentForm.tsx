// import { Input } from "@monorepo/ui";
import React from 'react';

import { useToggle } from '@monorepo/hooks';
import { ReplaceLoginPageModal } from 'components/ReplaceLoginPageModal';
import { isLogin } from 'lib/utils/auth';
import styled, { css } from 'styled-components';

interface Props {
  commentForm: string;
  onChangeCommentForm(e: React.ChangeEvent<HTMLInputElement>): void;
  onSubmitComment(): void;
}

function CommentForm({
  commentForm,
  onChangeCommentForm,
  onSubmitComment,
}: Props) {
  const [isReplaceLoginPageModal, onToggleReplaceLoginPageModal] = useToggle();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    isLogin() ? onSubmitComment() : onToggleReplaceLoginPageModal();
  };

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <Input
          placeholder="댓글을 남겨주세요"
          value={commentForm}
          onChange={onChangeCommentForm}
        />
        <SubmitButton type="submit">등록</SubmitButton>
      </Form>
      {isReplaceLoginPageModal && (
        <ReplaceLoginPageModal
          onToggleReplaceLoginPageModal={onToggleReplaceLoginPageModal}
        />
      )}
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

const Input = styled.input`
  border-right: none;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  width: 100%;
  padding: 14px;
  ${({ theme }) => css`
    border: 1px solid ${theme.colors.line_01};
    color: ${theme.colors.black_04};
  `}
`;

const SubmitButton = styled.button`
  width: 60px;
  padding: 16px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  white-space: nowrap;
  ${({ theme }) => css`
    border: 1px solid ${theme.colors.line_01};
    color: ${theme.colors.black_04};
    background-color: ${theme.colors.white};
  `}
`;

export default CommentForm;
