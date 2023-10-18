import type { SVGProps } from 'react';

const SvgWarningIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="28" cy="28" r="28" fill="#FFD2D2" />
    <rect x="26" y="14" width="5" height="20" rx="2.5" fill="#DC0035" />
    <rect x="26" y="38" width="5" height="5" rx="2.5" fill="#DC0035" />
  </svg>
);
export default SvgWarningIcon;
