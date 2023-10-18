import { http } from './http/http';

export type NotificationType = 'VOTE' | 'COMMENT' | 'ADMIN_NOTIFY';

interface Notification {
  id: number;
  url: string;
  content: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: string;
}

type GetNotificationListResponse = Notification[];

export const getNotificationListAPI = async () => {
  const response = await http.get<GetNotificationListResponse>(
    '/api/notifications',
  );
  return response.data;
};

export const readNotificationAPI = async (id: number) => {
  const response = await http.post(`/api/notifications/${id}/read`);
  return response.data;
};
