import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadImageAPI } from "lib/apis/common";
import { deleteUserAPI, updateUserInfoAPI } from "lib/apis/my";
import Path from "lib/Path";
import { queryKeys } from "lib/queryKeys";
import { logout } from "lib/utils/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type UpdateUserInfoRequest = Exclude<Parameters<typeof updateUserInfoAPI>[0], undefined>;

const getQueryKey = [queryKeys.USER_INFO];

export default function useEditProfileService() {
  const queryClient = useQueryClient();

  const onUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    if (e.target.files[0].size > 10485760) {
      alert("파일 용량이 10MB를 초과하였습니다.");
      return;
    }
    const formData = new FormData();
    formData.append("images", e.target.files[0]);
    try {
      const data = await uploadImageAPI(formData);
      queryClient.setQueryData(getQueryKey, (prev: any) => ({ ...prev, imageUrl: data.imageUrl }));
    } catch (error) {
      alert("이미지 업로드에 실패했습니다." + error);
    }
    return;
  };

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    queryClient.setQueryData(getQueryKey, (prev: any) => ({ ...prev, nickname: e.target.value }));
  };

  const onChangeAlcoholCapacity = (value: string) => {
    queryClient.setQueryData(getQueryKey, (prev: any) => ({ ...prev, alcoholLimit: value }));
  };

  const onChangeMBTI = (value: string) => {
    queryClient.setQueryData(getQueryKey, (prev: any) => ({ ...prev, mbti: value }));
  };

  const router = useRouter();

  const { mutate: updateUserInfo } = useMutation(
    (newUserInfo: UpdateUserInfoRequest) => updateUserInfoAPI(newUserInfo),
    {
      onSuccess: () => router.push(Path.MY_PAGE),
    },
  );

  const { mutate: deleteUser } = useMutation(() => deleteUserAPI(), {
    onSuccess: () => {
      toast("회원 탈퇴가 완료되었습니다.", {
        toastId: "deleteUser",
      });
      router.push(Path.MAIN_PAGE);
      logout();
    },
  });

  return {
    onUploadImage,
    onChangeNickname,
    onChangeAlcoholCapacity,
    onChangeMBTI,
    updateUserInfo,
    deleteUser,
  };
}
