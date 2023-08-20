"use client";

import useRegisterService from "services/useRegisterService";
import styled from "styled-components";
import { media } from "@monorepo/ui/styles/media";
import { useToggle } from "@monorepo/hooks";
import {
  AgeSelection,
  GenderSelection,
  MBTISelection,
  ProgressBar,
  WarningSmallModal,
} from "./components";

function RegisterPage() {
  const {
    userInfo,
    progress,
    onChangeProgress,
    onChangeGender,
    onChangeMBTI,
    onChangeAge,
    onDeleteAge,
    onCompleteRegister,
  } = useRegisterService();

  const [isWarningModal, onToggleWarningModal] = useToggle();

  return (
    <>
      {isWarningModal && (
        <WarningSmallModal
          userInfo={userInfo}
          onToggleModal={onToggleWarningModal}
          onCompleteRegister={onCompleteRegister}
        />
      )}
      <ProgressBar progress={progress} />
      <PageWrapper>
        <PageInner>
          {progress === 1 && (
            <GenderSelection
              gender={userInfo.gender}
              onChangeProgress={onChangeProgress}
              onChangeGender={onChangeGender}
            />
          )}
          {progress === 2 && (
            <MBTISelection
              MBTI={userInfo.MBTI}
              onChangeProgress={onChangeProgress}
              onChangeMBTI={onChangeMBTI}
            />
          )}
          {progress === 3 && (
            <AgeSelection
              userInfo={userInfo}
              onChangeProgress={onChangeProgress}
              onChangeAge={onChangeAge}
              onDeleteAge={onDeleteAge}
              onToggleWarningModal={onToggleWarningModal}
            />
          )}
        </PageInner>
      </PageWrapper>
    </>
  );
}
const PageWrapper = styled.div`
  width: 100%;
`;

const PageInner = styled.div`
  margin: 0 auto;
  border-radius: 4px;
  height: calc(100vh - 68px - 55px);
  background-color: white;
  max-width: 640px;
  position: relative;
  padding: 30px;
  ${media.medium} {
    padding: 60px;
    height: calc(100vh - 68px - 55px);
  }
`;

export default RegisterPage;
