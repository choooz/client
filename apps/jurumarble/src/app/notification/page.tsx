'use client';

import { media } from '@monorepo/ui/styles/media';
import VoteHeader from 'components/VoteHeader';
import { Button } from 'components/button';
import Path from 'lib/Path';
import { NotificationType } from 'lib/apis/notification';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { DrinkImage } from 'public/images';
import {
  SvgIcPrevious,
  SvgNotificationCheck,
  SvgReadAdminNotification,
  SvgUnreadAdminNotification,
} from 'src/assets/icons/components';
import styled, { css, useTheme } from 'styled-components';

import useNotificationService from './services/useNotificationService';

function NotificationPage() {
  const { colors } = useTheme();
  const NOTIFICATION_TYPE_ICON: Record<
    NotificationType,
    { true: JSX.Element; false: JSX.Element }
  > = {
    VOTE: {
      true: (
        <SvgNotificationCheck width={32} height={32} fill={colors.black_04} />
      ),
      false: (
        <SvgNotificationCheck width={32} height={32} fill={colors.main_01} />
      ),
    },

    COMMENT: {
      true: (
        <SvgNotificationCheck width={32} height={32} fill={colors.black_04} />
      ),
      false: (
        <SvgNotificationCheck width={32} height={32} fill={colors.main_01} />
      ),
    },
    ADMIN_NOTIFY: {
      true: <SvgReadAdminNotification />,
      false: <SvgUnreadAdminNotification />,
    },
  };

  const router = useRouter();
  const { notificationList, isLoading, readNotification } =
    useNotificationService();

  return (
    <div>
      <VoteHeader
        leftButton={
          <PreviousButton onClick={() => router.back()}>
            <SvgIcPrevious width={24} height={24} />
          </PreviousButton>
        }
      >
        알림
      </VoteHeader>
      {isLoading ? (
        /**
         * @TODO 로딩 컴포넌트 추가
         */
        <></>
      ) : notificationList?.length === 0 ? (
        <EmptyNotification>
          <Image
            alt=""
            src={DrinkImage}
            width={146}
            height={146}
            style={{ borderRadius: '200px' }}
          />
          받은 알림이 없어요.
        </EmptyNotification>
      ) : (
        <NotificationList>
          {notificationList?.map(
            ({ content, title, createdAt, id, type, isRead, url }) => (
              <NotificationItem
                key={id}
                isRead={isRead}
                onClick={() => {
                  router.push(`${Path.VOTE_DETAIL_PAGE}/${url}`);
                  readNotification(id);
                }}
              >
                {NOTIFICATION_TYPE_ICON[type][isRead ? 'true' : 'false']}
                <ContentBox>
                  <Content>{title}</Content>
                  <TypeMessage>{content}</TypeMessage>
                  <CreatedAt>{createdAt}</CreatedAt>
                </ContentBox>
              </NotificationItem>
            ),
          )}
        </NotificationList>
      )}
    </div>
  );
}

const EmptyNotification = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 24px;
  margin-top: 120px;
`;

const PreviousButton = styled(Button)`
  ${({ theme }) => css`
    background-color: ${theme.colors.white};
    position: relative;
    left: 20px;
  `}
`;

const NotificationList = styled.ul`
  margin-top: 20px;
`;

const NotificationItem = styled.li<{ isRead: boolean }>`
  ${({ theme, isRead }) => css`
  background-color: ${isRead && theme.colors.bg_02};
    color: ${isRead ? theme.colors.black_03 : theme.colors.black_02};
    border-top: 1px solid ${theme.colors.line_01}};
    display: flex;
    align-items: center;
    padding: 16px 20px;
    cursor: pointer;
  `}
`;

const ContentBox = styled.div`
  margin-left: 3%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Content = styled.div`
  ${({ theme }) => css`
    ${theme.typography.body04};
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    flex-wrap: wrap;
    max-width: 627px;
    width: 76vw;
  `}
`;

const TypeMessage = styled.div`
  ${({ theme }) => css`
    ${theme.typography.body03};
  `}
`;

const CreatedAt = styled.div`
  ${({ theme }) => css`
    ${theme.typography.caption_chip};
    color: ${theme.colors.black_04};
    display: flex;
    width: 100%;
    justify-content: flex-end;
  `}
`;

export default NotificationPage;
