import styled, { css, type DefaultTheme } from "styled-components";

const baseAspectRatioCss = `
  position: relative;
  &:before {
    content: '';
    display: block;
  }
  > :first-child {
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    width: 100%;
    height: 100%;
  }
`;

const aspectRatios = {
  auto: `
    ${baseAspectRatioCss}
  `,
  square: `
    ${baseAspectRatioCss}
    :before {
      padding-bottom: calc((100 / 100) * 100%);
    } ;
  `,
} as const;

export interface RatioFrameProps {
  ratio: keyof typeof aspectRatios;
  imgAuto?: boolean;
  imgCover?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const RatioFrame = ({ children, ratio, className, ...rest }: RatioFrameProps) => (
  <Container ratio={ratio} className={className} {...rest}>
    {children}
  </Container>
);

type RatioFrameStyleProps = Pick<RatioFrameProps, "ratio" | "imgAuto" | "imgCover">;

const Container = styled.div<RatioFrameStyleProps>`
  ${({ ratio, imgAuto, imgCover }) => css`
    ${ratio && aspectRatios[ratio]}
    img {
      height: 100%;
      ${{
        ...(imgAuto ? { height: "auto" } : {}),
        ...(imgCover ? { objectFit: "cover" } : {}),
      }}
    }
  `}
`;
