import type { SVGProps } from 'react';

const SvgPrevious = (props: SVGProps<SVGSVGElement>) => (
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
        id="mask0_1910_10702"
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
          width={20}
          height={20}
          fill="currentColor"
          vectorEffect="non-scaling-stroke"
        />
      </mask>
      <g mask="url(#mask0_1910_10702)">
        <path
          id="arrow_back_ios_2"
          d="M12.2671 17.7115L4.55554 9.99997L12.2671 2.28845L13.3872 3.40862L6.7959 9.99997L13.3872 16.5913L12.2671 17.7115Z"
          fill="currentColor"
          vectorEffect="non-scaling-stroke"
        />
      </g>
    </g>
  </svg>
);
export default SvgPrevious;
