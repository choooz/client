import { AgeSelection, GenderSelection, MBTISelection, ProgressBar } from "components";
import type { MouseEvent } from "react";
import { useState } from "react";
import styled from "styled-components";
import { media } from "styles/media";
import { Gender, UserModel } from "types/auth";

function RegisterPage() {
  const [userInfo, setUserInfo] = useState<UserModel>({
    gender: null,
    MBTI: {
      M: null,
      B: null,
      T: null,
      I: null,
    },
    age: null,
  });

  const [progress, setProgress] = useState(1);

  const onChangeGender = (select: Gender) => {
    setUserInfo((prev) => ({ ...prev, gender: select }));
  };
  const onChangeProgress = (number: number) => {
    setProgress((prev) => prev + number);
  };
  const onChangeMBTI = (e: MouseEvent<HTMLButtonElement>) => {
    const { name, value } = e.currentTarget;
    setUserInfo((prev) => ({ ...prev, MBTI: { ...prev.MBTI, [name]: value } }));
  };

  console.log(userInfo);

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
              setUserInfo={setUserInfo}
              onChangeProgress={onChangeProgress}
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
