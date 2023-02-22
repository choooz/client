import { QueryClient, useMutation } from "@tanstack/react-query";
import { modifyVoteAPI, ModifyVote } from "lib/apis/vote";
import { reactQueryKeys } from "lib/queryKeys";
import React, { useEffect, useState } from "react";
import { Vote } from "types/vote";

function useModifyVoteService(onToggle: () => void, initialValue: Vote) {
  const queryClient = new QueryClient();
  const [vote, setVote] = useState<ModifyVote>({
    title: "",
    detail: "",
    category: "NULL",
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

  const { totalTitle, titleA, titleB, category, voteId } = initialValue;
  // @TODO: detail값 추가되면 채워넣기
  useEffect(() => {
    if (!initialValue) return;
    setVote({
      title: totalTitle,
      detail: "",
      category,
      titleA,
      titleB,
    });
  }, [initialValue]);

  const { mutate: mutateVote } = useMutation(() => modifyVoteAPI(vote, voteId || 0), {
    onSuccess: () => {
      alert("내용이 추가하기 성공.");
      queryClient.invalidateQueries(reactQueryKeys.mainVoteList());
      onToggle();
    },
  });

  return { vote, onChangeVote, onChangeVoteByParameter, onChangeVoteByClick, mutateVote };
}

export default useModifyVoteService;
