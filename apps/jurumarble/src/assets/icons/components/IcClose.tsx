import type { SVGProps } from 'react';

const SvgIcClose = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <mask
      id="mask0_406_18159"
      style={{
        maskType: 'alpha',
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={24}
      height={24}
    >
      <rect
        width={24}
        height={24}
        fill="currentColor"
        vectorEffect="non-scaling-stroke"
      />
    </mask>
    <g mask="url(#mask0_406_18159)">
      <path
        d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
        fill="currentColor"
        vectorEffect="non-scaling-stroke"
      />
    </g>
  </svg>
);
export default SvgIcClose;
