import { useMutation } from "@tanstack/react-query";
import { modifyVoteAPI, ModifyVote } from "lib/apis/vote";
import React, { useState } from "react";

function useModifyVoteService() {
  const [vote, setVote] = useState<ModifyVote>({
    title: "",
    detail: "",
    category: "FOOD",
    titleA: "",
    titleB: "",
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

  const onChangeVoteByClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVote({
      ...vote,
      [name]: value,
    });
  };

  const { mutate: mutateVote } = useMutation(() => modifyVoteAPI(vote), {
    onSuccess: () => {
      alert("내용이 추가되었습니다. (여기까지 구현)");
    },
  });

  return { vote, onChangeVote, onChangeVoteByParameter, onChangeVoteByClick, mutateVote };
}

export default useModifyVoteService;
