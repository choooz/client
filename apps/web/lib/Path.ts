// enum 대신 const로 선언하여 타입 추론이 가능하도록 함 (enum은 타입 추론이 안됨)
// 라고 copilot이 말함
const Path = {
  // no Logged In
  LOGIN_PAGE: "/login",
  KAKAO_LOGIN_PROCESS: "/login/kakaoLoginProcess",
  NAVER_LOGIN_PROCESS: "/login/naverLoginProcess",

  // logged In
  REGISTER_PAGE: "/register",
  REGISTER_INTERSTER_PAGE: "/register/interest",
  POST_PAGE: "/post",

  // common
  MAIN_PAGE: "/",
  VOTE_LIST_PAGE: "/voteList",
  VOTE_DETAIL_PAGE: "/detail",
} as const;

export default Path;
