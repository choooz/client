/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
    },
  );

  const queryClient = useQueryClient();

  const { mutate: readNotification } = useMutation(
    (notificationId: ReadNotificationProps) =>
      readNotificationAPI(notificationId),
    {
      async onMutate(notificationId) {
        await queryClient.cancelQueries(getQueryKey);
        const previousData = queryClient.getQueryData(getQueryKey);
        queryClient.setQueryData(getQueryKey, (old: any) => [
          old,
          notificationId,
        ]);
        return { previousData };
      },
      onError(err, notificationId, context) {
        queryClient.setQueryData(getQueryKey, context?.previousData);
      },

      onSettled() {
        queryClient.invalidateQueries({ queryKey: getQueryKey });
      },
    },
  );

  return { notificationList, isLoading, readNotification };
}
