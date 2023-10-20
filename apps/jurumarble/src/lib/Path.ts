// enum 대신 const로 선언하여 타입 추론이 가능하도록 함 (enum은 타입 추론이 안됨)
// 라고 copilot이 말함

const Path = {
  AGREEMENT_PAGE: '/agreement',
  DRINK_INFO_PAGE: '/drink-info',
  DRINK_MAP_PAGE: '/map',
  HELP_PAGE: '/help',
  KAKAO_LOGIN_PROCESS: '/login/kakao-login-process',
  // no Logged In
  LOGIN_PAGE: '/login',

  // common
  MAIN_PAGE: '/',
  MY_PAGE: '/my',
  NAVER_LOGIN_PROCESS: '/login/naver-login-process',
  NOTIFICATION_PAGE: '/notification',
  ONBOARDING_PAGE: '/onboarding',
  POST_PAGE: '/vote/post',
  PROFILE_EDIT: '/my/edit',

  // logged In
  REGISTER_PAGE: '/register',
  SEARCH_PAGE: '/search',
  STAMP_PAGE: '/stamp',
  TEST_PAGE: '/test',
  VOTE_DETAIL_PAGE: '/vote',
  VOTE_HOME: '/vote',
} as const;

export default Path;
