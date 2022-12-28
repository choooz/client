import GenderSelection from "components/register/GenderSelection";
import MBTISelection from "components/register/MBTISelection";
import ProgressBar from "components/register/ProgressBar";
import type { MouseEvent } from "react";
import { useState } from "react";
import styled from "styled-components";
import { media } from "styles/media";

export interface MBTIType {
  M: "E" | "I" | "";
  B: "S" | "N" | "";
  T: "T" | "F" | "";
  I: "J" | "P" | "";
}

interface RegisterType {
  progress: number;
  gender: "male" | "female" | "";
  MBTI: MBTIType;
}

function RegisterPage() {
  const [register, setRegister] = useState<RegisterType>({
    progress: 1,
    gender: "",
    MBTI: {
      M: "",
      B: "",
      T: "",
      I: "",
    },
  });
  const onChangeSelectMale = () => {
    setRegister((prev) => ({ ...prev, gender: "male" }));
  };
  const onChangeSelectFemale = () => {
    setRegister((prev) => ({ ...prev, gender: "female" }));
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
              onChangeSelectFemale={onChangeSelectFemale}
              onChangeSelectMale={onChangeSelectMale}
            />
          )}
          {register.progress === 2 && (
            <MBTISelection
              MBTI={register.MBTI}
              onAddProgress={onAddProgress}
              onChangeMBTI={onChangeMBTI}
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
