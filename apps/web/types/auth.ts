export interface MBTIType {
  M: "E" | "I" | null;
  B: "S" | "N" | null;
  T: "T" | "F" | null;
  I: "J" | "P" | null;
}

export enum Gender {
  MALE = "male",
  FEMALE = "female",
}

export interface UserModel {
  gender: "male" | "female" | null;
  MBTI: MBTIType;
  age: number | null;
}
