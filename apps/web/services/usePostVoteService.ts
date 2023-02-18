import React, { useCallback, useState } from "react";
import { postVoteAPI, PostVote } from "lib/apis/vote";
import { uploadProfileImageAPI } from "lib/apis/upload";
import { useSubmitState } from "store/submitState";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function usePostVoteService() {
  const { setIsSubmit } = useSubmitState();
  const router = useRouter();

  const [vote, setVote] = useState<PostVote>({
    title: "",
    titleA: "",
    titleB: "",
    imageA: "",
    imageB: "",
    filteredGender: "",
    filteredAge: "",
    filteredMbti: "",
  });

  console.log(vote);

  const onChangeVote = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setVote({
      ...vote,
      [name]: value,
    });
  };

  const onChangeVoteByParameter = (name: string, value: string) => {
    setVote({
      ...vote,
      [name]: value,
    });
  };

  const onChangeVoteByClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVote({
      ...vote,
      [name]: value,
    });
  };

  const onChangeVoteBySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setVote({
      ...vote,
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
        const dataA = await uploadProfileImageAPI(formDataA);
        const dataB = await uploadProfileImageAPI(formDataB);

        setVote({
          ...vote,
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
        const dataA = await uploadProfileImageAPI(formDataA);

        setVote({
          ...vote,
          imageA: dataA.imageUrl,
          imageB: "",
        });
      } catch (error) {
        alert("이미지 업로드에 실패했습니다." + error);
      }
      return;
    }
  }, []);

  const { mutate: mutateVote } = useMutation(() => postVoteAPI(vote), {
    onSuccess: () => {
      router.push("/select/1?isSuccess=true");
      setIsSubmit(true);
    },
  });

  return {
    vote,
    onChangeVote,
    onChangeVoteByParameter,
    onUploadImage,
    onChangeVoteByClick,
    onChangeVoteBySelect,
    mutateVote,
  };
}
