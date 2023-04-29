import { SVGProps } from "react";

const HeaderSearchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    fill="none"
    viewBox="0 0 28 28"
    {...props}
  >
    <path
      fill="#999"
      fillRule="evenodd"
      d="M12.803 5.325c-3.906 0-7.071 3.266-7.071 7.295 0 4.03 3.165 7.296 7.07 7.296 3.906 0 7.072-3.267 7.072-7.296s-3.166-7.295-7.071-7.295ZM4 12.62C4 7.606 7.941 3.54 12.803 3.54c4.861 0 8.802 4.066 8.802 9.082 0 5.015-3.94 9.081-8.802 9.081S4 17.636 4 12.62Z"
      clipRule="evenodd"
    />
    <rect
      width={1.759}
      height={8.797}
      fill="#999"
      rx={0.88}
      transform="scale(.98428 1.01548) rotate(-45 31.402 -11.61)"
    />
  </svg>
);
export default HeaderSearchIcon;
