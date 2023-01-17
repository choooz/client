import { addInfoAPI } from "lib/api/auth";
import Path from "lib/Path";
import { useRouter } from "next/router";
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

  const router = useRouter();

  const onCompleteRegister = async ({ MBTI, age, gender }: UserModel) => {
    const stringMBTI = `${MBTI.M}${MBTI.B}${MBTI.T}${MBTI.I}`;
    try {
      await addInfoAPI({
        mbti: stringMBTI,
        age: Number(age),
        gender,
      });
      router.push(Path.REGISTER_INTERSTER_PAGE);
    } catch (error) {
      alert(error);
    }
  };
  return {
    userInfo,
    progress,
    onChangeProgress,
    onChangeGender,
    onChangeMBTI,
    onChangeAge,
    onDeleteAge,
    onCompleteRegister,
  };
}
