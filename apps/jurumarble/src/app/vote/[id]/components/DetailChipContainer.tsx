import { useOutsideClick, useToggle } from '@monorepo/hooks';
import { UseMutateFunction } from '@tanstack/react-query';
import ModifyDeleteButtonBox from 'app/vote/components/MenuBox';
import NonWriterBox from 'app/vote/components/NonWriterBox';
import Chip from 'components/Chip';
import Path from 'lib/Path';
import { isLogin } from 'lib/utils/auth';
import { formatDate } from 'lib/utils/formatDate';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import useGetUserInfo from 'services/useGetUserInfo';
import SvgIcBookmark from 'src/assets/icons/components/IcBookmark';
import SvgIcBookmarkActive from 'src/assets/icons/components/IcBookmarkActive';
import SvgIcMenu from 'src/assets/icons/components/IcMenu';
import styled from 'styled-components';

import useVoteDeleteService from '../services/useVoteDeleteService';
import useVoteReportService from '../services/useVoteReportService';

interface Props {
  title: string;
  date: string;
  description: string;
  region: string;
  mutateBookMark: UseMutateFunction;
  isBookmark: boolean;
  postedUserId: number;
  voteId: number;
  onToggleReplaceLoginPageModal: () => void;
  votedCount: number;
}

const ChipContainer = ({
  voteId,
  date,
  description,
  title,
  region,
  mutateBookMark,
  isBookmark,
  postedUserId,
  votedCount,
  onToggleReplaceLoginPageModal,
}: Props) => {
  const { userInfo } = useGetUserInfo();
  const { onDelete } = useVoteDeleteService(voteId);
  const router = useRouter();
  const [toggleMenu, onToggleMenu] = useToggle();
  const [toggleNonWriterMenu, onToggleNonWriterMenu] = useToggle();
  const { targetEl } = useOutsideClick<HTMLDivElement>(
    toggleMenu,
    onToggleMenu,
  );
  const { targetEl: targetEl2 } = useOutsideClick<HTMLDivElement>(
    toggleNonWriterMenu,
    onToggleNonWriterMenu,
  );
  const { mutate } = useVoteReportService();
  return (
    <>
      <TagRow>
        <FlexRow>
          {region && <Chip variant="region">{region}</Chip>}
          <Chip variant="isVote">{votedCount}명이 참여중</Chip>
        </FlexRow>
        <FlexRow>
          {isBookmark ? (
            <SVGWrapper>
              <SvgIcBookmarkActive
                width={26}
                height={26}
                onClick={() =>
                  isLogin() ? mutateBookMark() : onToggleReplaceLoginPageModal()
                }
              />
            </SVGWrapper>
          ) : (
            <SVGWrapper>
              <SvgIcBookmark
                width={20}
                height={20}
                onClick={() =>
                  isLogin() ? mutateBookMark() : onToggleReplaceLoginPageModal()
                }
              />
            </SVGWrapper>
          )}

          {userInfo?.userId === postedUserId ? (
            <SVGWrapper onClick={onToggleMenu} ref={targetEl}>
              <SvgIcMenu width={20} height={20} />
            </SVGWrapper>
          ) : (
            <SVGWrapper onClick={onToggleNonWriterMenu} ref={targetEl2}>
              <SvgIcMenu width={20} height={20} />
            </SVGWrapper>
          )}
          {/* 
          <div
            ref={targetEl}
            onClick={userInfo?.userId === postedUserId ? onToggleMenu : onToggleNonWriterMenu}
          >
            <SvgIcMenu width={20} height={20} />
          </div> */}
        </FlexRow>
      </TagRow>
      <TitleRow>
        {title}
        {/* <DateText>{date.slice(0, 10)}</DateText> */}
      </TitleRow>
      <DateText>{formatDate(date)}</DateText>
      <Description>{description}</Description>
      {toggleMenu && (
        <ModifyDeleteButtonBox
          top="70px"
          right="41px"
          onDelete={() => {
            if (confirm('정말 삭제하시겠습니까?')) {
              onDelete();
            }
          }}
          onModify={() => {
            router.push(`${Path.VOTE_DETAIL_PAGE}/${voteId}/update`);
          }}
        />
      )}
      {toggleNonWriterMenu && (
        <NonWriterBox
          top="70px"
          right="41px"
          // onCopy={() => {
          //   navigator.clipboard.writeText(content);
          //   toast("복사되었어요!");
          //   onToggleNonWriterMenu();
          // }}
          onReport={() => {
            mutate(voteId, {
              onSuccess: () => {
                toast.success('신고가 접수되었습니다.', {
                  toastId: 'report',
                });
              },
            });

            onToggleNonWriterMenu();
          }}
        />
      )}
    </>
  );
};

const TagRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
`;

const TitleRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  ${({ theme }) => theme.typography.body01};
`;

const DateText = styled.div`
  color: ${({ theme }) => theme.colors.black_04};
  ${({ theme }) => theme.typography.body_long03}
  text-align: right;
  margin: 8px 0;
`;

const FlexRow = styled.div`
  display: flex;
  gap: 8px;
`;

const Description = styled.div`
  padding-bottom: 20px;
  white-space: pre-wrap;
  ${({ theme }) => theme.typography.body_long03}
  color: ${({ theme }) => theme.colors.black_02};
`;

const SVGWrapper = styled.div`
  width: 26px;
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default ChipContainer;
