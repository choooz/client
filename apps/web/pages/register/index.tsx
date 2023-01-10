import { AgeSelection, GenderSelection, MBTISelection, ProgressBar } from "components";
import useRegisterService from "services/useRegisterService";
import styled from "styled-components";
import { media } from "styles/media";

function RegisterPage() {
  const {
    userInfo,
    progress,
    onChangeProgress,
    onChangeGender,
    onChangeMBTI,
    onChangeAge,
    onDeleteAge,
  } = useRegisterService();

  return (
    <>
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
  height: 558px;
  background-color: white;
  max-width: 640px;
  position: relative;
  padding: 30px;
  ${media.medium} {
    height: 717px;
    padding: 80px;
  }
`;

export default RegisterPage;
