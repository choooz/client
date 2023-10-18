'use client';

import VoteHeader from 'components/VoteHeader';
import { Button } from 'components/button';
import { NotificationType } from 'lib/apis/notification';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { DrinkImage } from 'public/images';
import {
  SvgIcPrevious,
  SvgNotificationCheck,
} from 'src/assets/icons/components';
import styled, { css, useTheme } from 'styled-components';

import useNotificationService from './services/useNotificationService';

const NOTIFICATION_TYPE: Record<NotificationType, string> = {
  VOTE: '투표에 10명 이상이 참여했어요.',
  COMMENT: '투표에 댓글이 달렸어요.',
  ADMIN_NOTIFY: '관리자 알림',
};

function NotificationPage() {
  const router = useRouter();
  const { notificationList, isLoading, readNotification } =
    useNotificationService();
  const { colors } = useTheme();

  return (
    <>
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
      ) : !notificationList ? (
        <EmptyNotification>
          <Image alt="" src={DrinkImage} style={{ borderRadius: '100px' }} />
          받은 알림이 없어요.
        </EmptyNotification>
      ) : (
        <NotificationList>
          {notificationList.map(({ content, createdAt, id, type, isRead }) => (
            <NotificationItem
              key={id}
              isRead={isRead}
              onClick={() => readNotification(id)}
            >
              <SvgNotificationCheck
                width={32}
                height={32}
                fill={isRead ? colors.black_04 : colors.main_01}
              />
              <ContentBox>
                <Content>{content}</Content>
                <TypeMessage>{NOTIFICATION_TYPE[type]}</TypeMessage>
                <CreatedAt>{createdAt}</CreatedAt>
              </ContentBox>
            </NotificationItem>
          ))}
        </NotificationList>
      )}
    </>
  );
}

const EmptyNotification = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 22px;
  margin-top: 16%;
`;

const PreviousButton = styled(Button)`
  ${({ theme }) => css`
    background-color: ${theme.colors.white};
    margin-left: 20px;
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
