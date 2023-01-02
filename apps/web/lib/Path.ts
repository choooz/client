// enum 대신 const로 선언하여 타입 추론이 가능하도록 함 (enum은 타입 추론이 안됨)
// 라고 copilot이 말함
const Path = {
  // no Logged In
  LOGIN_PAGE: "/login",
  REGISTER_PAGE: "/register",

  // logged In

  // common
  // @Note 더 적절한 페이지명 있으면 수정 바람
  LIST_PAGE: "/",
  NOTFOUND: "/*",
} as const;

export default Path;
