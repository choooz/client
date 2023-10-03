import { media, transitions } from "lib/styles";
import styled, { css } from "styled-components";
import { useRegisterContext } from "../contexts";

type ActiveType = "active" | "inactive" | null;

function RegisterMBTISection() {
  const { onChangeMBTI, activeValue } = useRegisterContext();

  return (
    <Container>
      <VoteBox>
        <LeftVote
          name="M"
          selected={activeValue("left", "M")}
          value="E"
          onClick={({ currentTarget }) =>
            onChangeMBTI({
              name: currentTarget.name,
              value: currentTarget.value,
            })
          }
        >
          <MbtiType>E</MbtiType>
          <MbtiText>외향형</MbtiText>
        </LeftVote>
        <RightVote
          name="M"
          selected={activeValue("right", "M")}
          value="I"
          onClick={({ currentTarget }) =>
            onChangeMBTI({
              name: currentTarget.name,
              value: currentTarget.value,
            })
          }
        >
          <MbtiType>I</MbtiType>
          <MbtiText>내향형</MbtiText>
        </RightVote>
      </VoteBox>
      <VoteBox>
        <LeftVote
          name="B"
          selected={activeValue("left", "B")}
          value="S"
          onClick={({ currentTarget }) =>
            onChangeMBTI({
              name: currentTarget.name,
              value: currentTarget.value,
            })
          }
        >
          <MbtiType>S</MbtiType>
          <MbtiText>감정형</MbtiText>
        </LeftVote>
        <RightVote
          name="B"
          selected={activeValue("right", "B")}
          value="N"
          onClick={({ currentTarget }) =>
            onChangeMBTI({
              name: currentTarget.name,
              value: currentTarget.value,
            })
          }
        >
          <MbtiType>N</MbtiType>
          <MbtiText>직관형</MbtiText>
        </RightVote>
      </VoteBox>
      <VoteBox>
        <LeftVote
          name="T"
          selected={activeValue("left", "T")}
          value="T"
          onClick={({ currentTarget }) =>
            onChangeMBTI({
              name: currentTarget.name,
              value: currentTarget.value,
            })
          }
        >
          <MbtiType>T</MbtiType>
          <MbtiText>사고형</MbtiText>
        </LeftVote>
        <RightVote
          name="T"
          selected={activeValue("right", "T")}
          value="F"
          onClick={({ currentTarget }) =>
            onChangeMBTI({
              name: currentTarget.name,
              value: currentTarget.value,
            })
          }
        >
          <MbtiType>F</MbtiType>
          <MbtiText>감정형</MbtiText>
        </RightVote>
      </VoteBox>
      <VoteBox>
        <LeftVote
          name="I"
          selected={activeValue("left", "I")}
          value="J"
          onClick={({ currentTarget }) =>
            onChangeMBTI({
              name: currentTarget.name,
              value: currentTarget.value,
            })
          }
        >
          <MbtiType>J</MbtiType>
          <MbtiText>판단형</MbtiText>
        </LeftVote>
        <RightVote
          name="I"
          selected={activeValue("right", "I")}
          value="P"
          onClick={({ currentTarget }) =>
            onChangeMBTI({
              name: currentTarget.name,
              value: currentTarget.value,
            })
          }
        >
          <MbtiType>P</MbtiType>
          <MbtiText> 인식형</MbtiText>
        </RightVote>
      </VoteBox>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 32px;
`;

const VoteBox = styled.div`
  position: relative;
  width: 100%;
  height: 56px;
  margin: 7px 0;
  ${media.medium} {
    height: 74px;
    margin: 17px 0;
  }
`;

const variantStyles = {
  active: css`
    animation: ${transitions.blink} 0.7s ease-in-out;
    width: 74%;
    border: 1px solid ${({ theme }) => theme.colors.main_01};
    background: rgba(255, 92, 0, 0.2);
    font-size: 16px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.black_02};
  `,
  inactive: css`
    width: 23%;
    opacity: 0.5;
  `,
};

const typeGuardVariantStyle = (selected: ActiveType) => {
  if (!selected) return null;
  return variantStyles[selected];
};

const LeftVote = styled.button<{ selected: ActiveType }>`
  position: absolute;
  width: 48%;
  height: 100%;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.bg_02};
  border: 1px solid ${({ theme }) => theme.colors.black_05};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transition: all 0.3s ease-in-out;
  ${({ selected }) => typeGuardVariantStyle(selected)}
  &:hover {
    border-color: ${({ theme }) => theme.colors.main_01};
    color: ${({ theme }) => theme.colors.main_01};
    font-weight: 800;
  }
`;

const RightVote = styled(LeftVote)`
  right: 0;
`;

const MbtiType = styled.div`
  ${({ theme }) => theme.typography.headline02}
  font-weight: 800;
`;

const MbtiText = styled.div`
  ${({ theme }) => theme.typography.chip}
`;

export default RegisterMBTISection;
