import styled, { css } from 'styled-components';

interface Props {
  variant: 'region' | 'numberOfParticipants' | 'isVote';
  children: React.ReactNode;
}

type variant = Pick<Props, 'variant'>;

function Chip({ variant, children }: Props) {
  return <Wrapper variant={variant}>{children}</Wrapper>;
}

const variantStyles = {
  region: css`
    ${({ theme }) => css`
      background-color: ${theme.colors.main_02};
      color: ${theme.colors.main_01};
    `}
  `,
  numberOfParticipants: css`
    ${({ theme }) => css`
      background-color: ${theme.colors.bg_01};
      color: ${theme.colors.black_01};
    `}
  `,
  isVote: css`
    ${({ theme }) => css`
      background-color: ${theme.colors.bg_01};
      color: ${theme.colors.black_01};
      line-height: 12px;
    `}
  `,
};

const Wrapper = styled.div<variant>`
  ${({ theme, variant }) => css`
    ${variant && variantStyles[variant]};
    ${theme.typography.caption_chip}
    padding: 10px 8px;
    border-radius: 4px;
  `}
`;

export default Chip;
