import { keyframes } from "styled-components";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const popInFromBottom = keyframes`
  0% {
    opacity: 0;
    transform: translateY(60px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }`;

const delaypopInFromBottom = keyframes`
0% {
  opacity: 0;
  transform: translateY(60px);
}
50% {
  opacity: 0;
  transform: translateY(60px);
}
100% {
  opacity: 1;
  transform: translateY(0px);
}`;

const popOutToBottom = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0px) scale(1.0);

  }
  100% {
    opacity: 0;
    transform: translateY(400px) scale(0.75);
  }`;

const popIn = keyframes`
  0% {
    opacity: 0.7;
    transform: scale3d(0.8, 0.8, 1);
  }
  100% {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
`;

const slideUp = keyframes`
  0% {
    transform: translateY(40%);
  }
  100% {
    transform: translateY(0%);
  };
`;

const slideDown = keyframes`
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(40%);
  };
`;

const blink = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const transitions = {
  blink,
  delaypopInFromBottom,
  fadeIn,
  fadeOut,
  popIn,
  popInFromBottom,
  popOutToBottom,
  slideDown,
  slideUp,
};

export default transitions;
