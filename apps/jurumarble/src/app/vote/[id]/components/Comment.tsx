import { useOutsideClick, useToggle } from "@monorepo/hooks";
import ModifyDeleteButtonBox from "app/vote/components/MenuBox";
import NonWriterBox from "app/vote/components/NonWriterBox";
import { Button } from "components/button";
import { convertAge, convertGender } from "lib/utils/formatUserInfo";
import Image from "next/image";
import { ExImg1 } from "public/images";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useGetUserInfo from "services/useGetUserInfo";
import { SvgIcMapPin } from "src/assets/icons/components";
import SvgIcMenu from "src/assets/icons/components/IcMenu";
import styled, { css } from "styled-components";
import useCommentDeleteService from "../services/useCommentDeleteService";
import useCommentReportService from "../services/useCommentReportService";
import AlcholLevelTag from "./AlcholLevelTag";
import CommentDeleteModal from "./CommentDeleteModal";
import CommentForm from "./CommentForm";
import CommentPutForm from "./CommentPutForm";
import SearchRestaurantModal from "./SearchRestaurantModal";

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
    likeCount: number;
    mbti: string;
    nickName: string;
    userId: number;
    alcoholLimitType: string;
    imageUrl: string;
    restaurant: {
      restaurantName: string;
      restaurantImage: string;
    };
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
    likeCount,
    mbti,
    nickName,
    userId,
    restaurant,
    alcoholLimitType,
    imageUrl,
  } = comment;

  const [toggleMenu, onToggleMenu] = useToggle(false);
  const [toggleNonWriterMenu, onToggleNonWriterMenu] = useToggle(false);
  const { targetEl } = useOutsideClick<HTMLButtonElement>(toggleMenu, onToggleMenu);
  const { targetEl: targetEl2 } = useOutsideClick<HTMLButtonElement>(
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
  const [isSearchRestaurantModal, onToggleSearchRestaurantModal] = useToggle();

  return (
    <Container>
      <Image
        src={imageUrl ? imageUrl : ExImg1}
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
          <FlexBetween>
            <div className="flex">
              <TagBox isMine={userInfo?.userId === userId}>
                {gender && convertGender(gender)}
                {age && (
                  <>
                    <DivideTag /> {convertAge(age)}
                  </>
                )}
                {mbti && (
                  <>
                    <DivideTag /> {mbti}
                  </>
                )}
              </TagBox>
              <AlcholLevelTag alchol={alcoholLimitType} />
            </div>
            {userInfo?.userId === userId ? (
              <button onClick={onToggleMenu} ref={targetEl}>
                <SvgIcMenu width={20} height={20} />
              </button>
            ) : (
              <button onClick={onToggleNonWriterMenu} ref={targetEl2}>
                <SvgIcMenu width={20} height={20} />
              </button>
            )}
          </FlexBetween>
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
            {restaurant ? (
              <>
                {restaurant.restaurantImage !== "nonSelect" && (
                  <RestaurantImage>
                    <Image
                      src={restaurant.restaurantImage}
                      alt="음식 이미지"
                      fill
                      style={{ borderRadius: "4px" }}
                      objectFit="cover"
                    />
                  </RestaurantImage>
                )}
                <RestaurantNameBox>
                  <SvgIcMapPin width={12} height={12} />
                  {restaurant.restaurantName}
                </RestaurantNameBox>
              </>
            ) : userInfo?.userId === userId && voteType !== "drinks" ? (
              <AddRestaurants>
                <Button
                  variant="outline"
                  width="104px"
                  height="40px"
                  onClick={onToggleSearchRestaurantModal}
                >
                  음식점 추가 <BigFont>﹢</BigFont>
                </Button>
              </AddRestaurants>
            ) : null}
            <CommentInfo>
              <div>{createdDate.slice(0, 10)}</div>・
              <InteractionButton onClick={mutateLike}>❤️ 좋아요 {likeCount ?? 0}</InteractionButton>{" "}
              ・
              <InteractionButton onClick={mutateHate}>🖤 싫어요 {hateCount ?? 0}</InteractionButton>{" "}
            </CommentInfo>
          </>
        )}
      </ContentsBox>
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
            toast("복사되었어요!", {
              toastId: "copy",
            });
            onToggleNonWriterMenu();
          }}
          onReport={() => {
            mutate(id);
            onToggleNonWriterMenu();
          }}
          right="20px"
        />
      )}
      {isSearchRestaurantModal && (
        <SearchRestaurantModal
          commentId={id}
          postId={postId}
          onToggleSearchRestaurantModal={onToggleSearchRestaurantModal}
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

const FlexBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  .flex {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 6px;
  }
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

const RestaurantImage = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  position: relative;
`;

const RestaurantNameBox = styled.div`
  ${({ theme }) => css`
    ${theme.typography.caption_chip}
    color: ${theme.colors.black_04};
    background-color: ${theme.colors.bg_01};
    padding: 4px 8px;
    border-radius: 4px;
    gap: 4px;
    display: flex;
    align-items: center;
    margin-top: 8px;
  `}
`;

const TagBox = styled.div<{ isMine: boolean }>`
  display: flex;
  align-items: center;
  width: auto;
  border-radius: 4px;
  padding: 6px 8px;
  ${({ theme, isMine }) => css`
    background-color: ${isMine ? theme.colors.sub_01 : theme.colors.sub_02};
    color: ${theme.colors.white};
    ${theme.typography.caption_chip}
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
  margin-top: 12px;
  ${({ theme }) => css`
    color: ${theme.colors.black_04};
    ${theme.typography.caption_chip}
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
