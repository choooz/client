import { QueryClient, useMutation } from "@tanstack/react-query";
import { modifyVoteAPI, ModifyVote } from "lib/apis/vote";
import { reactQueryKeys } from "lib/queryKeys";
import React, { useState } from "react";
import { Vote } from "types/vote";

function useModifyVoteService(onToggle: () => void, initialValue?: Vote) {
  const queryClient = new QueryClient();
  // const {} = initialValue;
  const [vote, setVote] = useState<ModifyVote>({
    title: initialValue?.totalTitle || "",
    detail: "",
    category: initialValue?.category || "NULL",
    titleA: initialValue?.titleA || "",
    titleB: initialValue?.titleB || "",
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

  const { mutate: mutateVote } = useMutation(() => modifyVoteAPI(vote, initialValue?.voteId || 0), {
    onSuccess: () => {
      alert("내용이 추가하기 성공.");
      queryClient.invalidateQueries(reactQueryKeys.mainVoteList());
      onToggle();
    },
  });

  return { vote, onChangeVote, onChangeVoteByParameter, onChangeVoteByClick, mutateVote };
}

export default useModifyVoteService;
