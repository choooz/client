import { Button, RegisterTemplate, transitions } from "@chooz/ui";
import { CheckRound, Female, Male, PurpleMonster } from "public/images";
import { media } from "@chooz/ui/styles/media";
import Image from "next/image";
import styled, { css } from "styled-components";
import { Gender } from "types/user";

type GenderType = "FEMALE" | "MALE" | null;

interface Props {
  gender: GenderType;
  onChangeProgress(number: number): void;
  onChangeGender(gender: Gender): void;
}

type Direction = "left" | "right";
type ActiveType = "active" | "inactive" | null;

function GenderSelection({ gender, onChangeProgress, onChangeGender }: Props) {
  const getGender = (direction: Direction) => {
    return direction === "left" ? "FEMALE" : "MALE";
  };

  const activeValue = (direction: Direction): ActiveType => {
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
      <LeftVote
        variant="inactive"
        width="48%"
        height="100%"
        selected={activeValue("left")}
        onClick={() => onChangeGender(Gender.MALE)}
      >
        <ImageWrapper>
          <Image alt="남성" height={100} src={Male} />
        </ImageWrapper>
        {gender === "MALE" ? (
          <VoteText>
            <Image alt="선택" src={CheckRound} width={16} />
            남성으로 Chooz!
          </VoteText>
        ) : (
          "남성"
        )}
      </LeftVote>
      <RightVote
        variant="inactive"
        width="48%"
        height="100%"
        selected={activeValue("right")}
        onClick={() => onChangeGender(Gender.FEMALE)}
      >
        <ImageWrapper>
          <Image alt="여성" height={100} src={Female} />
        </ImageWrapper>
        {gender === "FEMALE" ? (
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
    width: 63%;
    font-weight: 700;
    border: 1px solid ${({ theme }) => theme.palette.main.point};
    background-color: ${({ theme }) => theme.palette.background.selected};
    ${({ theme }) => theme.textStyle.Title_Small}
    color: ${({ theme }) => theme.palette.main.sub};
    ${media.medium} {
      width: 74%;
    }
  `,
  inactive: css`
    width: 35%;
    opacity: 0.5;
    ${media.medium} {
      width: 23%;
    }
  `,
};

const typeGuardVariantStyle = (selected: ActiveType) => {
  if (!selected) return null;
  return variantStyles[selected];
};

const LeftVote = styled(Button)<{ selected: ActiveType }>`
  position: absolute;
  border: 1px solid ${({ theme }) => theme.palette.border.base};
  flex-direction: column;
  ${({ theme }) => theme.textStyle.Title_Medium}
  transition: all 0.3s ease-in-out;
  font-weight: 500;
  &:hover {
    border-color: ${({ theme }) => theme.palette.main.point};
    color: ${({ theme, selected }) => selected === "inactive" && theme.palette.main.point};
    font-weight: 700;
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
