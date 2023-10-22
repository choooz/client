import { useMutation } from '@tanstack/react-query';
import Path from 'lib/Path';
import { deleteVote } from 'lib/apis/vote';
import { useRouter } from 'next/navigation';

export default function useVoteDeleteService(voteId: number) {
  const router = useRouter();
  const { mutate } = useMutation(() => deleteVote(voteId), {
    onSuccess: () => {
      alert('투표가 삭제되었습니다.');
      router.push(Path.VOTE_HOME);
    },
  });
  return {
    onDelete: mutate,
  };
}
