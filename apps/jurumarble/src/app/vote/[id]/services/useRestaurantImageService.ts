import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getRestaurantImageAPI,
  postRestaurantImageAPI,
} from 'lib/apis/restaurant';
import { queryKeys } from 'lib/queryKeys';

type GetRestaurantImageListParams = Exclude<
  Parameters<typeof getRestaurantImageAPI>[0],
  undefined
>;
type PostRestaurantImageParams = Exclude<
  Parameters<typeof postRestaurantImageAPI>[0],
  undefined
>;

const getRestaurantImageListQueryKey = (
  getRestaurantImageListParams: GetRestaurantImageListParams,
) => [queryKeys.RESTAURANT_IMAGE_LIST, getRestaurantImageListParams];

export default function useRestaurantImageService(
  getRestaurantImageListParams: GetRestaurantImageListParams,
) {
  const { data: restaurantImageList } = useQuery(
    getRestaurantImageListQueryKey(getRestaurantImageListParams),
    () => getRestaurantImageAPI(getRestaurantImageListParams),
    {
      enabled: !!getRestaurantImageListParams.contentId,
    },
  );

  const queryClient = useQueryClient();

  const { mutate: postRestaurantImage } = useMutation(
    (postRestaurantImageParams: PostRestaurantImageParams) =>
      postRestaurantImageAPI(postRestaurantImageParams),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.DETAIL_COMMENT_LIST]);
      },
    },
  );

  return { restaurantImageList, postRestaurantImage };
}
