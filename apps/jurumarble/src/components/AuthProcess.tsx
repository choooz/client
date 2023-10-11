"use client";

import { useRouter } from "next/navigation";
import useGetUserInfo from "services/useGetUserInfo";
import Path from "lib/Path";

function AuthProcess() {
  const { userInfo } = useGetUserInfo();
  if (!userInfo) return null;
  const { gender, yearOfBirth, mbti } = userInfo!;
  const router = useRouter();
  if (!(gender && yearOfBirth && mbti)) router.replace(Path.REGISTER_PAGE);

  return <></>;
}

export default AuthProcess;
