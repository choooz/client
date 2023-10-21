import { GENDER_LIST } from 'lib/constants';
import styled, { css } from 'styled-components';

import { useRegisterContext } from '../contexts';

type ActiveType = 'active' | 'inactive' | null;

export const RegisterGenderSection = () => {
  const { gender, onChangeGender } = useRegisterContext();

  return (
    <>
      <Wrapper>
        {GENDER_LIST.map(({ id, label, image }) => (
          <Item
            key={id}
            $selected={
              gender === null ? null : gender === id ? 'active' : 'inactive'
            }
            onClick={() => onChangeGender(id)}
          >
            {image()}
            {label}
          </Item>
        ))}
      </Wrapper>
    </>
  );
};

const variantStyles = {
  active: css`
    ${({ theme }) => css`
      border: 1px solid ${theme.colors.main_01};
      color: ${theme.colors.black_01};
      background: rgba(255, 92, 0, 0.2);
      width: 70%;
    `}
  `,
  inactive: css`
    opacity: 0.5;
    width: 30%;
  `,
};

const typeGuardVariantStyle = ($selected: ActiveType) => {
  if (!$selected) {
    return null;
  }
  return variantStyles[$selected];
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 32px;
  > div + div {
    margin-left: 15px;
  }
`;

const Item = styled.div<{
  $selected: ActiveType;
}>`
  ${({ theme, $selected }) => css`
    ${theme.typography.headline03};
    background: ${theme.colors.white};
    color: ${theme.colors.black_03};
    width: 50%;
    border: 1px solid ${theme.colors.line_01};
    border-radius: 12px;
    height: 280px;
    cursor: pointer;
    display: flex;
    transition: width 0.3s ease-in-out;
    flex-direction: column;
    align-items: center;
    ${typeGuardVariantStyle($selected)}
    :hover {
      background: rgba(255, 92, 0, 0.2);
      border: 1px solid ${theme.colors.main_01};
      width: 70%;
    }
  `}
  > svg {
    padding: 64px 0 72px;
    box-sizing: content-box;
  }
`;
