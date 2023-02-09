export type CategoryNameType = "FOODS" | "CAREER" | "LOVE" | "FASHION" | "INTEREST" | "NULL";

export type Direction = "left" | "right";

export type ActiveType = "active" | "inactive" | null;

export interface Writer {
  imageUrl: string;
  nickname: string;
  userid: number;
}
export interface Vote {
  voteId: number;
  category: CategoryNameType;
  totalTitle: string;
  writer: Writer;
  filteredAge: number;
  filteredGender: boolean;
  filteredMbti: string;
}
