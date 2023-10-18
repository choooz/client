import type { SVGProps } from 'react';

const SvgNext = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g id="arrow_back_ios">
      <mask
        id="mask0_1892_10608"
        style={{
          maskType: 'alpha',
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={20}
        height={20}
      >
        <rect
          id="Bounding box"
          x={20}
          y={20}
          width={20}
          height={20}
          transform="rotate(180 20 20)"
          fill="currentColor"
          vectorEffect="non-scaling-stroke"
        />
      </mask>
      <g mask="url(#mask0_1892_10608)">
        <path
          id="arrow_back_ios_2"
          d="M7.73294 2.28851L15.4445 10L7.73294 17.7115L6.61277 16.5914L13.2041 10L6.61277 3.40867L7.73294 2.28851Z"
          fill="currentColor"
          vectorEffect="non-scaling-stroke"
        />
      </g>
    </g>
  </svg>
);
export default SvgNext;
