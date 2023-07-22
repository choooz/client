import Image from "next/image";
import { PurpleMonster } from "public/images";
import React from "react";
import styled, { css } from "styled-components";

interface Props {
  writer: {
    userImage: string | null;
    userGender: string;
    userAge: number;
    userMbti: string;
    nickName: null;
  };
}

const VoteWriterBox = ({ writer }: Props) => {
  const { nickName, userAge, userGender, userImage, userMbti } = writer;
  return (
    <Container>
      <Image
        src={userImage || PurpleMonster}
        alt="댓글 프로필"
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "8px",
        }}
      />
      <ContentsBox>
        <Flex>
          <TagBox>
            {userGender}
            <DivideTag /> {userAge}
            <DivideTag /> {userMbti}
          </TagBox>
        </Flex>
        <NickName> {nickName}</NickName>
      </ContentsBox>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 8px;
  position: relative;
  padding-bottom: 14px;
`;

const NickName = styled.div`
  font-weight: 700;
  ${({ theme }) => css`
    color: ${theme.palette.ink.darker};
    ${theme.textStyle.Font_Regular}
  `}
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const DivideTag = styled.div`
  width: 1px;
  height: 8px;
  margin: 0 4px;
  ${({ theme }) => css`
    background-color: ${theme.palette.background.selected};
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

const ContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
`;

export default VoteWriterBox;
