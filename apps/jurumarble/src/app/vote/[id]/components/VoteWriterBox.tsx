import Image, { StaticImageData } from "next/image";
import React from "react";
import styled, { css } from "styled-components";

interface Props {
  writer: {
    userImage: string | StaticImageData;
    userGender: string | null;
    userAge: string | null;
    userMbti: string | null;
    nickName: string | null;
    alchol: string | null;
  };
}

function VoteWriterBox({ writer }: Props) {
  const { nickName, userAge, userGender, userImage, userMbti, alchol } = writer;
  return (
    <Container>
      <Image
        src={userImage}
        alt="댓글 프로필"
        width={48}
        height={48}
        style={{
          borderRadius: "8px",
        }}
      />
      <ContentsBox>
        {(userAge || userGender || userAge || alchol || userMbti) && (
          <Flex>
            <TagBox>
              {userGender && userGender}
              {userAge && (
                <>
                  <DivideTag /> {userAge}대
                </>
              )}
              {userMbti && (
                <>
                  <DivideTag /> {userMbti}
                </>
              )}
              {alchol && (
                <>
                  <DivideTag /> {alchol}
                </>
              )}
            </TagBox>
          </Flex>
        )}
        <NickName> {nickName}</NickName>
      </ContentsBox>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 8px;
  position: relative;
  padding-bottom: 14px;
  margin: 16px 24px;
`;

const NickName = styled.div`
  padding-top: 6px;
  font-weight: 700;
  ${({ theme }) => css`
    color: ${theme.colors.black_01};
    ${theme.typography.button01}
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
    background-color: ${theme.colors.black_04};
  `}
`;

const TagBox = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 8px;
  border-radius: 4px;
  width: auto;
  ${({ theme }) => css`
    background-color: ${theme.colors.white};
    color: ${theme.colors.black_04};
    ${theme.typography.caption_chip}
  `}
`;

const ContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
`;

export default VoteWriterBox;
