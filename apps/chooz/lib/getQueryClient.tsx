import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

// `QueryClient` 의 요청 범위 싱글톤 인스턴스를 만든다.
// 이렇게 하면 서로 다른 사용자와 요청 간에 데이터가 공유되지 않고 여전히 요청당 한 번만 QueryClient를 생성한다.
const getQueryClient = cache(() => new QueryClient());
export default getQueryClient;
