// enum 대신 const로 선언하여 타입 추론이 가능하도록 함 (enum은 타입 추론이 안됨)
// 라고 copilot이 말함

const Path = {
  // no Logged In
  LOGIN_PAGE: "/login",
  KAKAO_LOGIN_PROCESS: "/login/kakao-login-process",
  NAVER_LOGIN_PROCESS: "/login/naver-login-process",

  // logged In
  REGISTER_PAGE: "/register",
  POST_PAGE: "/post",
  MY_PAGE: "/my",
  PROFILE_EDIT: "/my/edit",

  // common
  MAIN_PAGE: "/",
  VOTE_DETAIL_PAGE: "/detail",
  SEARCH_PAGE: "/search",
} as const;

export default Path;
