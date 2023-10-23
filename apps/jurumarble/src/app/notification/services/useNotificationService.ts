/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getNotificationListAPI,
  readNotificationAPI,
} from 'lib/apis/notification';
import { queryKeys } from 'lib/queryKeys';
import { formatDate } from 'lib/utils/formatDate';

type ReadNotificationProps = Exclude<
  Parameters<typeof readNotificationAPI>[0],
  undefined
>;

const getQueryKey = [queryKeys.NOTIFICATION_LIST];

export default function useNotificationService() {
  const { data: notificationList, isLoading } = useQuery(
    getQueryKey,
    getNotificationListAPI,
    {
      select: (data) =>
        data.map((notification) => ({
          ...notification,
          createdAt: formatDate(notification.createdAt),
        })),
      staleTime: 0,
    },
  );

  const { mutate: readNotification } = useMutation(
    (notificationId: ReadNotificationProps) =>
      readNotificationAPI(notificationId),
  );

  return { notificationList, isLoading, readNotification };
}
