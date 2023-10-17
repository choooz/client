import type { SVGProps } from "react";

const SvgArrowDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <mask
      id="mask0_266_619"
      style={{
        maskType: "alpha",
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={20}
      height={20}
    >
      <rect width={20} height={20} fill="currentColor" vectorEffect="non-scaling-stroke" />
    </mask>
    <g mask="url(#mask0_266_619)">
      <path
        d="M10 13.0625L5 8.0625L6.0625 7L10 10.9375L13.9375 7L15 8.0625L10 13.0625Z"
        fill="currentColor"
        vectorEffect="non-scaling-stroke"
      />
    </g>
  </svg>
);
export default SvgArrowDown;
