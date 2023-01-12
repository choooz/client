import { RegisterTemplate, transitions } from "@chooz/ui";
import { CheckRound, Female, Male, PurpleMonster } from "public/images";
import { media } from "@chooz/ui/styles/media";
import Image from "next/image";
import styled, { css } from "styled-components";
import { Gender } from "types/auth";

interface Props {
  gender: "female" | "male" | null;
  onChangeProgress(number: number): void;
  onChangeGender(gender: Gender): void;
}

function GenderSelection({ gender, onChangeProgress, onChangeGender }: Props) {
  type Direction = "left" | "right";

  const getGender = (direction: Direction) => {
    return direction === "left" ? "female" : "male";
  };

  const activeValue = (direction: Direction): "active" | "inactive" | null => {
    if (!gender) return null;
    return `${gender === getGender(direction) ? "in" : ""}active`;
  };

  return (
    <RegisterTemplate
      welcomeText={
        <>
          반가워요! <Image src={PurpleMonster} alt="캐릭터" width={30} />
        </>
      }
      question="Lv.1 당신의&nbsp 성별은?"
      search="성별"
      nextButtonText="다음"
      nextButtonProps={{
        onClick: () => onChangeProgress(1),
        disabled: !gender,
      }}
    >
      <LeftVote selected={activeValue("left")} onClick={() => onChangeGender(Gender.MALE)}>
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
      <RightVote selected={activeValue("right")} onClick={() => onChangeGender(Gender.FEMALE)}>
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

const variantStyles = {
  active: css`
    animation: ${transitions.blink} 0.7s ease-in-out;
    width: 64%;
    border: 1px solid ${({ theme }) => theme.palette.main.point};
    background-color: ${({ theme }) => theme.palette.background.selected};
    font-size: 16px;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.main.sub};
    ${media.medium} {
      width: 74%;
    }
  `,
  inactive: css`
    width: 36%;
    opacity: 0.5;
    ${media.medium} {
      width: 23%;
    }
  `,
};

const typeGuardVariantStyle = (selected: "active" | "inactive" | null) => {
  if (!selected) return null;
  return variantStyles[selected];
};

const LeftVote = styled.div<{ selected: "active" | "inactive" | null }>`
  position: absolute;
  width: 48%;
  height: 100%;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.background.soft};
  border: 1px solid ${({ theme }) => theme.palette.border.base};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 18px;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: ${({ theme }) => theme.palette.background.selectedSoft};
  }
  ${({ selected }) => typeGuardVariantStyle(selected)}
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

export default GenderSelection;
