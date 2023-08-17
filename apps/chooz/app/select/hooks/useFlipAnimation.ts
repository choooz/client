import React, { useRef, useState } from "react";

export type Drag = "up" | "down" | null;
function useFlipAnimation(onChangeNowShowing: (index: number) => void) {
  const [drag, setDrag] = useState<Drag>(null);
  const [startTouchPosition, setStartTouchPosition] = useState({
    y: 0,
  });
  const lastTouchEventTimeRef = useRef(0);

  const onActFlip = (e: React.WheelEvent<HTMLDivElement>) => {
    const now = Date.now();
    const timeDiff = now - lastTouchEventTimeRef.current;
    if (timeDiff < 1500) {
      // 이전 이벤트가 1.5초 내에 발생한 경우 무시
      return;
    }
    lastTouchEventTimeRef.current = now;
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

  const onTouchStartPosition = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartTouchPosition({
      y: e.changedTouches[0].clientY,
    });
  };

  const onTouchMoveActFlip = (e: React.TouchEvent<HTMLDivElement>) => {
    const now = Date.now();
    const timeDiff = now - lastTouchEventTimeRef.current;
    if (timeDiff < 1500) {
      // 이전 이벤트가 1.5초 내에 발생한 경우 무시
      return;
    }
    lastTouchEventTimeRef.current = now;

    //터치의 시작이 끝보다 위면 up, 아래면 down
    if (e.changedTouches[0].clientY - startTouchPosition.y > 0) {
      setDrag("up");
      setTimeout(() => {
        onChangeNowShowing(-1);
      }, 750);
    }
    if (e.changedTouches[0].clientY - startTouchPosition.y < 0) {
      setDrag("down");
      setTimeout(() => {
        onChangeNowShowing(1);
      }, 750);
    }

    setTimeout(() => {
      setDrag(null);
    }, 850);
  };

  return { onActFlip, drag, onTouchStartPosition, onTouchMoveActFlip };
}

export default useFlipAnimation;
