import { Button } from "components/button";
import { GENDER } from "lib/constants";
import Path from "lib/Path";
import { useRouter } from "next/navigation";
import useGetUserInfo from "services/useGetUserInfo";
import styled, { css } from "styled-components";
import useEditProfileService from "../services/useEditProfileService";
import ImageUpload from "./ImageUpload";
import SelectDrinkCapacity from "./SelectDrinkCapacity";
import SelectMBTI from "./SelectMBTI";
import WithdrawalModal from "./WithdrawalModal";
import { useToggle } from "@monorepo/hooks";

function UserInfoEditContainer() {
  const { userInfo } = useGetUserInfo();
  const { gender, ageType, alcoholLimit, imageUrl, mbti, nickname } = userInfo!;

  const {
    onUploadImage,
    onChangeNickname,
    onChangeAlcoholCapacity,
    onChangeMBTI,
    updateUserInfo,
    deleteUser,
  } = useEditProfileService();

  const router = useRouter();

  const [isToggleWithdrawalModal, onToggleWithdrawalModal] = useToggle();

  return (
    <Container>
      <ImageUpload imageUrl={imageUrl} onUploadImage={onUploadImage} />
      <H3>닉네임</H3>
      <Input width="100%" value={nickname} onChange={onChangeNickname} />
      <H3>주량</H3>
      <SelectDrinkCapacity
        alcoholLimit={alcoholLimit}
        onChangeAlcoholCapacity={onChangeAlcoholCapacity}
      />
      <GenderAndAge>
        <GenderAndAgeBox>
          <H3>성별</H3>
          <Input placeholder={gender === GENDER.MALE ? "남성" : "여성"} width="100%" disabled />
        </GenderAndAgeBox>
        <GenderAndAgeBox>
          <H3>나이</H3>
          <Input placeholder={ageType ?? "나이를 설정해주세요."} width="50%" disabled />
        </GenderAndAgeBox>
      </GenderAndAge>
      <H3>MBTI</H3>
      <SelectMBTI MBTI={mbti} onChangeMBTI={onChangeMBTI}></SelectMBTI>
      <WarningMessage>MBTI 수정시 2개월간 바꿀 수 없습니다.</WarningMessage>
      <FlexEnd>
        <WithdrawalButton variant="outline" borderRadius="4px" onClick={onToggleWithdrawalModal}>
          회원탈퇴
        </WithdrawalButton>
      </FlexEnd>
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
    ${theme.typography.body03}
    color: ${theme.colors.system_red};
    margin-top: 8px;
  `};
`;

const FlexEnd = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const WithdrawalButton = styled(Button)`
  ${({ theme }) => css`
    ${theme.typography.caption}
    margin-top: 20px;
    width: 58px;
    height: 24px;
  `};
`;

const CompleteButton = styled(Button)`
  ${({ theme }) => css`
    ${theme.typography.body01}
    margin-top: 20px;
  `};
`;

export default UserInfoEditContainer;
