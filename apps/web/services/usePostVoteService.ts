import React, { useCallback, useState } from "react";
import { postVoteRequest } from "lib/api/vote";
import { uploadProfileImageAPI } from "lib/api/upload";

export default function usePostVoteService() {
  const [vote, setVote] = useState<postVoteRequest>({
    userId: 1,
    title: "",
    detail: "",
    category: "",
    titleA: "",
    titleB: "",
    imageA: "",
    imageB: "",
    filteredGender: "",
    filteredAge: "",
    filteredMbti: "",
  });

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

  const onUploadImage = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (e.target.files === null) return;
    // if (e.target.files[0].size > 10000000 || e.target.files[1].size > 10000000) {
    //   alert("파일 용량이 10MB를 초과하였습니다.");
    //   return;
    // }
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
      console.log(error);
      alert("이미지 업로드에 실패했습니다.");
    }
  }, []);

  return { vote, onChangeVote, onChangeVoteByParameter, onUploadImage };
}
