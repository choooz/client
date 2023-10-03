import LevelChip from "components/LevelChip";
import { DrinkCapacityHigh, DrinkCapacityLow, DrinkCapacityMedium } from "public/images";
import Path from "./Path";

export const CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL || "";
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "";

export const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID || "";
export const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID || "";

export const KAKAO_MAP_API_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY || "";
export const KAKAO_LOGIN_REDIRECT_URL =
  process.env.NODE_ENV === "development"
    ? `http://localhost:3000/${Path.KAKAO_LOGIN_PROCESS}`
    : `${CLIENT_URL}${Path.KAKAO_LOGIN_PROCESS}`;
export const NAVER_LOGIN_REDIRECT_URL =
  process.env.NODE_ENV === "development"
    ? `http://localhost:3000${Path.NAVER_LOGIN_PROCESS}`
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

export const REGION_LIST_BOUNDS = [
  { value: "SEOUL", label: "서울", lat: 37.53391, long: 126.9775 },
  { value: "INCHEON", label: "인천", lat: 37.45323333333334, long: 126.70735277777779 },
  { value: "DAEJEON", label: "대전", lat: 36.347119444444445, long: 127.38656666666667 },
  { value: "DAEGU", label: "대구", lat: 35.868541666666665, long: 128.60355277777776 },
  { value: "GWANGJU", label: "광주", lat: 35.156974999999996, long: 126.85336388888888 },
  { value: "BUSAN", label: "부산", lat: 35.17701944444444, long: 129.07695277777776 },
  { value: "ULSAN", label: "울산", lat: 35.53540833333333, long: 129.3136888888889 },
  { value: "SEJONG", label: "세종", lat: 36.4800121, long: 127.289069 },
  { value: "GYEONGGI", label: "경기도", lat: 37.39067, long: 126.7888 },
  { value: "GANGWON", label: "강원도", lat: 38.642618, long: 127.170231 },
  { value: "CHUNGBUK", label: "충청북도", lat: 36.6325, long: 127.49358611111111 },
  { value: "CHUNGNAM", label: "충청남도", lat: 36.32387222222223, long: 127.42295555555556 },
  { value: "GYEONGBUK", label: "경상북도", lat: 36.491286, long: 128.889433 },
  { value: "GYEONGNAM", label: "경상남도", lat: 35.459369, long: 128.214826 },
  { value: "JEONBUK", label: "전라북도", lat: 35.81727, long: 127.11105277777777 },
  { value: "JEONNAM", label: "전라남도", lat: 34.813044444444444, long: 126.465 },
  { value: "JEJU", label: "제주", lat: 33.48569444444445, long: 126.50033333333333 },
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
    label: "아름다울 미(美)주가",
    description: "도수가 비교적 낮은 맥주•막걸리•과실주 등 맛으로 즐기는 타입",
    image: DrinkCapacityLow,
    levelChip: () => <LevelChip level={1} />,
  },
  {
    id: "MEDIUM",
    label: "즐거울 락(㦡)주가",
    description: "소주 등 술맛이 나야 진정한 술이라고 생각하는 타입",
    image: DrinkCapacityMedium,
    levelChip: () => <LevelChip level={2} />,
  },
  {
    id: "HIGH",
    label: "사랑할 애(愛)주가",
    description: "높은 도수의 소주•위스키 등 독한 술을 사랑하는 타입",
    image: DrinkCapacityHigh,
    levelChip: () => <LevelChip level={3} />,
  },
] as const;
export type DrinkCapacityTypes = (typeof ALCOHOL_LEVEL_LIST)[number]["id"];

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
