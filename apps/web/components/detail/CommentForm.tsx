import { Input } from "@chooz/ui";
import Image from "next/image";
import { Eximg1 } from "public/images";
import React from "react";
import styled, { css } from "styled-components";

function CommentForm() {
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
      <Form>
        <Input width="100%" height="32px" variant="outlined" placeholder="댓글을 남겨보세요." />
        <SubmitButton>등록</SubmitButton>
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
