import { theme } from "@monorepo/ui";

interface Props {
  variant: "primary" | "searchRecommendation";
}

function SearchIcon({ variant }: Props) {
  let width = "21";
  let height = "20";
  let stroke = "white";
  let fill = "white";

  if (variant === "searchRecommendation") {
    width = "13";
    height = "13";
    stroke = theme.palette.background.darker;
    fill = theme.palette.background.darker;
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="8.36131" cy="8.36131" r="7.36131" stroke={stroke} strokeWidth="2" />
      <rect
        x="13.3789"
        y="14.3203"
        width="2"
        height="8.02686"
        transform="rotate(-45 13.3789 14.3203)"
        fill={fill}
      />
    </svg>
  );
}

export default SearchIcon;
