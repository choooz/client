"use client";

import { Button } from "components/button";
import VoteHeader from "components/VoteHeader";
import { useRouter } from "next/navigation";
import { SvgIcPrevious, SvgNotificationCheck } from "src/assets/icons/components";
import styled, { css, useTheme } from "styled-components";
import useNotificationService from "./services/useNotificationService";

const NOTIFICATION_TYPE = {
  VOTE: "VOTE",
  COMMENT: "투표에 댓글이 달렸어요",
};

// const eventSource = new EventSource("/api/notification/subscribe");

function NotificationPage() {
  const router = useRouter();
  const { notificationList } = useNotificationService();
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
      <NotificationItem>
        <SvgNotificationCheck width={32} height={32} fill={colors.black_04} />
        <ContentBox>
          <Content>부산에놀러가는데술추천좀해주</Content>
          <TypeMessage>투표에 댓글이 달렸어요.</TypeMessage>
          <CreatedAt>1분전</CreatedAt>
        </ContentBox>
      </NotificationItem>
    </>
  );
}

const PreviousButton = styled(Button)`
  ${({ theme }) => css`
    background-color: ${theme.colors.white};
    margin-left: 20px;
  `}
`;

const NotificationItem = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.black_02};
    display: flex;
    padding: 16px 20px;
    border-top: 1px solid ${theme.colors.line_01}};
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
    ${theme.typography.caption};
    color: ${theme.colors.black_04};
    display: flex;
    width: 100%;
    justify-content: flex-end;
  `}
`;

export default NotificationPage;
