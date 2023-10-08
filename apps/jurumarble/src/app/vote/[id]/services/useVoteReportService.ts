import { useMutation } from "@tanstack/react-query";
import { postReportCommentAPI, postReportVoteAPI } from "lib/apis/report";
import { toast } from "react-toastify";

export default function useVoteReportService() {
  const { mutate } = useMutation((voteId: number) => postReportVoteAPI(voteId));

  return { mutate };
}
