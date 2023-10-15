import { useMutation } from "@tanstack/react-query";
import { postReportCommentAPI } from "lib/apis/report";
import { toast } from "react-toastify";

export default function useCommentReportService() {
  const { mutate } = useMutation((voteId: number) => postReportCommentAPI(voteId));

  return { mutate };
}
