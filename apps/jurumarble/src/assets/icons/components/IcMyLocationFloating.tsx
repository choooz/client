import type { SVGProps } from "react";

const SvgIcMyLocationFloating = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 92 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_dd_872_10822)">
      <rect
        x={20}
        y={20}
        width={40}
        height={40}
        rx={20}
        fill="currentColor"
        vectorEffect="non-scaling-stroke"
      />
      <mask
        id="mask0_872_10822"
        style={{
          maskType: "alpha",
        }}
        maskUnits="userSpaceOnUse"
        x={28}
        y={28}
        width={24}
        height={24}
      >
        <rect
          x={28}
          y={28}
          width={24}
          height={24}
          fill="currentColor"
          vectorEffect="non-scaling-stroke"
        />
      </mask>
      <g mask="url(#mask0_872_10822)">
        <path
          d="M39 50.95V48.95C36.9167 48.7167 35.1292 47.8542 33.6375 46.3625C32.1459 44.8708 31.2834 43.0833 31.05 41H29.05V39H31.05C31.2834 36.9167 32.1459 35.1292 33.6375 33.6375C35.1292 32.1458 36.9167 31.2833 39 31.05V29.05H41V31.05C43.0834 31.2833 44.8709 32.1458 46.3625 33.6375C47.8542 35.1292 48.7167 36.9167 48.95 39H50.95V41H48.95C48.7167 43.0833 47.8542 44.8708 46.3625 46.3625C44.8709 47.8542 43.0834 48.7167 41 48.95V50.95H39ZM40 47C41.9334 47 43.5834 46.3167 44.95 44.95C46.3167 43.5833 47 41.9333 47 40C47 38.0667 46.3167 36.4167 44.95 35.05C43.5834 33.6833 41.9334 33 40 33C38.0667 33 36.4167 33.6833 35.05 35.05C33.6834 36.4167 33 38.0667 33 40C33 41.9333 33.6834 43.5833 35.05 44.95C36.4167 46.3167 38.0667 47 40 47ZM40 44C38.9 44 37.9584 43.6083 37.175 42.825C36.3917 42.0417 36 41.1 36 40C36 38.9 36.3917 37.9583 37.175 37.175C37.9584 36.3917 38.9 36 40 36C41.1 36 42.0417 36.3917 42.825 37.175C43.6084 37.9583 44 38.9 44 40C44 41.1 43.6084 42.0417 42.825 42.825C42.0417 43.6083 41.1 44 40 44ZM40 42C40.55 42 41.0209 41.8042 41.4125 41.4125C41.8042 41.0208 42 40.55 42 40C42 39.45 41.8042 38.9792 41.4125 38.5875C41.0209 38.1958 40.55 38 40 38C39.45 38 38.9792 38.1958 38.5875 38.5875C38.1959 38.9792 38 39.45 38 40C38 40.55 38.1959 41.0208 38.5875 41.4125C38.9792 41.8042 39.45 42 40 42Z"
          fill="currentColor"
          vectorEffect="non-scaling-stroke"
        />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_dd_872_10822"
        x={-4}
        y={0}
        width={96}
        height={96}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx={4} dy={8} />
        <feGaussianBlur stdDeviation={14} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_872_10822" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={6} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0" />
        <feBlend
          mode="normal"
          in2="effect1_dropShadow_872_10822"
          result="effect2_dropShadow_872_10822"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow_872_10822"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default SvgIcMyLocationFloating;
