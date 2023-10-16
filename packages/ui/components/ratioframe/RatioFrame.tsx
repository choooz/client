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
  banner: `
    ${baseAspectRatioCss}
    :before {
      padding-bottom: calc((2 / 3) * 100%);
    }
  `,
  fullHeight: `
    /* aspect-ratio: auto; */
    height: 100%;
  `,
  photo: `
    ${baseAspectRatioCss}
    :before {
      padding-bottom: calc((500 / 375) * 100%);
    }
  `,
  profileCard: `
    ${baseAspectRatioCss}
    :before {
      padding-bottom: calc((470 / 350) * 100%);
    }
  `,
  square: `
    ${baseAspectRatioCss}
    :before {
      padding-bottom: calc((100 / 100) * 100%);
    } ;
  `,
  video: `
    ${baseAspectRatioCss}
    :before {
      padding-bottom: calc((9 / 16) * 100%);
    }
  `,
  w10h12: `
    ${baseAspectRatioCss}
    :before {
      padding-bottom: calc((12 / 10) * 100%);
    }
  `,
  w3h2: `
    ${baseAspectRatioCss}
    :before {padding-bottom: calc((2 / 3) * 100%);}
  `,
  w3h4: `
    ${baseAspectRatioCss}
    :before {
      padding-bottom: calc((4 / 3) * 100%);
    }
  `,
  w5h6: `
    ${baseAspectRatioCss}
    :before {
      padding-bottom: calc((600 / 500) * 100%);
    }
`,
  w7h2: `
  ${baseAspectRatioCss}
  :before { padding-bottom: calc((2 / 7) * 100%); }`,
  w9h8: `
    ${baseAspectRatioCss}
    :before { padding-bottom: calc((8 / 9) * 100%); }
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
