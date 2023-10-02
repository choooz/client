import { media, transitions } from "lib/styles";
import styled, { css } from "styled-components";
import { NumberPad, NumberPadTypes } from "../constants";
import { useRegisterContext } from "../contexts";

export const RegisterBirthSection = () => {
  const { yearOfBirth, onChangeYearOfBirth, onDeleteYearOfBirth } = useRegisterContext();

  return (
    <Container>
      <InputBox>
        <Input type="text" inputMode="none" placeholder="0" value={yearOfBirth ?? ""} /> 년도
      </InputBox>
      <NumberBox>
        {NumberPad.map((number: NumberPadTypes) => (
          <NumberButton key={number} onClick={() => onChangeYearOfBirth(number)}>
            {number}
          </NumberButton>
        ))}
        <DeleteNumver onClick={onDeleteYearOfBirth}>전체 지움</DeleteNumver>
      </NumberBox>
    </Container>
  );
};

const Container = styled.div`
  color: ${({ theme }) => theme.colors.black_01};
  display: flex;
  flex-direction: column;
  align-items: baseline;
  margin: 0 auto;
  width: 162px;
  gap: 16px;
  margin-top: 32px;
  ${media.medium} {
    margin: 0;
    justify-content: space-between;
    flex-direction: row;
    align-items: unset;
  }
`;

const InputBox = styled.div`
  ${({ theme }) => css`
    ${theme.typography.headline01}
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    font-weight: 700;
    ${media.medium} {
      height: 80px;
      font-size: 50px;
      gap: 12px;
    }
  `}
`;

const Input = styled.input`
  padding: 10px;
  width: 105px;
  height: 56px;
  border: 1px solid ${({ theme }) => theme.colors.line_01};
  border-radius: 4px;
  animation: ${transitions.fadeIn} 1.5s normal ease-in-out;
  color: ${({ theme }) => theme.colors.main_01};
  ::placeholder {
    color: ${({ theme }) => theme.colors.black_04};
  }
  ${media.medium} {
    width: 152px;
    height: 80px;
  }
`;

const NumberBox = styled.div`
  ${({ theme }) => css`
    ${theme.typography.headline02}
    width: auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 9px;
    place-items: center;
    ${media.medium} {
      gap: 12px;
      margin-left: 20px;
    }
  `}
`;

const NumberButton = styled.button`
  display: flex;
  justify-content: center;
  font-size: 20px;
  align-items: center;
  width: 48px;
  height: 48px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.black_05};
  background: ${({ theme }) => theme.colors.bg_02};
  ${media.medium} {
    width: 70px;
    height: 70px;
    font-size: 28px;
  }
  :active {
    border: 1px solid ${({ theme }) => theme.colors.main_01};
    background-color: ${({ theme }) => theme.colors.main_02};
  }
`;

const DeleteNumver = styled(NumberButton)`
  font-size: 14px;
  width: 105px;
  grid-column: span 2;
  ${media.medium} {
    font-size: 24px;
    width: 152px;
  }
`;
