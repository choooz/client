'use client';

import Path from 'lib/Path';
import Image from 'next/image';
import Link from 'next/link';
import { DrinkImage } from 'public/images';
import useGetUserInfo from 'services/useGetUserInfo';
import styled, { css } from 'styled-components';

function UserInfoContainer() {
  const { userInfo } = useGetUserInfo();

  if (!userInfo) {
    return <></>;
  }

  const { gender, nickname, yearOfBirth, mbti, imageUrl } = userInfo;

  const date = new Date();
  const age = date.getFullYear() - yearOfBirth;
  const ageRange = Math.floor(age / 10) * 10;

  return (
    <Container>
      <AddImageButtonWrapper>
        <Image
          alt="프로필 사진"
          src={imageUrl || DrinkImage}
          width={88}
          height={88}
          style={{ borderRadius: '8px' }}
        />
      </AddImageButtonWrapper>
      <Profile>
        <UserInfo>
          {gender === 'MALE' ? '남' : '여'}
          <Divider />
          {ageRange}대
          <Divider />
          {mbti}
        </UserInfo>
        <Nickname>{nickname}</Nickname>
        <Link href={Path.PROFILE_EDIT}>
          <ProfileModifyLinkText>프로필 수정</ProfileModifyLinkText>
        </Link>
      </Profile>
    </Container>
  );
}
const Container = styled.div`
  ${({ theme }) => css`
    position: relative;
    padding: 24px 16px;
    background-color: ${theme.colors.bg_02};
  `};
`;

const AddImageButtonWrapper = styled.div`
  float: left;
`;

const Profile = styled.div`
  ${({ theme }) => css`
    ${theme.typography.caption_chip}
    display: flex;
    flex-direction: column;
    padding-left: 17px;
  `}
`;

const UserInfo = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.black_04};
    background-color: ${theme.colors.white};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 96px;
    height: 24px;
    border-radius: 4px;
  `};
`;

const Divider = styled.div`
  width: 1px;
  height: 8px;
  margin: 0 4px;
  background-color: ${({ theme }) => theme.colors.black_04};
`;

const Nickname = styled.span`
  ${({ theme }) => css`
    ${theme.typography.button01}
    color: ${theme.colors.black_01};
    margin-top: 6px;
  `};
`;

const ProfileModifyLinkText = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.bg_02};
    background-color: ${theme.colors.black_02};
    width: 71px;
    height: 24px;
    border-radius: 4px;
    margin-top: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
  `}
`;

export default UserInfoContainer;
