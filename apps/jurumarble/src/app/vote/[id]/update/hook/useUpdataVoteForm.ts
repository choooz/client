import React, { useEffect, useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import Path from 'lib/Path';
import { modifyDrinkVoteAPI, modifyNormalVoteAPI } from 'lib/apis/vote';
import { queryKeys, reactQueryKeys } from 'lib/queryKeys';
import { useParams, useRouter } from 'next/navigation';
import { DrinkInfoType } from 'src/types/drink';
import { PostVoteType } from 'src/types/vote';

import useVoteLoadService from '../../services/useVoteLoadService';

type modifyNormalVoteProps = Exclude<
  Parameters<typeof modifyNormalVoteAPI>[0],
  undefined
>;

type modifyDrinkVoteProps = Exclude<
  Parameters<typeof modifyDrinkVoteAPI>[0],
  undefined
>;

const getMyCreatedVoteQueryKey = [queryKeys.MY_CREATED_VOTE];

export default function useUpdateVoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const params = useParams();
  const voteId = Number(params.id);
  const { data } = useVoteLoadService(voteId);

  const [postVoteInfo, setPostVoteInfo] = useState<PostVoteType>({
    detail: '',
    drinkAId: 0,
    drinkBId: 0,
    imageA: '',
    imageB: '',
    title: '',
    titleA: '',
    titleB: '',
  });

  useEffect(() => {
    if (!data) {
      return;
    }
    setPostVoteInfo({
      detail: data.detail,
      drinkAId: data.drinkAId,
      drinkBId: data.drinkBId,
      imageA: data.imageA,
      imageB: data.imageB,
      title: data.title,
      titleA: data.titleA,
      titleB: data.titleB,
    });
  }, [data]);

  const { title, detail, titleA, titleB, drinkAId, drinkBId } = postVoteInfo;

  const onChangeVoteText = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setPostVoteInfo({
      ...postVoteInfo,
      [name]: value,
    });
  };

  const updatePostVoteInfo = (selectedDrinkList: DrinkInfoType[]) => {
    /**
     * @Todo 더 좋은 방법 없을까?
     */
    setPostVoteInfo((prev) => ({
      ...prev,
      drinkAId: selectedDrinkList[0].id,
      drinkBId: selectedDrinkList[1].id,
      imageA: selectedDrinkList[0].image,
      imageB: selectedDrinkList[1].image,
      titleA: selectedDrinkList[0].name,
      titleB: selectedDrinkList[1].name,
    }));
  };

  const { mutate: mutateDrinkVote } = useMutation(
    (voteInfo: modifyDrinkVoteProps) => modifyDrinkVoteAPI(voteInfo),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.VOTE_LIST]);
        queryClient.invalidateQueries(getMyCreatedVoteQueryKey);
        queryClient.invalidateQueries(reactQueryKeys.voteDetail(voteId));
        router.push(Path.VOTE_HOME);
      },
    },
  );
  const { mutate: mutateNomalVote } = useMutation(
    (voteInfo: modifyNormalVoteProps) => modifyNormalVoteAPI(voteInfo),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.VOTE_LIST]);
        queryClient.invalidateQueries(getMyCreatedVoteQueryKey);
        router.push(Path.VOTE_HOME);
      },
    },
  );

  const onClickPostVoteComplete = () => {
    !postVoteInfo.drinkAId
      ? mutateNomalVote({
          detail,
          title,
          titleA,
          titleB,
          voteId: voteId,
        })
      : mutateDrinkVote({
          title,
          detail,
          drinkAId,
          drinkBId,
          voteId: voteId,
        });
  };

  return {
    postVoteInfo,
    onChangeVoteText,
    onClickPostVoteComplete,
    updatePostVoteInfo,
  };
}
