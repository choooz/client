import { useMutation, useQueryClient } from "@tanstack/react-query";
import { modifyVoteAPI, ModifyVote } from "lib/apis/vote";
import { reactQueryKeys } from "lib/queryKeys";
import React, { useEffect, useState } from "react";

function useModifyVoteService(onToggle: () => void, initialValue: ModifyVote, voteId: number) {
  const queryClient = useQueryClient();
  const [vote, setVote] = useState<ModifyVote>({
    title: "",
    detail: "",
    category: null,
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

  // @TODO: detail값 추가되면 채워넣기
  useEffect(() => {
    if (!initialValue) return;
    const { title, titleA, titleB, category, detail } = initialValue;
    setVote({
      title: title,
      detail,
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
