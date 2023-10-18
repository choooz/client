import type { SVGProps } from 'react';

const SvgNaverIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_279_9255)">
      <path
        d="M5.15702 7.44L11.081 16H16V0H10.8562V8.56L4.91901 0H0V16H5.15702V7.44Z"
        fill="currentColor"
        vectorEffect="non-scaling-stroke"
      />
    </g>
    <defs>
      <clipPath id="clip0_279_9255">
        <rect
          width={16}
          height={16}
          fill="currentColor"
          vectorEffect="non-scaling-stroke"
        />
      </clipPath>
    </defs>
  </svg>
);
export default SvgNaverIcon;
