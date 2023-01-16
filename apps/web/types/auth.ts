export interface MBTIType {
  M: "E" | "I" | null;
  B: "S" | "N" | null;
  T: "T" | "F" | null;
  I: "J" | "P" | null;
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export interface UserModel {
  gender: "MALE" | "FEMALE" | null;
  MBTI: MBTIType;
  age: string | null;
}

export type SocialType = "NAVER" | "KAKAO";
