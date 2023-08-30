import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset}
    * {
    margin: 0;
    padding: 0;
    font: inherit;
    color: inherit;
}
    *, :after, :before, ::before, ::after {
    box-sizing: border-box;
    }
    ul, ol, li {
    list-style: none;
    }
    button,
    [role='button'] {
    border: 0;
    border-radius: 0;
    background: none;
    cursor: pointer;
    }
`;

export default GlobalStyles;
