import React, { useCallback, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { uploadImageAPI } from "lib/apis/common";
import { postDrinkVoteAPI, postNormalVoteAPI } from "lib/apis/vote";
import { DrinkInfoType, PostVoteType } from "src/types/vote";
import Path from "lib/Path";

export default function usePostVoteService() {
  const router = useRouter();

  const [postVoteInfo, setPostVoteInfo] = useState<PostVoteType>({
    title: "",
    detail: "",
    titleA: "",
    titleB: "",
    imageA: "",
    imageB: "",
    drinkAId: 0,
    drinkBId: 0,
  });

  const { title, detail, titleA, titleB, imageA, imageB, drinkAId, drinkBId } = postVoteInfo;

  const onChangeVoteText = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPostVoteInfo({
      ...postVoteInfo,
      [name]: value,
    });
  };

  const updatePostVoteInfo = (selectedDrinkList: DrinkInfoType[]) => {
    /**
     * @Todo 더 좋은 방법 없을까?
     */
    setPostVoteInfo((prev) => ({
      ...prev,
      titleA: selectedDrinkList[0].name,
      titleB: selectedDrinkList[1].name,
      imageA: selectedDrinkList[0].image,
      imageB: selectedDrinkList[1].image,
      drinkAId: selectedDrinkList[0].id,
      drinkBId: selectedDrinkList[1].id,
    }));
  };

  const onUploadImage = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;

    if (e.target.files.length === 1) {
      if (e.target.files[0].size > 10485760) {
        alert("파일 용량이 10MB를 초과하였습니다.");
        return;
      }
      if (!!postVoteInfo.imageA) {
        const formDataB = new FormData();
        formDataB.append("images", e.target.files[0]);
        try {
          const dataB = await uploadImageAPI(formDataB);
          setPostVoteInfo({
            ...postVoteInfo,
            imageB: dataB.imageUrl,
          });
        } catch (error) {
          alert("이미지 업로드에 실패했습니다." + error);
        }
        return;
      }
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

    if (e.target.files.length === 2) {
      if (e.target.files[0].size > 10485760 || e.target.files[1].size > 10485760) {
        alert("파일 용량이 10MB를 초과하였습니다.");
        return;
      }
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
  }, []);

  const { mutate: mutateNomalVote } = useMutation(
    (voteInfo: Omit<PostVoteType, "drinkAId" | "drinkBId">) => postNormalVoteAPI(voteInfo),
    {
      onSuccess: () => {
        router.push(`${Path.VOTE_HOME}/?isSuccess=true`);
      },
    },
  );
  const { mutate: mutateDrinkVote } = useMutation(
    (voteInfo: Omit<PostVoteType, "titleA" | "titleB" | "imageA" | "imageB">) =>
      postDrinkVoteAPI(voteInfo),
    {
      onSuccess: () => {
        router.push(`${Path.VOTE_HOME}/?isSuccess=true`);
      },
    },
  );

  const onClickPostVoteComplete = () => {
    postVoteInfo.drinkAId === 0
      ? mutateNomalVote({ title, detail, titleA, titleB, imageA, imageB })
      : mutateDrinkVote({ title, detail, drinkAId, drinkBId });
  };

  return {
    postVoteInfo,
    onChangeVoteText,
    onUploadImage,
    onClickPostVoteComplete,
    updatePostVoteInfo,
  };
}
