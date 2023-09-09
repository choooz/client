import type { SVGProps } from "react";
const IcBookmarkActive = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <mask id="mask0_406_18489" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
      <rect width="20" height="20" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_406_18489)">
      <path
        d="M5 17V4.5C5 4.08333 5.14583 3.72917 5.4375 3.4375C5.72917 3.14583 6.08333 3 6.5 3H13.5C13.9167 3 14.2708 3.14583 14.5625 3.4375C14.8542 3.72917 15 4.08333 15 4.5V17L10 15L5 17Z"
        fill="#1C1B1F"
      />
    </g>
  </svg>
);
export default IcBookmarkActive;
