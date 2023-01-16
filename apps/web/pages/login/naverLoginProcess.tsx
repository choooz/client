import { naverLoginAPI } from "lib/api/auth";
import Path from "lib/Path";
import userStorage from "lib/utils/userStorage";
import { useRouter } from "next/router";
import { useEffect } from "react";

function naverLoginProcess() {
  const router = useRouter();
  const code = router.query.code ?? "";

  useEffect(() => {
    if (code) {
      naverLogin();
    }
  }, [code]);

  const naverLogin = async () => {
    try {
      const { accessToken, newUser } = await naverLoginAPI({ code, state: "test" });
      userStorage.set(accessToken);
      newUser ? router.push(Path.REGISTER_PAGE) : router.push(Path.LIST_PAGE);
    } catch (error) {
      alert("에러가 발생하였습니다.");
    }
  };
  return <div>스피너</div>;
}

export default naverLoginProcess;
