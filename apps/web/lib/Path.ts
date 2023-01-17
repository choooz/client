// enum 대신 const로 선언하여 타입 추론이 가능하도록 함 (enum은 타입 추론이 안됨)
// 라고 copilot이 말함
const Path = {
  // no Logged In
  LOGIN_PAGE: "/login",
  KAKAO_LOGIN_PROCESS: "/login/kakaoLoginProcess",
  NAVER_LOGIN_PROCESS: "/login/naverLoginProcess",
  REGISTER_PAGE: "/register",
  REGISTER_INTERSTER_PAGE: "/register/interest",

  // logged In

  // common
  // @Note 더 적절한 페이지명 있으면 수정 바람
  LIST_PAGE: "/",
} as const;

export default Path;
