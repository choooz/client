import { useOutsideClick, useToggle } from "@monorepo/hooks";
import ModifyDeleteButtonBox from "app/vote/components/MenuBox";
import NonWriterBox from "app/vote/components/NonWriterBox";
import { Button } from "components/button";
import { CommentResponse } from "lib/apis/comment";
import Image from "next/image";
import { ExImg1 } from "public/images";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useGetUserInfo from "services/useGetUserInfo";
import SvgIcMenu from "src/assets/icons/components/IcMenu";
import styled, { css } from "styled-components";
import useCommentDeleteService from "../services/useCommentDeleteService";
import useCommentReportService from "../services/useCommentReportService";

import CommentDeleteModal from "./CommentDeleteModal";
import CommentForm from "./CommentForm";
import CommentPutForm from "./CommentPutForm";

interface Props {
  voteType: "drinks" | "votes";
  postId: number;
  comment: {
    id: number;
    content: string;
    age: string;
    createdDate: string;
    gender: string;
    hateCount: number;
    imageUrlstring: string;
    likeCount: number;
    mbti: string;
    nickName: string;
    userId: number;
  };
  mutateLike?(): void;
  mutateHate?(): void;
}

function Comment({ comment, mutateLike, mutateHate, voteType, postId }: Props) {
  const { userInfo } = useGetUserInfo();
  const { mutate } = useCommentReportService();
  const {
    id,
    content,
    age,
    createdDate,
    gender,
    hateCount,
    // imageUrl,
    likeCount,
    mbti,
    nickName,
    userId,
  } = comment;

  const [toggleMenu, onToggleMenu] = useToggle(false);
  const [toggleNonWriterMenu, onToggleNonWriterMenu] = useToggle(false);
  const { targetEl } = useOutsideClick<HTMLImageElement>(toggleMenu, onToggleMenu);
  const { targetEl: targetEl2 } = useOutsideClick<HTMLImageElement>(
    toggleNonWriterMenu,
    onToggleNonWriterMenu,
  );
  const { onDelete, onPutComment } = useCommentDeleteService(voteType, postId, id);

  const [isModifying, setIsModifying] = useState(false);
  const [commentForm, setCommentForm] = useState("");
  const onChangeCommentForm = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentForm(e.target.value);
  };
  const onSubmitComment = (content: string) => {
    onPutComment(content);
    setIsModifying(false);
  };

  useEffect(() => {
    setCommentForm(content);
  }, [comment]);

  return (
    <Container>
      <Image
        src={ExImg1}
        alt="댓글 프로필"
        width={40}
        height={40}
        style={{
          borderRadius: "8px",
          marginRight: "10px",
        }}
      />
      <ContentsBox>
        {(age || gender || mbti) && (
          <Flex>
            <TagBox>
              {gender && gender}
              {age && (
                <>
                  <DivideTag /> {age}대
                </>
              )}
              {mbti && (
                <>
                  <DivideTag /> {mbti}
                </>
              )}
            </TagBox>
          </Flex>
        )}

        <NickName> {nickName}</NickName>

        {isModifying ? (
          <>
            <InputWrapper>
              <CommentPutForm
                commentForm={commentForm}
                onChangeCommentForm={onChangeCommentForm}
                onSubmitComment={onSubmitComment}
              />
            </InputWrapper>
            <PutFormWrapper>
              <Button
                variant="outline"
                width="45px"
                height="32px"
                borderRadius="4px"
                onClick={() => setIsModifying(false)}
              >
                취소
              </Button>
            </PutFormWrapper>
          </>
        ) : (
          <>
            <Contents>{content}</Contents>
            {userId === userInfo?.userId && (
              <AddRestaurants>
                <Button variant="outline" width="104px" height="40px">
                  음식점 추가 <BigFont>﹢</BigFont>
                </Button>
              </AddRestaurants>
            )}
            <CommentInfo>
              <div>{createdDate.slice(0, 10)}</div>・
              <InteractionButton onClick={mutateLike}>❤️ 좋아요 {likeCount ?? 0}</InteractionButton>{" "}
              ・
              <InteractionButton onClick={mutateHate}>🖤 싫어요 {hateCount ?? 0}</InteractionButton>{" "}
            </CommentInfo>
          </>
        )}
      </ContentsBox>
      {userId === userInfo?.userId ? (
        <div onClick={onToggleMenu} ref={targetEl}>
          <SvgIcMenu width={20} height={20} />
        </div>
      ) : (
        <div onClick={onToggleNonWriterMenu} ref={targetEl2}>
          <SvgIcMenu width={20} height={20} />
        </div>
      )}
      {toggleMenu && (
        <ModifyDeleteButtonBox
          onDelete={onDelete}
          onModify={() => setIsModifying((prev) => !prev)}
          right="20px"
        />
      )}
      {toggleNonWriterMenu && (
        <NonWriterBox
          onCopy={() => {
            navigator.clipboard.writeText(content);
            toast("복사되었어요!");
            onToggleNonWriterMenu();
          }}
          onReport={() => {
            mutate(id);
            onToggleNonWriterMenu();
          }}
          right="20px"
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  position: relative;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const ContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
`;

const Contents = styled.div`
  padding: 12px 0 12px 0;
  display: flex;
  align-items: center;
  ${({ theme }) => css`
    color: ${theme.colors.black_02};
  `}
`;

const TagBox = styled.div`
  display: flex;
  align-items: center;
  width: auto;
  border-radius: 4px;
  padding: 6px 8px;
  ${({ theme }) => css`
    background-color: ${theme.colors.sub_02};
    color: ${theme.colors.white};
    ${theme.typography.caption}
  `};
  line-height: unset;
`;

const DivideTag = styled.div`
  width: 2px;
  height: 12px;
  margin: 0 4px;
  ${({ theme }) => css`
    background-color: ${theme.colors.white};
  `}
`;

const NickName = styled.div`
  padding-top: 6px;
  font-weight: 700;
  ${({ theme }) => css`
    color: ${theme.colors.black_02};
    ${theme.typography.button01}
  `}
`;

const CommentInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  ${({ theme }) => css`
    color: ${theme.colors.black_04};
    ${theme.typography.caption}
  `}
`;

const Comma = styled.div`
  width: 2px;
  height: 2px;
  border-radius: 50%;
  ${({ theme }) => css`
    color: ${theme.colors.black_05};
  `}
`;

const InteractionButton = styled.div`
  :active {
    transform: scale(1.15);
  }
`;

const AddRestaurants = styled.div`
  padding: 0 0 12px 0;
`;

const BigFont = styled.span`
  font-size: 17px;
`;

const PutFormWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
`;

const InputWrapper = styled.div`
  padding: 12px 0 8px 0;
`;

export default Comment;
