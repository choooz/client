import Path from "./Path";

export const CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL || "";
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "";

export const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID || "";
export const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID || "";
export const KAKAO_LOGIN_REDIRECT_URL =
  process.env.NODE_ENV === "development"
    ? `http://localhost:3000/${Path.KAKAO_LOGIN_PROCESS}`
    : `${CLIENT_URL}${Path.KAKAO_LOGIN_PROCESS}`;
export const NAVER_LOGIN_REDIRECT_URL =
  process.env.NODE_ENV === "development"
    ? `http://localhost:3000/${Path.NAVER_LOGIN_PROCESS}`
    : `${CLIENT_URL}${Path.NAVER_LOGIN_PROCESS}`;

// export const CATEGORY_NAMES = ["음식", "직업", "연애", "패션", "재미", "기타"];
export const CATEGORY_LIST = [
  { value: "", label: "전체" },
  { value: "NULL", label: "기타" },
  { value: "FOODS", label: "음식" },
  { value: "CAREER", label: "직업" },
  { value: "LOVE", label: "연애" },
  { value: "FASHION", label: "패션" },
  { value: "INTEREST", label: "재미" },
];

export const SORT_LIST = [
  { value: "ByTime", label: "최신순" },
  { value: "ByPoular", label: "인기순" },
];

export const AGE_LIST = [
  { id: "teenager", name: "10대" },
  { id: "twenties", name: "20대" },
  { id: "thirties", name: "30대" },
  { id: "tourties", name: "40대" },
  { id: "fifties", name: "50대+" },
];

export const MBTI_LIST = [
  { id: "ESTP", name: "ESTP" },
  { id: "ESFP", name: "ESFP" },
  { id: "ENFP", name: "ENFP" },
  { id: "ENTP", name: "ENTP" },
  { id: "ESTJ", name: "ESTJ" },
  { id: "ESFJ", name: "ESFJ" },
  { id: "ENFJ", name: "ENFJ" },
  { id: "ENTJ", name: "ENTJ" },
  { id: "ISTJ", name: "ISTJ" },
  { id: "ISFJ", name: "ISFJ" },
  { id: "INFJ", name: "INFJ" },
  { id: "INTJ", name: "INTJ" },
  { id: "ISTP", name: "ISTP" },
  { id: "ISFP", name: "ISFP" },
  { id: "INFP", name: "INFP" },
  { id: "INTP", name: "INTP" },
];
