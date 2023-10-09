"use client";

import React from "react";
import styled from "styled-components";

const Loading = () => {
  return (
    <Box>
      <div className="loader4"></div>
    </Box>
  );
};

const Box = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #4a3c3c53;
  z-index: 999;
  transition: all 0.2s ease;

  .loader4 {
    position: relative;
    width: 150px;
    height: 20px;
    top: 45%;
    top: -webkit-calc(50% - 10px);
    top: calc(50% - 10px);
    left: 25%;
    left: -webkit-calc(50% - 75px);
    left: calc(50% - 75px);

    background-color: #fff;
  }

  .loader4:before {
    content: "";
    position: absolute;
    background-color: ${({ theme }) => theme.colors.main_01};
    top: 0px;
    left: 0px;
    height: 20px;
    width: 0px;
    z-index: 0;
    opacity: 1;
    -webkit-transform-origin: 100% 0%;
    transform-origin: 100% 0%;
    -webkit-animation: loader4 10s ease-in-out infinite;
    animation: loader4 2s ease-in-out infinite;
  }

  .loader4:after {
    content: "LOADING ...";
    color: ${({ theme }) => theme.colors.main_01};
    font-weight: 200;
    font-size: 16px;
    position: absolute;
    width: 100%;
    height: 20px;
    line-height: 20px;
    left: 0;
    display: flex;
    justify-content: center;
    top: 0;
  }

  @-webkit-keyframes loader4 {
    0% {
      width: 0px;
    }
    70% {
      width: 100%;
      opacity: 1;
    }
    90% {
      opacity: 0;
      width: 100%;
    }
    100% {
      opacity: 0;
      width: 0px;
    }
  }

  @keyframes loader4 {
    0% {
      width: 0px;
    }
    70% {
      width: 100%;
      opacity: 1;
    }
    90% {
      opacity: 0;
      width: 100%;
    }
    100% {
      opacity: 0;
      width: 0px;
    }
  }
`;

export default Loading;
