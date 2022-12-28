import { RegisterTemplate, transitions } from "@chooz/ui";
import { CheckRound, Female, Male, PurpleMonster } from "assets/images";
import Image from "next/image";
import styled, { css } from "styled-components";
import { palette } from "styles/palette";

interface Props {
  gender: "female" | "male" | "";
  onChangeSelectMale(): void;
  onChangeSelectFemale(): void;
  onAddProgress(number: number): void;
}

function GenderSelection({
  gender,
  onChangeSelectMale,
  onChangeSelectFemale,
  onAddProgress,
}: Props) {
  // const animateButton = (e: any) => {
  //   e.preventDefault();
  //   //reset animation
  //   e.target.classList.remove("animate");

  //   e.target.classList.add("animate");
  //   setTimeout(function () {
  //     e.target.classList.remove("animate");
  //   }, 500);
  // };

  return (
    <RegisterTemplate
      welcomeText={
        <>
          <Image src={PurpleMonster} alt="캐릭터" width={30} />
          반가워요!
        </>
      }
      questionText={
        <>
          Lv.1 당신의&nbsp;<strong>성별</strong>은?
        </>
      }
      buttonBox={
        <Button
          onClick={() => onAddProgress(1)}
          disabled={gender.length < 1}
          effect={gender.length > 1}
        >
          다음
        </Button>
      }
    >
      <LeftVote selected={gender === "male"} onClick={onChangeSelectMale}>
        <ImageWrapper>
          <Image alt="남성" height={100} src={Male} />
        </ImageWrapper>
        {gender === "male" ? (
          <VoteText>
            <Image alt="선택" src={CheckRound} width={16} />
            남성으로 Chooz!
          </VoteText>
        ) : (
          "남성"
        )}
      </LeftVote>
      <RightVote selected={gender === "female"} onClick={onChangeSelectFemale}>
        <ImageWrapper>
          <Image alt="여성" height={100} src={Female} />
        </ImageWrapper>
        {gender === "female" ? (
          <VoteText>
            <Image alt="선택" src={CheckRound} width={16} />
            여성으로 Chooz!
          </VoteText>
        ) : (
          "여성"
        )}
      </RightVote>
    </RegisterTemplate>
  );
}

const LeftVote = styled.div<{ selected: boolean }>`
  position: absolute;
  width: 48%;
  height: 100%;
  border-radius: 4px;
  background-color: ${palette.border.lighter};
  border: 1px solid ${palette.border.lightest};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 18px;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: rgba(140, 130, 255, 50%);
  }
  ${({ selected }) =>
    selected
      ? css`
          animation: ${transitions.blink} 0.7s ease-in-out;
          width: 91%;
          border: 1px solid #863dff;
          background-color: rgba(140, 130, 255, 50%);
          font-size: 16px;
          font-weight: 700;
          color: #190665;
          z-index: 999;
        `
      : css`
          z-index: 1;
        `}
`;

const RightVote = styled(LeftVote)`
  right: 0;
`;

const VoteText = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const ImageWrapper = styled.div`
  flex: 0.8;
  display: flex;
  align-items: center;
`;
const Button = styled.button<{ effect: boolean }>`
  width: 100%;
  height: 56px;
  background-color: #863dff;
  color: white;
  border-radius: 4px;
  animation: ${transitions.delaypopInFromBottom} 1.5s normal ease-in-out;
  font-weight: 700;
  transition: all 0.3s ease-in-out;
  :disabled {
    background-color: #e5e5ec;
    color: #999999;
  }

  /* &:focus {
    outline: 0;
  }

  &:before,
  &:after {
    position: absolute;
    content: "";
    display: block;
    width: 140%;
    height: 100%;
    left: -20%;
    z-index: -1000;
    transition: all ease-in-out 0.5s;
    background-repeat: no-repeat;
  }

  &:before {
    display: none;
    top: -75%;
    background-image: radial-gradient(circle, #ff0081 20%, transparent 20%),
      radial-gradient(circle, transparent 20%, #ff0081 20%, transparent 30%),
      radial-gradient(circle, #ff0081 20%, transparent 20%),
      radial-gradient(circle, #ff0081 20%, transparent 20%),
      radial-gradient(circle, transparent 10%, #ff0081 15%, transparent 20%),
      radial-gradient(circle, #ff0081 20%, transparent 20%),
      radial-gradient(circle, #ff0081 20%, transparent 20%),
      radial-gradient(circle, #ff0081 20%, transparent 20%),
      radial-gradient(circle, #ff0081 20%, transparent 20%);
    background-size: 10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%, 15% 15%, 10% 10%, 18% 18%;
    //background-position: 0% 80%, -5% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%, 50% 50%, 65% 20%, 85% 30%;
  }

  &:after {
    display: none;
    bottom: -75%;
    background-image: radial-gradient(circle, #ff0081 20%, transparent 20%),
      radial-gradient(circle, #ff0081 20%, transparent 20%),
      radial-gradient(circle, transparent 10%, #ff0081 15%, transparent 20%),
      radial-gradient(circle, #ff0081 20%, transparent 20%),
      radial-gradient(circle, #ff0081 20%, transparent 20%),
      radial-gradient(circle, #ff0081 20%, transparent 20%),
      radial-gradient(circle, #ff0081 20%, transparent 20%);
    background-size: 15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 10% 10%, 20% 20%;
    //background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%, 40% 90%, 55% 90%, 70% 90%;
  }

  &:active {
    transform: scale(0.9);
    background-color: darken(#ff0081, 5%);
    box-shadow: 0 2px 25px rgba(255, 0, 130, 0.2);
  }

  &.animate {
    &:before {
      display: block;
      animation: topBubbles ease-in-out 0.75s forwards;
    }
    &:after {
      display: block;
      animation: bottomBubbles ease-in-out 0.75s forwards;
    }
  }

  @keyframes topBubbles {
    0% {
      background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%, 40% 90%, 55% 90%,
        70% 90%;
    }
    50% {
      background-position: 0% 80%, 0% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%, 50% 50%, 65% 20%,
        90% 30%;
    }
    100% {
      background-position: 0% 70%, 0% 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%, 50% 40%, 65% 10%,
        90% 20%;
      background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
    }
  }

  @keyframes bottomBubbles {
    0% {
      background-position: 10% -10%, 30% 10%, 55% -10%, 70% -10%, 85% -10%, 70% -10%, 70% 0%;
    }
    50% {
      background-position: 0% 80%, 20% 80%, 45% 60%, 60% 100%, 75% 70%, 95% 60%, 105% 0%;
    }
    100% {
      background-position: 0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%, 110% 10%;
      background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
    }
  } */
`;

export default GenderSelection;
