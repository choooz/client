import React, { useCallback, useEffect, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import Path from 'lib/Path';
import { uploadImageAPI } from 'lib/apis/common';
import { postDrinkVoteAPI, postNormalVoteAPI } from 'lib/apis/vote';
import { useParams, useRouter } from 'next/navigation';
import { DrinkInfoType } from 'src/types/drink';
import { PostVoteType } from 'src/types/vote';

import useVoteLoadService from '../../services/useVoteLoadService';

export default function useUpdateVoteForm() {
  const router = useRouter();
  const params = useParams();
  const { data } = useVoteLoadService(Number(params.id));

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
    console.log(data);
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

  const { title, detail, titleA, titleB, imageA, imageB, drinkAId, drinkBId } =
    postVoteInfo;

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

  const onUploadImage = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files === null) {
        return;
      }

      if (e.target.files.length === 2) {
        if (
          e.target.files[0].size > 10485760 ||
          e.target.files[1].size > 10485760
        ) {
          alert('파일 용량이 10MB를 초과하였습니다.');
          return;
        }
        const formDataA = new FormData();
        const formDataB = new FormData();
        formDataA.append('images', e.target.files[0]);
        formDataB.append('images', e.target.files[1]);
        try {
          const dataA = await uploadImageAPI(formDataA);
          const dataB = await uploadImageAPI(formDataB);

          setPostVoteInfo({
            ...postVoteInfo,
            imageA: dataA.imageUrl,
            imageB: dataB.imageUrl,
          });
        } catch (error) {
          alert(`이미지 업로드에 실패했습니다.${error}`);
        }
        return;
      }

      if (e.target.files.length === 1) {
        if (e.target.files[0].size > 10485760) {
          alert('파일 용량이 10MB를 초과하였습니다.');
          return;
        }
        const formDataA = new FormData();
        formDataA.append('images', e.target.files[0]);
        try {
          const dataA = await uploadImageAPI(formDataA);

          setPostVoteInfo({
            ...postVoteInfo,
            imageA: dataA.imageUrl,
            imageB: '',
          });
        } catch (error) {
          alert(`이미지 업로드에 실패했습니다.${error}`);
        }
        return;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [],
  );

  const { mutate: mutateNomalVote } = useMutation(
    (voteInfo: Omit<PostVoteType, 'drinkAId' | 'drinkBId'>) =>
      postNormalVoteAPI(voteInfo),
    {
      onSuccess: () => {
        router.push(`${Path.VOTE_HOME}/?isSuccess=true`);
      },
    },
  );
  const { mutate: mutateDrinkVote } = useMutation(
    (voteInfo: Omit<PostVoteType, 'titleA' | 'titleB' | 'imageA' | 'imageB'>) =>
      postDrinkVoteAPI(voteInfo),
    {
      onSuccess: () => {
        router.push(`${Path.VOTE_HOME}/?isSuccess=true`);
      },
    },
  );

  const guidePostVote = () => {
    if (title === '') {
      alert('제목을 입력해주세요.');
      return;
    }
    if (detail === '') {
      alert('설명을 입력해주세요.');
      return;
    }
    if (titleA === '') {
      alert('선택지 A를 입력해주세요.');
      return;
    }
    if (titleB === '') {
      alert('선택지 B를 입력해주세요.');
      return;
    }
  };
  const onClickPostVoteComplete = () => {
    guidePostVote();
    postVoteInfo.drinkAId === 0
      ? mutateNomalVote({ detail, imageA, imageB, title, titleA, titleB })
      : mutateDrinkVote({ title, detail, drinkAId, drinkBId });
  };

  return {
    postVoteInfo,
    onChangeVoteText,
    onUploadImage,
    onClickPostVoteComplete,
    updatePostVoteInfo,
  };
}
