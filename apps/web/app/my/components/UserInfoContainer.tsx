import ImageUploadButton from "components/common/ImageUploadButton";
import { useGetUserInfo } from "hooks/useGetUserInfo";
import Path from "lib/Path";
import Link from "next/link";
import { Gender } from "types/user";
import styled, { css } from "styled-components";
import { media } from "@chooz/ui/styles/media";

function UserInfoContainer() {
  const { data: userInfo } = useGetUserInfo();

  if (!userInfo) return <></>;

  const { gender, username, age, mbti } = userInfo;

  return (
    <>
      <AddImageButtonWrapper>
        <ImageUploadButton width="107px" height="107px" />
      </AddImageButtonWrapper>
      <Profile>
        <UserInfo>
          <>
            {gender === Gender.MALE ? "남" : "여"}
            <Divider />
            {age}
            <Divider />
            {mbti}
          </>
        </UserInfo>
        <Nickname>{username}</Nickname>
        <ProfileModifyButton>
          <Link href={Path.PROFILE_EDIT}>프로필 수정</Link>
        </ProfileModifyButton>
      </Profile>
    </>
  );
}

const AddImageButtonWrapper = styled.div`
  float: left;
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 17px;

  ${media.medium} {
    padding-left: 28px;
  }
`;

const UserInfo = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 86px;
  background-color: ${({ theme }) => theme.palette.background.black};
  border-radius: 4px;
`;

const Divider = styled.div`
  width: 1px;
  height: 8px;
  margin: 0 4px;
  background-color: ${({ theme }) => theme.palette.ink.base};
`;

const Nickname = styled.span`
  margin-top: 8px;
  ${({ theme }) => css`
    ${theme.textStyle.Title_Small};
    color: ${theme.palette.ink.lighter};
  `};
`;

const ProfileModifyButton = styled.button`
  width: 71px;
  height: 30px;
  border: 1px solid ${({ theme }) => theme.palette.border.light};
  border-radius: 4px;
  margin-top: 25px;
`;

export default UserInfoContainer;
