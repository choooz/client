import AgeSelection from "components/register/AgeSelection";
import GenderSelection from "components/register/GenderSelection";
import MBTISelection from "components/register/MBTISelection";
import ProgressBar from "components/register/ProgressBar";
import { useRouter } from "next/router";
import type { MouseEvent } from "react";
import { useState } from "react";
import styled from "styled-components";
import { media } from "styles/media";

export interface MBTIType {
  M: "E" | "I" | null;
  B: "S" | "N" | null;
  T: "T" | "F" | null;
  I: "J" | "P" | null;
}

export enum Gender {
  MALE = "male",
  FEMALE = "female",
}

interface RegisterType {
  progress: number;
  gender: "male" | "female" | null;
  MBTI: MBTIType;
}

function RegisterPage() {
  const route = useRouter();
  const routeInterest = () => {
    route.push("/register/interest");
  };
  const [register, setRegister] = useState<RegisterType>({
    progress: 1,
    gender: null,
    MBTI: {
      M: null,
      B: null,
      T: null,
      I: null,
    },
  });

  const onChangeGender = (select: Gender) => {
    setRegister((prev) => ({ ...prev, gender: select }));
  };
  const onAddProgress = (number: number) => {
    setRegister((prev) => ({ ...prev, progress: prev.progress + number }));
  };
  const onChangeMBTI = (e: MouseEvent<HTMLButtonElement>) => {
    const { name, value } = e.currentTarget;
    setRegister((prev) => ({ ...prev, MBTI: { ...prev.MBTI, [name]: value } }));
  };

  return (
    <>
      <ProgressBar progress={register.progress} />
      <PageWrapper>
        <PageInner>
          {register.progress === 1 && (
            <GenderSelection
              gender={register.gender}
              onAddProgress={onAddProgress}
              onChangeGender={onChangeGender}
            />
          )}
          {register.progress === 2 && (
            <MBTISelection
              MBTI={register.MBTI}
              onAddProgress={onAddProgress}
              onChangeMBTI={onChangeMBTI}
            />
          )}
          {register.progress === 3 && (
            <AgeSelection onAddProgress={onAddProgress} navigater={routeInterest} />
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
