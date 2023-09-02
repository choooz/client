import React, { useCallback, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { uploadImageAPI } from "lib/apis/common";
import { postNormalVoteAPI, PostVoteRequest } from "lib/apis/vote";

export default function usePostVoteService() {
  const router = useRouter();

  const [postVoteInfo, setPostVoteInfo] = useState<PostVoteRequest>({
    title: "",
    titleA: "",
    titleB: "",
    imageA: "",
    imageB: "",
    drinkAId: "",
    drinkBId: "",
  });

  const onChangeVoteText = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPostVoteInfo({
      ...postVoteInfo,
      [name]: value,
    });
  };

  const onUploadImage = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    // if (e.target.files[0].size > 10000000 || e.target.files[1].size > 10000000) {
    //   alert("파일 용량이 10MB를 초과하였습니다.");
    //   return;
    // }
    if (e.target.files.length === 2) {
      const formDataA = new FormData();
      const formDataB = new FormData();
      formDataA.append("images", e.target.files[0]);
      formDataB.append("images", e.target.files[1]);
      try {
        const dataA = await uploadImageAPI(formDataA);
        const dataB = await uploadImageAPI(formDataB);

        setPostVoteInfo({
          ...postVoteInfo,
          imageA: dataA.imageUrl,
          imageB: dataB.imageUrl,
        });
      } catch (error) {
        alert("이미지 업로드에 실패했습니다." + error);
      }
      return;
    }

    if (e.target.files.length === 1) {
      const formDataA = new FormData();
      formDataA.append("images", e.target.files[0]);
      try {
        const dataA = await uploadImageAPI(formDataA);

        setPostVoteInfo({
          ...postVoteInfo,
          imageA: dataA.imageUrl,
          imageB: "",
        });
      } catch (error) {
        alert("이미지 업로드에 실패했습니다." + error);
      }
      return;
    }
  }, []);

  const { mutate: mutateVote } = useMutation(() => postNormalVoteAPI(postVoteInfo), {
    onSuccess: () => {
      router.push("/?isSuccess=true");
    },
  });

  return {
    postVoteInfo,
    onChangeVoteText,
    onUploadImage,
    mutateVote,
  };
}
