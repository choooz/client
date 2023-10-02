"use client";

import { AlcoholLevelTypes } from "lib/constants";
import { createContext, PropsWithChildren, useMemo, useState } from "react";
import {
  GenderTypes,
  NumberPadTypes,
  RegisterStepTypes,
  REGISTER_STEPS_CONTENT,
  YearOfBirthType,
} from "../constants";

export const RegisterContext = createContext<{
  step: RegisterStepTypes;
  onNextStep: () => void;
  stepList: RegisterStepTypes[];
  currentStepIndex: number;
  alcoholLevel: AlcoholLevelTypes | null;
  gender: GenderTypes | null;
  yearOfBirth: YearOfBirthType | null;
  buttonDisabled: boolean;
  onChangeAlcoholLevel: (value: AlcoholLevelTypes) => void;
  onChangeGender: (value: GenderTypes) => void;
  onChangeYearOfBirth: (value: string) => void;
  onDeleteYearOfBirth: () => void;
}>({
  step: "STEP1",
  onNextStep: () => {},
  stepList: [],
  currentStepIndex: 0,
  gender: null,
  alcoholLevel: null,
  yearOfBirth: "",
  buttonDisabled: false,
  onChangeAlcoholLevel: () => {},
  onChangeGender: () => {},
  onChangeYearOfBirth: () => {},
  onDeleteYearOfBirth: () => {},
});

export const RegisterProvider = ({ children }: PropsWithChildren) => {
  const [step, setStep] = useState<RegisterStepTypes>("STEP1");

  const [alcoholLevel, setAlcoholLevel] = useState<AlcoholLevelTypes | null>(null);
  const [gender, setGender] = useState<GenderTypes | null>(null);
  const [yearOfBirth, setYearOfBirth] = useState<YearOfBirthType | null>("");

  const stepList = Object.keys(REGISTER_STEPS_CONTENT) as RegisterStepTypes[];
  const currentStepIndex =
    stepList.findIndex((item) => item === step) > -1
      ? stepList.findIndex((item) => item === step) + 1
      : 1;

  const onNextStep = () => {
    if (currentStepIndex < stepList.length) {
      setStep(stepList[currentStepIndex]);
    }
  };

  const onChangeAlcoholLevel = (value: AlcoholLevelTypes) => {
    if (alcoholLevel === value) {
      setAlcoholLevel(null);
      return;
    }
    setAlcoholLevel(value);
  };

  const onChangeGender = (value: GenderTypes) => {
    if (gender === value) {
      setGender(null);
      return;
    }

    setGender(value);
  };

  const onChangeYearOfBirth = (value: NumberPadTypes) => {
    setYearOfBirth((prev) => (prev?.length === 4 ? prev : prev + value));
  };
  const onDeleteYearOfBirth = () => {
    setYearOfBirth("");
  };

  const buttonDisabled = useMemo(() => {
    if (step === "STEP1") {
      return alcoholLevel === null;
    }

    if (step === "STEP2") {
      return gender === null;
    }

    if (step === "STEP3") {
      return yearOfBirth === "" || yearOfBirth?.length !== 4;
    }

    return false;
  }, [step, alcoholLevel, gender, yearOfBirth]);

  const value = useMemo(
    () => ({
      step,
      onNextStep,
      stepList,
      gender,
      currentStepIndex,
      alcoholLevel,
      yearOfBirth,
      buttonDisabled,
      onChangeAlcoholLevel,
      onChangeGender,
      onChangeYearOfBirth,
      onDeleteYearOfBirth,
    }),
    [
      step,
      onNextStep,
      stepList,
      gender,
      currentStepIndex,
      alcoholLevel,
      yearOfBirth,
      buttonDisabled,
      onChangeGender,
      onChangeAlcoholLevel,
      onChangeYearOfBirth,
      onDeleteYearOfBirth,
    ],
  );

  return <RegisterContext.Provider value={value}>{children}</RegisterContext.Provider>;
};
