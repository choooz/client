"use client";

import { AlcoholLevelTypes } from "lib/constants";
import { createContext, PropsWithChildren, useMemo, useState } from "react";
import { GenderTypes, RegisterStepTypes, REGISTER_STEPS_CONTENT } from "../constants";

export const RegisterContext = createContext<{
  step: RegisterStepTypes;
  onNextStep: () => void;
  stepList: RegisterStepTypes[];
  currentStepIndex: number;
  alcoholLevel: AlcoholLevelTypes | null;
  gender: GenderTypes | null;
  buttonDisabled: boolean;
  onChangeAlcoholLevel: (value: AlcoholLevelTypes) => void;
  onChangeGender: (value: GenderTypes) => void;
}>({
  step: "STEP1",
  onNextStep: () => {},
  stepList: [],
  currentStepIndex: 0,
  gender: null,
  alcoholLevel: null,
  buttonDisabled: false,
  onChangeAlcoholLevel: () => {},
  onChangeGender: () => {},
});

export const RegisterProvider = ({ children }: PropsWithChildren) => {
  const [step, setStep] = useState<RegisterStepTypes>("STEP1");

  const [alcoholLevel, setAlcoholLevel] = useState<AlcoholLevelTypes | null>(null);
  const [gender, setGender] = useState<GenderTypes | null>(null);

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

  const buttonDisabled = useMemo(() => {
    if (step === "STEP1") {
      return alcoholLevel === null;
    }

    if (step === "STEP2") {
      return gender === null;
    }

    return false;
  }, [step, alcoholLevel, gender]);

  const value = useMemo(
    () => ({
      step,
      onNextStep,
      stepList,
      gender,
      currentStepIndex,
      alcoholLevel,
      buttonDisabled,
      onChangeAlcoholLevel,
      onChangeGender,
    }),
    [
      step,
      onNextStep,
      stepList,
      gender,
      currentStepIndex,
      alcoholLevel,
      buttonDisabled,
      onChangeGender,
      onChangeAlcoholLevel,
    ],
  );

  return <RegisterContext.Provider value={value}>{children}</RegisterContext.Provider>;
};
