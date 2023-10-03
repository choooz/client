"use client";

import { useMutation } from "@tanstack/react-query";
import { addUserInfo } from "lib/apis/user";
import { DrinkCapacityTypes } from "lib/constants";
import { createContext, PropsWithChildren, useMemo, useState } from "react";
import {
  Direction,
  GenderTypes,
  MBTIType,
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
  drinkCapacity: DrinkCapacityTypes | null;
  gender: GenderTypes | null;
  yearOfBirth: YearOfBirthType | null;
  MBTI: MBTIType;
  buttonDisabled: boolean;
  onChangeDrinkCapacity: (value: DrinkCapacityTypes) => void;
  onChangeGender: (value: GenderTypes) => void;
  onChangeYearOfBirth: (value: string) => void;
  onDeleteYearOfBirth: () => void;
  onChangeMBTI: ({ name, value }: { name: string; value: string }) => void;
  activeValue: (
    direction: Direction,
    MBTIKey: "M" | "B" | "T" | "I",
  ) => "active" | "inactive" | null;
}>({
  step: "STEP1",
  onNextStep: () => {},
  stepList: [],
  currentStepIndex: 0,
  gender: null,
  drinkCapacity: null,
  yearOfBirth: "",
  MBTI: {
    M: null,
    B: null,
    T: null,
    I: null,
  },
  buttonDisabled: false,
  onChangeDrinkCapacity: () => {},
  onChangeGender: () => {},
  onChangeYearOfBirth: () => {},
  onDeleteYearOfBirth: () => {},
  onChangeMBTI: () => {},
  activeValue: () => null,
});

export const RegisterProvider = ({ children }: PropsWithChildren) => {
  const [step, setStep] = useState<RegisterStepTypes>("STEP1");

  const [drinkCapacity, setDrinkCapacity] = useState<DrinkCapacityTypes | null>(null);
  const [gender, setGender] = useState<GenderTypes | null>(null);
  const [yearOfBirth, setYearOfBirth] = useState<YearOfBirthType | null>("");
  const [MBTI, setMBTI] = useState<MBTIType>({
    M: null,
    B: null,
    T: null,
    I: null,
  });

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

  const onChangeDrinkCapacity = (value: DrinkCapacityTypes) => {
    if (drinkCapacity === value) {
      setDrinkCapacity(null);
      return;
    }
    setDrinkCapacity(value);
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

  const onChangeMBTI = ({ name, value }: { name: string; value: string }) => {
    setMBTI((prev) => ({ ...prev, [name]: value }));
  };

  const getMBTI = (direction: Direction, MBTIKey: "M" | "B" | "T" | "I") => {
    const lookupTable: Record<Direction, Record<"M" | "B" | "T" | "I", string>> = {
      left: { M: "E", B: "S", T: "T", I: "J" },
      right: { M: "I", B: "N", T: "F", I: "P" },
    };
    return lookupTable[direction][MBTIKey];
  };

  const activeValue = (
    direction: Direction,
    MBTIKey: "M" | "B" | "T" | "I",
  ): "active" | "inactive" | null => {
    if (!MBTI[MBTIKey]) return null;
    return `${MBTI[MBTIKey] === getMBTI(direction, MBTIKey) ? "" : "in"}active`;
  };

  const buttonDisabled = useMemo(() => {
    if (step === "STEP1") {
      return drinkCapacity === null;
    }

    if (step === "STEP2") {
      return gender === null;
    }

    if (step === "STEP3") {
      return yearOfBirth === "" || yearOfBirth?.length !== 4;
    }

    if (step === "STEP4") {
      return Object.values(MBTI).some((value) => value === null);
    }

    return false;
  }, [step, drinkCapacity, gender, yearOfBirth, MBTI]);

  const value = useMemo(
    () => ({
      step,
      onNextStep,
      stepList,
      gender,
      currentStepIndex,
      drinkCapacity,
      yearOfBirth,
      MBTI,
      buttonDisabled,
      onChangeDrinkCapacity,
      onChangeGender,
      onChangeYearOfBirth,
      onDeleteYearOfBirth,
      onChangeMBTI,
      activeValue,
    }),
    [
      step,
      onNextStep,
      stepList,
      gender,
      currentStepIndex,
      drinkCapacity,
      yearOfBirth,
      MBTI,
      buttonDisabled,
      onChangeGender,
      onChangeDrinkCapacity,
      onChangeYearOfBirth,
      onDeleteYearOfBirth,
      onChangeMBTI,
      activeValue,
    ],
  );

  return <RegisterContext.Provider value={value}>{children}</RegisterContext.Provider>;
};
