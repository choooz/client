export const mediaQuery = (minWidth: number) => `@media (min-width: ${minWidth}px)`;

export const mediaSize = {
  xxlarge: 1920,
  xlarge: 1366,
  large: 1024,
  medium: 768,
  small: 414,
  xsmall: 320,
} as const;

const { xxlarge, xlarge, large, medium, small, xsmall } = mediaSize;

export const media = {
  xxlarge: mediaQuery(xxlarge),
  xlarge: mediaQuery(xlarge),
  large: mediaQuery(large),
  medium: mediaQuery(medium),
  small: mediaQuery(small),
  xsmall: mediaQuery(xsmall),
};
