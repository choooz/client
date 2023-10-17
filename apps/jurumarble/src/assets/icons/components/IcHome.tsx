import type { SVGProps } from "react";

const SvgHome = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g id="main_home">
      <mask
        id="mask0_1529_1632"
        style={{
          maskType: "alpha",
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={24}
        height={24}
      >
        <rect
          id="Bounding box"
          width={24}
          height={24}
          fill="currentColor"
          vectorEffect="non-scaling-stroke"
        />
      </mask>
      <g mask="url(#mask0_1529_1632)">
        <path
          id="home"
          d="M5.25 19.8824H8.625V13.1765H15.375V19.8824H18.75V9.82353L12 4.79412L5.25 9.82353V19.8824ZM3 22.1176V8.70588L12 2L21 8.70588V22.1176H13.125V15.4118H10.875V22.1176H3Z"
          fill="currentColor"
          vectorEffect="non-scaling-stroke"
        />
      </g>
    </g>
  </svg>
);
export default SvgHome;
