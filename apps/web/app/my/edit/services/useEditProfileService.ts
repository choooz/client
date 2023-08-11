import { useGetUserInfo } from "hooks/useGetUserInfo";
import { uploadProfileImageAPI } from "lib/apis/upload";
import Path from "lib/Path";
import { useRouter } from "next/navigation";
import { updateUserInfo } from "lib/apis/my";
import useClickCategory from "hooks/useClickCategory";

export default function useEditProfileService() {
  const router = useRouter();

  const { categoryList, onClickCategory } = useClickCategory();

  const { userInfo, setUserInfo } = useGetUserInfo();

  const { username, mbti, imageUrl } = userInfo;

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo((prevUserInfo) => ({ ...prevUserInfo, username: e.target.value }));
  };

  const onChangeMbti = (value: string) => {
    setUserInfo({ ...userInfo, mbti: value });
  };

  const onClickUpdateUserInfo = () => {
    try {
      updateUserInfo({
        nickname: username,
        mbti,
        categoryList: categoryList,
        image: imageUrl,
      });
      router.push(Path.MY_PAGE);
    } catch (error) {
      alert("MBTI 수정 후 2개월 내에 수정할 수 없습니다.");
    }
  };

  const onUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    // if (e.target.files[0].size > 10000000 || e.target.files[1].size > 10000000) {
    //   alert("파일 용량이 10MB를 초과하였습니다.");
    //   return;
    // }

    const formData = new FormData();
    formData.append("images", e.target.files[0]);
    try {
      const data = await uploadProfileImageAPI(formData);
      setUserInfo({ ...userInfo, imageUrl: data.imageUrl });
    } catch (error) {
      alert("이미지 업로드에 실패했습니다." + error);
    }
    return;
  };

  return {
    userInfo,
    categoryList,
    onClickCategory,
    onChangeUsername,
    onChangeMbti,
    onClickUpdateUserInfo,
    onUploadImage,
  };
}
