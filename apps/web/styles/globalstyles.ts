import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font: inherit;
    color: inherit;
  }
  *, :after, :before, ::before, ::after {
    box-sizing: border-box;
  }
  :root {
    -webkit-tap-highlight-color: transparent;
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
    overflow-wrap: break-word;
    word-break: break-word;
  }
  html, body, #__next {
    height: 100%;
    background-color: #F7F9FA;
  }
  img, picture, video, svg, canvas {
    display: block;
    max-width: 100%;
  }
  button,
  [role='button'] {
    border: 0;
    border-radius: 0;
    background: none;
    user-select: none;
    cursor: pointer;
  }
  ul, ol {
    list-style: none;
  }
  a {
    text-decoration: none;
    cursor: pointer;
  }
  input, img, fieldset, iframe {
    border: 0;
  }
  address, em, i {
    font-style: normal;
  }
  :focus {
    outline: none;
  }
  mark{
    background-color: #FFFFFF;
  }
`;

export default GlobalStyle;
