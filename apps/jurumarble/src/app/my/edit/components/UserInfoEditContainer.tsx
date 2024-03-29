import { useToggle } from '@monorepo/hooks';
import { Button } from 'components/button';
import { GENDER } from 'lib/constants';
import useGetUserInfo from 'services/useGetUserInfo';
import styled, { css } from 'styled-components';

import ImageUpload from './ImageUpload';
import SelectDrinkCapacity from './SelectDrinkCapacity';
import SelectMBTI from './SelectMBTI';
import WithdrawalModal from './WithdrawalModal';
import useEditProfileService from '../services/useEditProfileService';

function UserInfoEditContainer() {
  const { userInfo } = useGetUserInfo();
  const { gender, yearOfBirth, alcoholLimit, imageUrl, mbti, nickname } =
    userInfo!;

  const {
    onUploadImage,
    onChangeNickname,
    onChangeAlcoholCapacity,
    onChangeMBTI,
    updateUserInfo,
    deleteUser,
  } = useEditProfileService();

  const [isToggleWithdrawalModal, onToggleWithdrawalModal] = useToggle();

  return (
    <Container>
      <ImageUpload imageUrl={imageUrl} onUploadImage={onUploadImage} />
      <H3>닉네임</H3>
      <Input
        width="100%"
        defaultValue={nickname}
        onChange={(e) => onChangeNickname(e.target.value)}
      />
      <H3>주량</H3>
      <SelectDrinkCapacity
        alcoholLimit={alcoholLimit}
        onChangeAlcoholCapacity={onChangeAlcoholCapacity}
      />
      <GenderAndAge>
        <GenderAndAgeBox>
          <H3>성별</H3>
          <Input
            placeholder={gender === GENDER.MALE ? '남성' : '여성'}
            width="100%"
            disabled
          />
        </GenderAndAgeBox>
        <GenderAndAgeBox>
          <H3>출생년도</H3>
          <Input placeholder={`${yearOfBirth}`} width="50%" disabled />
        </GenderAndAgeBox>
      </GenderAndAge>
      <H3>MBTI</H3>
      <SelectMBTI MBTI={mbti} onChangeMBTI={onChangeMBTI} />
      <WarningMessage>MBTI 수정시 2개월간 바꿀 수 없습니다.</WarningMessage>

      <WithdrawalButton onClick={onToggleWithdrawalModal}>
        회원탈퇴
      </WithdrawalButton>

      <CompleteButton
        variant="primary"
        width="100%"
        height="56px"
        onClick={() =>
          updateUserInfo({
            nickname,
            alcoholLimit,
            mbti,
            imageUrl,
          })
        }
      >
        완료
      </CompleteButton>
      {isToggleWithdrawalModal && (
        <WithdrawalModal
          deleteUser={deleteUser}
          onToggleWithdrawalModal={onToggleWithdrawalModal}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  ${({ theme }) => css`
    ${theme.typography.body01}
    color: ${theme.colors.black_01};
    margin-top: 20px;
  `}
`;

const H3 = styled.h3`
  margin-top: 30px;
`;

const Input = styled.input`
  ${({ theme }) => css`
    ${theme.typography.body03}
    color: ${theme.colors.black_02};
    border: solid 1px ${theme.colors.line_01};
    width: 100%;
    height: 48px;
    margin-top: 12px;
    padding: 15px 14px;
    border-radius: 4px;
  `};
`;

const GenderAndAge = styled.div`
  display: flex;
  gap: 9px;
`;

const GenderAndAgeBox = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const WarningMessage = styled.div`
  ${({ theme }) => css`
    ${theme.typography.caption_chip}
    color: ${theme.colors.system_red};
    margin-top: 8px;
  `};
`;

const WithdrawalButton = styled.button`
  ${({ theme }) => css`
    ${theme.typography.caption_chip}
    color: ${theme.colors.black_04};
    text-decoration-line: underline;
    margin-top: 20px;
  `};
`;

const CompleteButton = styled(Button)`
  ${({ theme }) => css`
    ${theme.typography.body01}
    margin-top: 20px;
  `};
`;

export default UserInfoEditContainer;
