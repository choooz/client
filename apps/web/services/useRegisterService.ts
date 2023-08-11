import useClickCategory from "hooks/useClickCategory";
import { addInfoAPI, addInterestCategoryAPI } from "lib/apis/user";
import Path from "lib/Path";
import { useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";
import { Gender, UserInfo } from "types/user";

export default function useRegisterService() {
  const router = useRouter();

  const [userInfo, setUserInfo] = useState<UserInfo>({
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

  const sliceAgeString = (age?: string | null) => {
    if (!age) return "";
    return age.length === 2 ? age.substring(1) : age;
  };
  const onChangeAge = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { innerText } = e.currentTarget;
    setUserInfo((prev) => ({
      ...prev,
      age: sliceAgeString(prev.age) + innerText,
    }));
  };
  const onDeleteAge = () => {
    setUserInfo((prev) => ({ ...prev, age: null }));
  };

  const onCompleteRegister = async ({ MBTI, age, gender }: UserInfo) => {
    const stringMBTI = `${MBTI.M}${MBTI.B}${MBTI.T}${MBTI.I}`;
    try {
      await addInfoAPI({
        mbti: stringMBTI,
        age: Number(age),
        gender,
      });
      router.replace(Path.REGISTER_INTERSTER_PAGE);
    } catch (error) {
      alert(error);
    }
  };

  /*
   * @Note interest page
   */

  const { categoryList, onClickCategory } = useClickCategory();

  const onClickComplete = async () => {
    try {
      await addInterestCategoryAPI({
        categoryList,
      });
      router.push(Path.MAIN_PAGE);
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
    categoryList,
    onClickCategory,
    onCompleteRegister,
    onClickComplete,
  };
}
