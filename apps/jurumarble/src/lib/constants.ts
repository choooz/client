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

export const REGION_LIST = [
  { value: "gyeonggiDo", label: "경기도" },
  { value: "chungcheongDo", label: "충청도" },
  { value: "gyeongsangDo", label: "경상도" },
  { value: "gangwonDo", label: "강원도" },
  { value: "jeollaDo", label: "전라도" },
  { value: "seoul", label: "서울" },
  { value: "incheon", label: "인천" },
  { value: "sejong", label: "세종" },
  { value: "daejeon", label: "대전" },
  { value: "busan", label: "부산" },
  { value: "daegu", label: "대구" },
  { value: "gwangju", label: "광주" },
  { value: "ulsan", label: "울산" },
  { value: "jeju", label: "제주" },
];
