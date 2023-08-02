import styled, { css } from "styled-components";
import { Button } from "@chooz/ui";
import MbtiSelect from "app/my/components/MbtiSelect";

import { media } from "styles/media";
import { Gender } from "types/user";
import ImageUpload from "./ImageUpload";
import CategoryList from "./CategoryList";
import useEditProfileService from "../services/useEditProfileService";

function UserInfoEditContainer() {
  const {
    userInfo,
    categoryList,
    onClickCategory,
    onChangeUsername,
    onChangeMbti,
    onClickUpdateUserInfo,
    onUploadImage,
  } = useEditProfileService();
  const { gender, username, age, mbti, imageUrl } = userInfo;

  return (
    <PageInner>
      <FlexSpaceBetween>
        <ImageUpload imageUrl={imageUrl} onUploadImage={onUploadImage} />
        <WithdrawalButton>회원 탈퇴</WithdrawalButton>
      </FlexSpaceBetween>
      <UserInfoTitle>닉네임</UserInfoTitle>
      <NicknameInput type="text" value={username} onChange={onChangeUsername} />
      <UserInfoTitle>성별 및 나이</UserInfoTitle>
      <FlexSpaceBetween>
        <GenderAndAgeInput type="text" value={gender === Gender.MALE ? "남성" : "여성"} disabled />
        <GenderAndAgeInput type="text" value={`${age}세`} disabled />
      </FlexSpaceBetween>
      <UserInfoTitle>MBTI</UserInfoTitle>
      <MbtiSelect mbtiOption={mbti} onChangeMbti={onChangeMbti}></MbtiSelect>
      <WarningMessage>MBTI 수정시 2개월간 바꿀 수 없습니다.</WarningMessage>
      <UserInfoTitle>카테고리</UserInfoTitle>
      <CategoryList categoryList={categoryList} onClickCategory={onClickCategory} />
      <CompleteButton variant="primary" width="100%" height="56px" onClick={onClickUpdateUserInfo}>
        완료
      </CompleteButton>
    </PageInner>
  );
}

const PageInner = styled.div`
  position: relative;
  top: -1px;
  margin: 0 auto;
  border-radius: 0 0 4px 4px;
  max-width: 640px;
  overflow-y: scroll;
  /* @Todo 값을 어떻게 설정하는건지 모르겠다. 일단 임의로 설정 */
  height: calc(100vh - 100px);
  padding: 24px 20px 20px 20px;
  ${({ theme }) =>
    css`
      background-color: ${theme.palette.background.white};
    `};
  ${media.medium} {
    padding: 34px 40px;
  }
`;

const FlexSpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;

const WithdrawalButton = styled.button`
  display: contents;
  ${({ theme }) =>
    css`
      color: ${theme.palette.ink.light};
      ${media.medium} {
        ${theme.textStyle.Title_Small}
      }
    `};
`;

const UserInfoTitle = styled.h3`
  font-weight: 700;
  margin: 30px 0 8px;
`;

const NicknameInput = styled.input`
  width: 100%;
  height: 40px;
  margin-bottom: 30px;
  padding: 10px 186px 10px 10px;
  border-radius: 4px;
  border: solid 1px ${({ theme }) => theme.palette.border.base};
`;

const GenderAndAgeInput = styled.input`
  width: 50%;
  height: 40px;
  margin: 0 9px 30px 0;
  padding: 10px 111px 10px 10px;
  border-radius: 4px;
  color: ${({ theme }) => theme.palette.ink.light};
`;

const WarningMessage = styled.div`
  color: ${({ theme }) => theme.palette.system.danger};
  margin-top: 6px;
`;

const CompleteButton = styled(Button)`
  margin-top: 40px;
`;

export default UserInfoEditContainer;
