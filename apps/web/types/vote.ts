import { PostVotingRequest } from "lib/apis/vote";
import { Career, Etc, Fashion, Food, Interest, Love } from "public/icons";
import { StaticImageData } from "next/image";

// @Todo ui타입과 api타입을 분리해야할 것 같다. null값 땜시
export type CategoryNameType = "FOODS" | "CAREER" | "LOVE" | "FASHION" | "INTEREST" | "ETC";

// export const CATEGORY_NAMES = ["음식", "직업", "연애", "패션", "재미", "기타"];
export const CATEGORY_LIST: {
  value: CategoryNameType;
  label: string;
}[] = [
  { value: "ETC", label: "기타" },
  { value: "FOODS", label: "음식" },
  { value: "CAREER", label: "직업" },
  { value: "LOVE", label: "연애" },
  { value: "FASHION", label: "패션" },
  { value: "INTEREST", label: "재미" },
];

export const SELECT_BOX_CATEGORY_LIST = [{ value: "", label: "전체" }].concat(CATEGORY_LIST);

const CATEGORY_IMAGE = [Etc, Food, Career, Love, Fashion, Interest];

export const IMAGE_CATEGORY_LIST: {
  image: StaticImageData;
  value: CategoryNameType;
  label: string;
}[] = CATEGORY_LIST.map((category, index) => ({
  image: CATEGORY_IMAGE[index],
  ...category,
}));

export type Direction = "left" | "right";

export type ActiveType = "active" | "inactive" | null;

export type GenderType = "FEMALE" | "MALE" | null;
export interface Writer {
  imageUrl: string;
  nickname: string;
  userid: number;
}
export interface Vote {
  titleA: string;
  titleB: string;
  voteId: number;
  detail: string;
  category: CategoryNameType | null;
  title: string;
  writer: Writer;
  filteredAge: string | null;
  filteredGender: GenderType | null;
  filteredMbti: string | null;
  modifiedDate: string;
  countVoted: number;
  imageA: string | null;
  imageB: string | null;
}

export type AorB = "A" | "B";

export type Voting = PostVotingRequest;

export type SortOption = "ByTime" | "ByPoular";
export interface Filter {
  gender: string;
  mbti: string;
  age: string;
}
