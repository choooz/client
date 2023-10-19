import { UseMutateFunction } from '@tanstack/react-query';
import Chip from 'components/Chip';
import { formatDate } from 'lib/utils/formatDate';
import SvgIcBookmark from 'src/assets/icons/components/IcBookmark';
import SvgIcBookmarkActive from 'src/assets/icons/components/IcBookmarkActive';
import styled from 'styled-components';

interface Props {
  title: string;
  date: string;
  region: string;
  mutateBookMark: UseMutateFunction;
  isBookmark: boolean;
  votedCount: number;
  createdAt: string;
}

const ChipContainer = ({
  title,
  region,
  mutateBookMark,
  isBookmark,
  votedCount,
  createdAt,
}: Props) => {
  return (
    <>
      <TagRow>
        <FlexRow>
          {region && <Chip variant="region">{region}</Chip>}
          <Chip variant="numberOfParticipants">{votedCount}명이 참여중</Chip>
        </FlexRow>
        <FlexRow>
          {isBookmark ? (
            <SvgIcBookmarkActive
              width={20}
              height={20}
              onClick={(e) => {
                e.stopPropagation();
                mutateBookMark();
              }}
            />
          ) : (
            <SvgIcBookmark
              width={20}
              height={20}
              onClick={(e) => {
                e.stopPropagation();
                mutateBookMark();
              }}
            />
          )}
        </FlexRow>
      </TagRow>
      <TitleRow>{title}</TitleRow>
      <DateText>{formatDate(createdAt)}</DateText>
    </>
  );
};

const TagRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TitleRow = styled.div`
  display: flex;
  margin-top: 20px;
  ${({ theme }) => theme.typography.body01};
`;

const DateText = styled.div`
  color: ${({ theme }) => theme.colors.black_04};
  ${({ theme }) => theme.typography.body_long03}
  text-align: right;
  margin: 8px 0 20px;
`;

const FlexRow = styled.div`
  display: flex;
  gap: 4px;
`;

export default ChipContainer;
