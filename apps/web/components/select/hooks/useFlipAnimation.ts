import React, { useState } from "react";

export type Drag = "up" | "down" | null;
function useFlipAnimation() {
  const [drag, setDrag] = useState<Drag>(null);
  let timer: NodeJS.Timeout;
  const onAniamteFlip = (e: React.WheelEvent<HTMLDivElement>) => {
    // 휠을 올리면 up, 내리면 down
    if (e.deltaY < 0) setDrag("up");
    if (e.deltaY > 0) setDrag("down");
    timer = setTimeout(() => {
      setDrag(null);
    }, 1500);
  };
  return { onAniamteFlip, drag };
}

export default useFlipAnimation;
