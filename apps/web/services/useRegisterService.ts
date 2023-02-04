import { QueryClient } from "@tanstack/react-query";
import { addInfoAPI, addInterestCategoryAPI, getUserInfo } from "lib/api/user";
import Path from "lib/Path";
import { reactQueryKeys } from "lib/queryKeys";
import { useRouter } from "next/router";
import { MouseEvent, useState } from "react";
import { Gender, UserInfo } from "types/user";
import { CategoryNameType } from "types/vote";

export default function useRegisterService() {
  const router = useRouter();
  const queryClient = new QueryClient();

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

  const onCompleteRegister = async ({ MBTI, age, gender }: UserInfo) => {
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

  // @note interest page

  const [categoryLists, setCategoryLists] = useState<CategoryNameType[]>([]);

  const onClickCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    const category = e.currentTarget.name as CategoryNameType;
    categoryLists.includes(category)
      ? setCategoryLists((prev) => prev.filter((item) => item !== category))
      : setCategoryLists((prev) => [...prev.concat(category)]);
    console.log(categoryLists);
  };

  const onClickComplete = async () => {
    // @todo getServerSideProps로 변경
    const userInfo = await queryClient.fetchQuery(reactQueryKeys.userInfo(), getUserInfo, {
      cacheTime: 5 * 1000 * 60,
      staleTime: 5 * 1000 * 60,
    });
    try {
      await addInterestCategoryAPI({
        categoryLists,
      });
      router.push(Path.LIST_PAGE);
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
    categoryLists,
    onClickCategory,
    onClickComplete,
  };
}
