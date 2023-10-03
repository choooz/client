import {
  RegisterDrinkCapacitySection,
  RegisterBirthSection,
  RegisterGenderSection,
} from "./sections";
import RegisterMBTISection from "./sections/RegisterMBTISection";

export const REGISTER_STEPS_CONTENT = {
  STEP1: {
    title: "평소에 어떤 술을 즐기시나요?",
    subTitle: "여행의 즐거움을 더할 우리술을 추천드릴게요.",
    component: () => <RegisterDrinkCapacitySection />,
  },
  STEP2: {
    title: "여행자님의 성별은 무엇인가요?",
    subTitle: "같은 성별이 선호하는 우리술이 무엇인지 추천드릴게요",
    component: () => <RegisterGenderSection />,
  },
  STEP3: {
    title: "여행자님의 출생년도는 어떻게 되나요?",
    subTitle: "비슷한 나이대의 여행자들이 선호하는 우리술이 무엇인지 추천드릴게요.",
    component: () => <RegisterBirthSection />,
  },
  STEP4: {
    title: "여행자님의 MBTI는 무엇인가요?",
    subTitle: "같은 MBTI의 여행자들이 선호하는 우리술을 추천드릴게요.",
    component: () => <RegisterMBTISection />,
  },
} as const;

export type RegisterStepTypes = keyof typeof REGISTER_STEPS_CONTENT;

export const NumberPad = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

export type NumberPadTypes = (typeof NumberPad)[number];

export type YearOfBirthType = NumberPadTypes;
