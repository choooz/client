import React, { useEffect } from "react";

function useFlipAnimation() {
  let timer: NodeJS.Timeout;
  const onAniamteFlip = (e: React.WheelEvent<HTMLDivElement>) => {
    // 휠을 올리면 className을 up로 변경하고, 1초뒤 다시 원래대로 변경
    if (e.deltaY < 0) {
      document.querySelector(".animate")?.classList.add("up");
      document.querySelector(".animate2")?.classList.add("up2");
      document.querySelector(".animate3")?.classList.add("up3");

      timer = setTimeout(() => {
        document.querySelector(".animate")?.classList.remove("up");
        document.querySelector(".animate2")?.classList.remove("up2");
        document.querySelector(".animate3")?.classList.remove("up3");
      }, 1500);
    }

    //  휠을 아래로 내리면 className을 prev로 변경하고, 1초뒤 다시 원래대로 변경
    if (e.deltaY > 0) {
      document.querySelector(".animate")?.classList.add("down");
      document.querySelector(".animate2")?.classList.add("down2");

      timer = setTimeout(() => {
        document.querySelector(".animate")?.classList.remove("down");
        document.querySelector(".animate2")?.classList.remove("down2");
      }, 1500);
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return { onAniamteFlip };
}

export default useFlipAnimation;
