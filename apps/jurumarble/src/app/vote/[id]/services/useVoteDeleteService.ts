import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteVote } from 'lib/apis/vote';
import { reactQueryKeys } from 'lib/queryKeys';

export default function useVoteDeleteService(voteId: number) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(() => deleteVote(voteId), {
    onSuccess: () => {
      alert('투표가 삭제되었습니다.');
      queryClient.invalidateQueries([reactQueryKeys.voteList]);
      window.location.href = 'vote';
    },
  });
  return {
    onDelete: mutate,
  };
}
