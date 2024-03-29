import { dehydrate } from "@tanstack/react-query";
import { getUserInfo } from "lib/apis/user";
import getQueryClient from "lib/getQueryClient";
import HydrateOnClient from "lib/hydrateOnClient";
import { reactQueryKeys } from "lib/queryKeys";
import ProfileEditPage from "../page";

export default async function HydratedUserInfo() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(reactQueryKeys.userInfo(), getUserInfo);
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrateOnClient state={dehydratedState}>
      <ProfileEditPage />
    </HydrateOnClient>
  );
}
