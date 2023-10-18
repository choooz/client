export const mediaQuery = (minWidth: number) =>
  `@media (min-width: ${minWidth}px)`;

export const mediaSize = {
  large: 1024,
  medium: 768,
  small: 414,
  xlarge: 1366,
  xsmall: 320,
  xxlarge: 1920,
} as const;

const { xxlarge, xlarge, large, medium, small, xsmall } = mediaSize;

export const media = {
  large: mediaQuery(large),
  medium: mediaQuery(medium),
  small: mediaQuery(small),
  xlarge: mediaQuery(xlarge),
  xsmall: mediaQuery(xsmall),
  xxlarge: mediaQuery(xxlarge),
};
