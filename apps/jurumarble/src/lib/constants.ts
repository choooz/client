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
  { value: "SEOUL", label: "서울" },
  { value: "INCHEON", label: "인천" },
  { value: "DAEJEON", label: "대전" },
  { value: "DAEGU", label: "대구" },
  { value: "GWANGJU", label: "광주" },
  { value: "BUSAN", label: "부산" },
  { value: "ULSAN", label: "울산" },
  { value: "SEJONG", label: "세종" },
  { value: "GYEONGGI", label: "경기도" },
  { value: "GANGWON", label: "강원도" },
  { value: "CHUNGBUK", label: "충청북도" },
  { value: "CHUNGNAM", label: "충청남도" },
  { value: "GYEONGBUK", label: "경상북도" },
  { value: "GYEONGNAM", label: "경상남도" },
  { value: "JEONBUK", label: "전라북도" },
  { value: "JEONNAM", label: "전라남도" },
  { value: "JEJU", label: "제주" },
];

export const DRINK_VOTE_SORT_LIST = [
  { value: "ByPopularity", label: "인기순" },
  { value: "ByTime", label: "최신순" },
];

export const DRINK_INFO_SORT_LIST = [
  { value: "ByName", label: "이름순" },
  { value: "ByPopularity", label: "인기순" },
];

export const GENDER = {
  MALE: "MALE",
  FEMALE: "FEMALE",
} as const;

export const ALCOHOL_LEVEL_LIST = [
  {
    id: "LOW",
    label: "미주가",
    description: "도수가 비교적 낮은 맥주•막걸리•과실주 등 맛으로 즐기는 타입",
  },
  {
    id: "MEDIUM",
    label: "락주가",
    description: "도수가 비교적 낮은 맥주•막걸리•과실주 등 맛으로 즐기는 타입",
  },
  {
    id: "HIGH",
    label: "애주가",
    description: "높은 도수의 소주•위스키 등 독한 술을 사랑하는 타입",
  },
] as const;
export type AlcoholLevelTypes = (typeof ALCOHOL_LEVEL_LIST)[number]["id"];

export const MBTI_LIST = [
  { id: "ESTP", label: "ESTP" },
  { id: "ESFP", label: "ESFP" },
  { id: "ENFP", label: "ENFP" },
  { id: "ENTP", label: "ENTP" },
  { id: "ESTJ", label: "ESTJ" },
  { id: "ESFJ", label: "ESFJ" },
  { id: "ENFJ", label: "ENFJ" },
  { id: "ENTJ", label: "ENTJ" },
  { id: "ISTJ", label: "ISTJ" },
  { id: "ISFJ", label: "ISFJ" },
  { id: "INFJ", label: "INFJ" },
  { id: "INTJ", label: "INTJ" },
  { id: "ISTP", label: "ISTP" },
  { id: "ISFP", label: "ISFP" },
  { id: "INFP", label: "INFP" },
  { id: "INTP", label: "INTP" },
];
