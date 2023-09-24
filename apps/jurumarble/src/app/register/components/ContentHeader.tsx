"use client";

import styled from "styled-components";

interface ContentHeaderProps {
  title: string;
  subTitle: string;
  className?: string;
}

export const ContentHeader = ({ title, subTitle, className }: ContentHeaderProps) => {
  return (
    <Wrapper className={className}>
      <Title>{title}</Title>
      <SubTitle>{subTitle}</SubTitle>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Title = styled.h2`
  margin-bottom: 8px;
  ${({ theme }) => theme.typography.headline02}
`;

const SubTitle = styled.h3`
  ${({ theme }) => theme.typography.subhead02}
`;
