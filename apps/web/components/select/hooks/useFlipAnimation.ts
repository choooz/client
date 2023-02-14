import React, { useState } from "react";

export type Drag = "up" | "down" | null;
function useFlipAnimation(onChangeNowShowing: (index: number) => void) {
  const [drag, setDrag] = useState<Drag>(null);

  const onActFlip = (e: React.WheelEvent<HTMLDivElement>) => {
    // 휠을 올리면 up, 내리면 down
    if (e.deltaY < 0) {
      setDrag("up");
      setTimeout(() => {
        onChangeNowShowing(-1);
      }, 750);
    }
    if (e.deltaY > 0) {
      setDrag("down");
      setTimeout(() => {
        onChangeNowShowing(1);
      }, 750);
    }

    setTimeout(() => {
      setDrag(null);
    }, 850);
  };
  return { onActFlip, drag };
}

export default useFlipAnimation;
