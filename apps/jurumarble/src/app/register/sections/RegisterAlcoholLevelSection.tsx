import styled, { css } from "styled-components";
import { REGISTER_ALCOHOL_LEVEL_LIST } from "../constants";
import { useRegisterContext } from "../contexts";

export const RegisterAlcoholLevelSection = () => {
  const { onChangeAlcoholLevel, alcoholLevel } = useRegisterContext();

  return (
    <Wrapper>
      {REGISTER_ALCOHOL_LEVEL_LIST.map((item) => (
        <Item
          key={item.id}
          onClick={() => onChangeAlcoholLevel(item.id)}
          $selected={alcoholLevel === item.id}
        >
          <Label>{item.label}</Label>
          <Description>{item.description}</Description>
        </Item>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-radius: 4px;
  margin: 32px 0;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.line_01};
  box-shadow: 2px 2px 20px 0px rgba(0, 0, 0, 0.04), 2px 2px 20px 0px rgba(0, 0, 0, 0.06);

  > div + div {
    border-top: 1px solid ${({ theme }) => theme.colors.line_01};
  }
`;

const Item = styled.div<{
  $selected: boolean;
}>`
  padding: 16px 24px;
  cursor: pointer;
  ${({ $selected }) =>
    $selected &&
    css`
      & {
        background: rgba(255, 92, 0, 0.5);
      }
    `}
`;

const Label = styled.p`
  margin-bottom: 4px;
  ${({ theme }) => theme.typography.body02}; // TODO: body 04  생기면  수정
  color: ${({ theme }) => theme.colors.black_02};
  font-weight: bold;
`;

const Description = styled.p`
  ${({ theme }) => theme.typography.body03}; // TODO: body 04  생기면  수정
  color: ${({ theme }) => theme.colors.black_03};
`;
