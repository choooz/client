import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import Comment from 'app/vote/[id]/components/Comment';
import CommentForm from 'app/vote/[id]/components/CommentForm';
import CommentToolBar from 'app/vote/[id]/components/CommentToolbar';
import useCommentServices from 'app/vote/[id]/services/useCommentServices';
import { queryKeys } from 'lib/queryKeys';
import { useParams } from 'next/navigation';
import styled from 'styled-components';

function DrinkCommentContainer() {
  const params = useParams();
  const postId = params.id;
  const queryClient = useQueryClient();
  const [sortBy, setSortBy] = useState<'ByTime' | 'ByPopularity'>('ByTime');
  const onChangeFilter = (sort: 'ByTime' | 'ByPopularity') => {
    setSortBy(sort);
  };

  // const { commentFilter, onChangeCommentFilter } = useCommentFilter();
  const {
    comments,
    isError,
    isLoading,
    mutateHate,
    mutateLike,
    mutateComment,
  } = useCommentServices(Number(postId), sortBy, 'drinks');

  const [commentForm, setCommentForm] = useState('');
  const onChangeCommentForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentForm(e.target.value);
  };
  const onSubmitComment = () => {
    mutateComment(
      {
        content: commentForm,
        parentId: null,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([queryKeys.DETAIL_COMMENT_LIST]);
          setCommentForm('');
        },
      },
    );
  };

  if (isError) {
    return <div>에러</div>;
  }
  if (!comments) {
    return <></>;
  }

  const commentList = comments.pages.flatMap((page) => page.content);

  return (
    <>
      <Container>
        <CommentToolBar
          commentCount={comments.pages[0].numberOfElements}
          onChangeFilter={onChangeFilter}
          sortBy={sortBy}
        />
        <CommentForm
          commentForm={commentForm}
          onChangeCommentForm={onChangeCommentForm}
          onSubmitComment={onSubmitComment}
        />

        {!isLoading &&
          commentList.map(
            (
              {
                id,
                age,
                content,
                createdDate,
                gender,
                hateCount,
                likeCount,
                mbti,
                nickName,
                userId,
                restaurant,
                alcoholLimitType,
                imageUrl,
              },
              index,
            ) => (
              <Comment
                postId={Number(postId)}
                voteType="drinks"
                comment={{
                  age,
                  alcoholLimitType,
                  content,
                  createdDate,
                  gender,
                  hateCount,
                  id,
                  imageUrl,
                  likeCount,
                  mbti,
                  nickName,
                  restaurant,
                  userId: userId,
                }}
                mutateLike={() => mutateLike(id)}
                mutateHate={() => mutateHate(id)}
                key={`comment_id_${index}`}
                region=""
              />
            ),
          )}
        <br />
      </Container>
    </>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 20px;
`;

export default DrinkCommentContainer;
