export type CategoryNameType = "FOODS" | "CAREER" | "LOVE" | "FASHION" | "INTEREST" | "NULL";

export type Direction = "left" | "right";

export type ActiveType = "active" | "inactive" | null;

export type GenderType = "FEMALE" | "MALE" | null;
export interface Writer {
  imageUrl: string;
  nickname: string;
  userid: number;
}
export interface Vote {
  voteId: number;
  category: CategoryNameType | null;
  totalTitle: string;
  writer: Writer;
  filteredAge: string | null;
  filteredGender: GenderType | null;
  filteredMbti: string | null;
  modifiedDate: string;
  countVoted: number;
  imageA: string | null;
  imageB: string | null;
  titleA: string | null;
  titleB: string | null;
}
