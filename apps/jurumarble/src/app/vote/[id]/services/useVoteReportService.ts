import { useMutation } from '@tanstack/react-query';
import { postReportVoteAPI } from 'lib/apis/report';

export default function useVoteReportService() {
  const { mutate } = useMutation((voteId: number) => postReportVoteAPI(voteId));

  return { mutate };
}
