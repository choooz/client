import { ALCOHOL_LEVEL_LIST } from 'lib/constants';
import { transitions } from 'lib/styles';
import Image from 'next/image';
import styled, { css } from 'styled-components';

import { useRegisterContext } from '../contexts';

export const RegisterDrinkCapacitySection = () => {
  const { onChangeDrinkCapacity, drinkCapacity } = useRegisterContext();

  return (
    <Wrapper>
      {ALCOHOL_LEVEL_LIST.map(
        ({ id, label, description, image, levelChip }) => (
          <Item
            key={id}
            $selected={id === drinkCapacity}
            onClick={() => onChangeDrinkCapacity(id)}
          >
            <Image alt={label} width={56} height={56} src={image} />
            <Text>
              <Title>
                {levelChip()}
                <Label>{label}</Label>
              </Title>
              <Description>{description}</Description>
            </Text>
          </Item>
        ),
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-radius: 4px;
  margin: 32px 0;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.line_01};
  border-radius: 8px;
  box-shadow: 2px 2px 20px 0px rgba(0, 0, 0, 0.04),
    2px 2px 20px 0px rgba(0, 0, 0, 0.06);

  > div + div {
  }
`;

const Item = styled.div<{
  $selected: boolean;
}>`
  padding: 16px 24px;
  cursor: pointer;
  display: flex;
  transition: all 0.3s ease-in-out;
  border-top: 1px solid ${({ theme }) => theme.colors.line_01};

  ${({ theme, $selected }) =>
    $selected &&
    css`
      & {
        animation: ${transitions.blink} 0.7s ease-in-out;
        background: rgba(255, 92, 0, 0.2);
        border: 1px solid ${theme.colors.main_01};
        border-radius: 8px;
        color: ${theme.colors.black_01};
        p {
          color: ${theme.colors.black_01};
        }
      }
    `}
  &:hover {
    background: rgba(255, 92, 0, 0.2);
  }
`;

const Text = styled.div`
  margin-left: 12px;
`;

const Title = styled.div`
  display: flex;
  margin-bottom: 4px;
`;

const Label = styled.p`
  margin-left: 6px;
  ${({ theme }) => theme.typography.body04}; // TODO: body 04  생기면  수정
  color: ${({ theme }) => theme.colors.black_02};
  font-weight: bold;
`;

const Description = styled.p`
  ${({ theme }) => theme.typography.body03}; // TODO: body 04  생기면  수정
  color: ${({ theme }) => theme.colors.black_03};
`;
