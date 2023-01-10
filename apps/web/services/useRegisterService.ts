import { MouseEvent, useState } from "react";
import { Gender, UserModel } from "types/auth";

export default function useRegisterService() {
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
  const onChangeProgress = (number: number) => {
    setProgress((prev) => prev + number);
  };

  const onChangeGender = (select: Gender) => {
    setUserInfo((prev) => ({ ...prev, gender: select }));
  };
  const onChangeMBTI = (e: MouseEvent<HTMLButtonElement>) => {
    const { name, value } = e.currentTarget;
    setUserInfo((prev) => ({ ...prev, MBTI: { ...prev.MBTI, [name]: value } }));
  };
  const onChangeAge = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { innerText } = e.currentTarget;

    if (!userInfo.age) {
      setUserInfo((prev) => ({ ...prev, age: innerText }));
      return;
    }
    if (userInfo.age.length >= 2) return;

    setUserInfo((prev) => ({ ...prev, age: prev.age + innerText }));
  };
  const onDeleteAge = () => {
    setUserInfo((prev) => ({ ...prev, age: null }));
  };

  return {
    userInfo,
    progress,
    onChangeProgress,
    onChangeGender,
    onChangeMBTI,
    onChangeAge,
    onDeleteAge,
  };
}
